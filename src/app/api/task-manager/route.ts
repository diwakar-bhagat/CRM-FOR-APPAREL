import { ok, serverError, validationError } from '@/lib/api-response';
import { paginationQuerySchema } from "@/lib/erp-api";
import { sql } from "@/lib/db";
import { isValidDate } from '@/lib/parse-utils';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const params = url.searchParams;
    const buyer = params.get("buyer");
    const deliveryDate = params.get("deliveryDate");
    
    const parsedPagination = paginationQuerySchema.safeParse({
      page: params.get("page") ?? "1",
      limit: params.get("limit") ?? "100",
    });
    
    if (!parsedPagination.success) {
      return validationError(parsedPagination.error);
    }
    
    const { page, limit } = parsedPagination.data;

    const exFactoryDate = deliveryDate && isValidDate(deliveryDate) ? new Date(deliveryDate) : null;
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
        o."fileHoDate",
        o."pcdPlan",
        o."finalPcdClosure",
        o."rdDate",
        o."ppComments",
        o."specialWork",
        o.fob,
        json_build_object('name', b.name) AS buyer,
        COALESCE(pe.items, '[]'::json) AS "productionEntries",
        COALESCE(te.items, '[]'::json) AS "trimStatus"
      FROM public."Order" o
      JOIN public."Buyer" b ON b.id = o."buyerId"
      LEFT JOIN LATERAL (
        SELECT json_agg(json_build_object(
          'id', id,
          'balanceStitchQty', "balanceStitchQty",
          'balanceSpecialWork', "balanceSpecialWork"
        )) AS items
        FROM public."ProductionEntry"
        WHERE "orderId" = o.id
      ) pe ON true
      LEFT JOIN LATERAL (
        SELECT json_agg(json_build_object(
          'id', id,
          'trimStatus', "trimStatus"
        )) AS items
        FROM public."TrimEntry"
        WHERE "orderId" = o.id
      ) te ON true
      WHERE (${buyer}::text IS NULL OR b.name = ${buyer})
        AND (${exFactoryDate}::timestamptz IS NULL OR o."exFactoryDate" = ${exFactoryDate})
      ORDER BY o."exFactoryDate" ASC
      LIMIT ${limit}
      OFFSET ${skip}
    `;
    const totalRows = await sql`
      SELECT COUNT(*)::int AS count
      FROM public."Order" o
      JOIN public."Buyer" b ON b.id = o."buyerId"
      WHERE (${buyer}::text IS NULL OR b.name = ${buyer})
        AND (${exFactoryDate}::timestamptz IS NULL OR o."exFactoryDate" = ${exFactoryDate})
    `;
    const total = Number(totalRows[0]?.count ?? 0);

    const enrichedOrders = orders.map((order: any) => ({
      ...order,
      vgLinked: Boolean(order.fileHoDate),
      ra: {
        fabrics: [
          order.productionEntries.filter((entry: any) => (entry.balanceStitchQty ?? 0) > 0).length,
          order.productionEntries.filter((entry: any) => (entry.balanceStitchQty ?? 0) === 0).length,
          order.productionEntries.length,
          order.productionEntries.reduce((sum: number, entry: any) => sum + (entry.balanceStitchQty ?? 0), 0),
        ] as number[],
        trims: [
          order.trimStatus.filter((item: any) => item.trimStatus.toLowerCase() === "awaited").length,
          order.trimStatus.filter((item: any) => item.trimStatus.toLowerCase() === "partial").length,
          order.trimStatus.filter((item: any) => item.trimStatus.toLowerCase() === "ok").length,
          order.trimStatus.length,
        ] as number[],
        bulkProcess: order.productionEntries.length,
        fob: order.fob ?? 0,
        bulkEmb: order.productionEntries.reduce((sum: number, item: any) => sum + (item.balanceSpecialWork ?? 0), 0),
        rdGradedPattern: Boolean(order.rdDate),
        pfh: order.fileHoDate ? 1 : 0,
        rd: order.rdDate ? 1 : 0,
        sop: order.finalPcdClosure ? 1 : 0,
        ppm: order.ppComments ? 1 : 0,
      },
    }));

    const pages = Math.ceil(total / limit);
    return ok(enrichedOrders, { total, page, pages });
  } catch (error) {
    return serverError(error);
  }
}
