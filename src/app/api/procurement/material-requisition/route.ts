import { z } from 'zod';
import { ok, created, serverError, validationError } from '@/lib/api-response';
import { createMaterialRequisitionSchema, paginationQuerySchema } from "@/lib/erp-api";
import { sql } from "@/lib/db";
import { randomUUID } from "node:crypto";

const getMaterialRequisitionSchema = paginationQuerySchema.extend({
  type: z.string().optional(),
  location: z.string().optional(),
  year: z.string().optional(),
});

export async function GET(request: Request) {
  try {
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
        mr."requisitionNo",
        mr."requisitionDate",
        mr.company,
        mr."reqnType",
        mr."requisitionFor",
        mr.buyer,
        mr.season,
        mr."forLocation",
        mr."preparedBy",
        mr."deptFrom",
        mr."deptTo",
        mr."createdAt",
        COALESCE(
          json_agg(
            json_build_object(
              'id', mi.id,
              'itemCategory', mi."itemCategory",
              'itemDesc', mi."itemDesc",
              'color', mi.color,
              'width', mi.width,
              'unit', mi.unit,
              'reqnQty', mi."reqnQty",
              'rate', mi.rate,
              'reqOn', mi."reqOn",
              'remark', mi.remark
            )
          ) FILTER (WHERE mi.id IS NOT NULL),
          '[]'::json
        ) AS items
      FROM public."MaterialRequisition" mr
      LEFT JOIN public."MaterialReqItem" mi ON mi."requisitionId" = mr.id
      WHERE (${location}::text IS NULL OR mr."forLocation" = ${location})
        AND (${startDate}::timestamptz IS NULL OR mr."requisitionDate" >= ${startDate})
        AND (${endDate}::timestamptz IS NULL OR mr."requisitionDate" <= ${endDate})
        AND (
          ${type}::text IS NULL
          OR EXISTS (
            SELECT 1
            FROM public."MaterialReqItem" item_filter
            WHERE item_filter."requisitionId" = mr.id
              AND item_filter."itemCategory" ILIKE ${type}
          )
        )
      GROUP BY mr.id
      ORDER BY mr."createdAt" DESC
      LIMIT ${limit}
      OFFSET ${skip}
    `;
    const totalRows = await sql`
      SELECT COUNT(*)::int AS count
      FROM public."MaterialRequisition" mr
      WHERE (${location}::text IS NULL OR mr."forLocation" = ${location})
        AND (${startDate}::timestamptz IS NULL OR mr."requisitionDate" >= ${startDate})
        AND (${endDate}::timestamptz IS NULL OR mr."requisitionDate" <= ${endDate})
        AND (
          ${type}::text IS NULL
          OR EXISTS (
            SELECT 1
            FROM public."MaterialReqItem" item_filter
            WHERE item_filter."requisitionId" = mr.id
              AND item_filter."itemCategory" ILIKE ${type}
          )
        )
    `;
    const total = Number(totalRows[0]?.count ?? 0);

    const pages = Math.ceil(total / limit);
    return ok(requisitions, { total, page, pages });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as unknown;
    const parsed = createMaterialRequisitionSchema.safeParse(body);
    
    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const data = parsed.data;
    const requisitionId = randomUUID();
    const rows = await sql`
      INSERT INTO public."MaterialRequisition" (
        id, "requisitionNo", "requisitionDate", company, "reqnType", "requisitionFor",
        buyer, season, "forLocation", "preparedBy", "deptFrom", "deptTo", "createdAt"
      ) VALUES (
        ${requisitionId}, ${data.requisitionNo ?? null}, ${data.requisitionDate}, ${data.company}, ${data.reqnType}, ${data.requisitionFor},
        ${data.buyer ?? null}, ${data.season ?? null}, ${data.forLocation ?? null}, ${data.preparedBy ?? null}, ${data.deptFrom ?? null}, ${data.deptTo ?? null}, NOW()
      )
      RETURNING id, "requisitionNo", "requisitionDate", "createdAt"
    `;
    for (const item of data.items) {
      await sql`
        INSERT INTO public."MaterialReqItem" (
          id, "requisitionId", "itemCategory", "itemDesc", color, width, unit, "reqnQty", rate, "reqOn", remark
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
