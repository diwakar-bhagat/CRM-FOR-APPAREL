import { createOrderSchema, paginationQuerySchema } from "@/lib/erp-api";
import { ok, created, serverError, validationError } from "@/lib/api-response";
import { sql } from "@/lib/db";
import { randomUUID } from "node:crypto";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const params = url.searchParams;
    const distinct = params.get("distinct");
    
    if (distinct === "buyers") {
      const buyers = await sql`SELECT name FROM public."Buyer" ORDER BY name ASC`;
      return ok(buyers.map((buyer: any) => buyer.name));
    }
    
    if (distinct === "months") {
      const months = await sql`SELECT DISTINCT month FROM public."Order" ORDER BY month ASC`;
      return ok(months.map((item: any) => item.month));
    }

    const parsedPagination = paginationQuerySchema.safeParse({
      page: params.get("page") ?? "1",
      limit: params.get("limit") ?? "100",
    });
    
    if (!parsedPagination.success) {
      return validationError(parsedPagination.error);
    }

    const month = params.get("month");
    const buyer = params.get("buyer");
    const unit = params.get("unit");
    const status = params.get("status");
    const search = params.get("search");
    const { page, limit } = parsedPagination.data;

    const searchPattern = search ? `%${search}%` : null;
    const skip = (page - 1) * limit;
    const orders = await sql`
      SELECT
        o.id,
        o."orderNo",
        o."styleDescription",
        o.qty,
        o.month,
        o."planStatus",
        o."exFactoryDate",
        o."pcdPlan",
        o."fileHoDate",
        o."rdDate",
        json_build_object('id', b.id, 'name', b.name) AS buyer,
        json_build_object('id', u.id, 'name', u.name) AS unit
      FROM public."Order" o
      JOIN public."Buyer" b ON b.id = o."buyerId"
      JOIN public."Unit" u ON u.id = o."unitId"
      WHERE (${month}::text IS NULL OR o.month = ${month})
        AND (${status}::text IS NULL OR o."planStatus" = ${status})
        AND (${buyer}::text IS NULL OR b.name = ${buyer})
        AND (${unit}::text IS NULL OR u.name = ${unit})
        AND (
          ${searchPattern}::text IS NULL
          OR o."orderNo" ILIKE ${searchPattern}
          OR o."styleDescription" ILIKE ${searchPattern}
        )
      ORDER BY o."createdAt" DESC
      LIMIT ${limit}
      OFFSET ${skip}
    `;
    const totalRows = await sql`
      SELECT COUNT(*)::int AS count
      FROM public."Order" o
      JOIN public."Buyer" b ON b.id = o."buyerId"
      JOIN public."Unit" u ON u.id = o."unitId"
      WHERE (${month}::text IS NULL OR o.month = ${month})
        AND (${status}::text IS NULL OR o."planStatus" = ${status})
        AND (${buyer}::text IS NULL OR b.name = ${buyer})
        AND (${unit}::text IS NULL OR u.name = ${unit})
        AND (
          ${searchPattern}::text IS NULL
          OR o."orderNo" ILIKE ${searchPattern}
          OR o."styleDescription" ILIKE ${searchPattern}
        )
    `;
    const total = Number(totalRows[0]?.count ?? 0);

    const pages = Math.ceil(total / limit);
    return ok(orders, { total, page, pages });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as unknown;
    const parsed = createOrderSchema.safeParse(body);
    
    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const id = randomUUID();
    const data = parsed.data;
    const rows = await sql`
      INSERT INTO public."Order" (
        id, "orderNo", "styleDescription", qty, "buyerId", "unitId", month,
        "specialWork", sam, "totalQty", "fabricSupplier", "fabricInhDate",
        "exFactoryDate", "revisedExFactory", "pcdPlan", "fileHoDate", "rdDate",
        "ppComments", remarks, "planStatus", fob, "totalCost", "producedSam", "prodLeadTime",
        "createdAt", "updatedAt"
      ) VALUES (
        ${id}, ${data.orderNo}, ${data.styleDescription}, ${data.qty}, ${data.buyerId}, ${data.unitId}, ${data.month},
        ${data.specialWork ?? null}, ${data.sam ?? null}, ${data.totalQty ?? null}, ${data.fabricSupplier ?? null}, ${data.fabricInhDate ?? null},
        ${data.exFactoryDate ?? null}, ${data.revisedExFactory ?? null}, ${data.pcdPlan ?? null}, ${data.fileHoDate ?? null}, ${data.rdDate ?? null},
        ${data.ppComments ?? null}, ${data.remarks ?? null}, ${data.planStatus ?? null}, ${data.fob ?? null}, ${data.totalCost ?? null}, ${data.producedSam ?? null}, ${data.prodLeadTime ?? null},
        NOW(), NOW()
      )
      RETURNING id, "orderNo", "styleDescription", qty, month
    `;
    const order = rows[0];

    return created(order);
  } catch (error) {
    return serverError(error);
  }
}
