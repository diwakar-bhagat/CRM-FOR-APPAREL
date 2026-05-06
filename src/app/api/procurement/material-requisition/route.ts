import { z } from 'zod';
import { ok, created, serverError, validationError } from '@/lib/api-response';
import { createMaterialRequisitionSchema, paginationQuerySchema } from "@/lib/erp-api";
import { ensureMaterialRequisitionTables } from "@/lib/cta-schema";
import { sql } from "@/lib/db";
import { randomUUID } from "node:crypto";

const getMaterialRequisitionSchema = paginationQuerySchema.extend({
  type: z.string().optional(),
  location: z.string().optional(),
  year: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    await ensureMaterialRequisitionTables();

    const url = new URL(request.url);
    const params = {
      type: url.searchParams.get("type"),
      location: url.searchParams.get("location"),
      year: url.searchParams.get("year"),
      page: url.searchParams.get("page"),
      limit: url.searchParams.get("limit"),
    };

    const parsed = getMaterialRequisitionSchema.safeParse(params);
    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const { type, location, year, page, limit } = parsed.data;

    const [yearStart, yearEnd] = year?.includes("-") ? year.split("-") : [];
    const startDate = yearStart && yearEnd ? new Date(`${yearStart}-04-01`) : null;
    const endDate = yearStart && yearEnd ? new Date(`${yearEnd}-03-31`) : null;
    const skip = (page - 1) * limit;
    const requisitions = await sql`
      SELECT
        mr.id,
        mr.requisition_no AS "requisitionNo",
        mr.requisition_date AS "requisitionDate",
        mr.item_type AS "itemType",
        mr.company,
        mr.reqn_type AS "reqnType",
        mr.requisition_for AS "requisitionFor",
        mr.buyer,
        mr.season,
        mr.for_location AS "forLocation",
        mr.prepared_by AS "preparedBy",
        mr.dept_from AS "deptFrom",
        mr.dept_to AS "deptTo",
        mr.status,
        mr.created_at AS "createdAt",
        COALESCE(
          json_agg(
            json_build_object(
              'id', mi.id,
              'itemCategory', mi.item_category,
              'itemDesc', mi.item_desc,
              'color', mi.color,
              'width', mi.width,
              'unit', mi.unit,
              'reqnQty', mi.reqn_qty,
              'rate', mi.rate,
              'reqOn', mi.req_on,
              'remark', mi.remark
            )
          ) FILTER (WHERE mi.id IS NOT NULL),
          '[]'::json
        ) AS items
      FROM public.material_requisitions mr
      LEFT JOIN public.material_requisition_items mi ON mi.requisition_id = mr.id
      WHERE (${location}::text IS NULL OR mr.for_location = ${location})
        AND (${startDate}::timestamptz IS NULL OR mr.requisition_date >= ${startDate})
        AND (${endDate}::timestamptz IS NULL OR mr.requisition_date <= ${endDate})
        AND (
          ${type}::text IS NULL
          OR EXISTS (
            SELECT 1
            FROM public.material_requisition_items item_filter
            WHERE item_filter.requisition_id = mr.id
              AND item_filter.item_category ILIKE ${type}
          )
        )
      GROUP BY mr.id
      ORDER BY mr.created_at DESC
      LIMIT ${limit}
      OFFSET ${skip}
    `;
    const totalRows = await sql`
      SELECT COUNT(*)::int AS count
      FROM public.material_requisitions mr
      WHERE (${location}::text IS NULL OR mr.for_location = ${location})
        AND (${startDate}::timestamptz IS NULL OR mr.requisition_date >= ${startDate})
        AND (${endDate}::timestamptz IS NULL OR mr.requisition_date <= ${endDate})
        AND (
          ${type}::text IS NULL
          OR EXISTS (
            SELECT 1
            FROM public.material_requisition_items item_filter
            WHERE item_filter.requisition_id = mr.id
              AND item_filter.item_category ILIKE ${type}
          )
        )
    `;
    const total = Number(totalRows[0]?.count ?? 0);

    const pages = Math.ceil(total / limit);
    return Response.json({ requisitions, data: requisitions, total, page, pages });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(request: Request) {
  try {
    await ensureMaterialRequisitionTables();

    const body = await request.json() as unknown;
    const parsed = createMaterialRequisitionSchema.safeParse(body);
    
    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const data = parsed.data;
    const requisitionId = randomUUID();
    const rows = await sql`
      INSERT INTO public.material_requisitions (
        id, requisition_no, requisition_date, item_type, company, reqn_type, requisition_for,
        buyer, season, for_location, prepared_by, dept_from, dept_to, created_at
      ) VALUES (
        ${requisitionId}, ${data.requisitionNo ?? null}, ${data.requisitionDate}, ${data.items[0]?.itemCategory ?? 'FABRIC'}, ${data.company}, ${data.reqnType}, ${data.requisitionFor},
        ${data.buyer ?? null}, ${data.season ?? null}, ${data.forLocation ?? null}, ${data.preparedBy ?? null}, ${data.deptFrom ?? null}, ${data.deptTo ?? null}, NOW()
      )
      RETURNING id, requisition_no AS "requisitionNo", requisition_date AS "requisitionDate", created_at AS "createdAt"
    `;
    for (const item of data.items) {
      await sql`
        INSERT INTO public.material_requisition_items (
          id, requisition_id, item_category, item_desc, color, width, unit, reqn_qty, rate, req_on, remark
        ) VALUES (
          ${randomUUID()}, ${requisitionId}, ${item.itemCategory}, ${item.itemDesc}, ${item.color ?? null}, ${item.width ?? null},
          ${item.unit ?? null}, ${item.reqnQty ?? null}, ${item.rate ?? null}, ${item.reqOn ?? null}, ${item.remark ?? null}
        )
      `;
    }
    const requisition = rows[0];

    return created(requisition);
  } catch (error) {
    return serverError(error);
  }
}
