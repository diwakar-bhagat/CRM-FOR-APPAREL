import { ok, serverError, validationError } from '@/lib/api-response';
import { paginationQuerySchema } from "@/lib/erp-api";
import { ensureOrdersTable } from "@/lib/cta-schema";
import { sql } from "@/lib/db";
import { isValidDate } from '@/lib/parse-utils';

export async function GET(request: Request) {
  try {
    await ensureOrdersTable();

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
        o.ref_no AS "orderNo",
        o.style_name AS "styleDescription",
        o.order_qty AS qty,
        TO_CHAR(o.delivery_date, 'YYYY-MM') AS month,
        COALESCE(o.pfh_status, 'Pending') AS "planStatus",
        o.delivery_date AS "exFactoryDate",
        NULL::timestamptz AS "fileHoDate",
        NULL::timestamptz AS "pcdPlan",
        NULL::timestamptz AS "finalPcdClosure",
        NULL::timestamptz AS "rdDate",
        NULL::text AS "ppComments",
        NULL::text AS "specialWork",
        NULL::numeric AS fob,
        json_build_object('name', o.buyer) AS buyer,
        '[]'::json AS "productionEntries",
        '[]'::json AS "trimStatus"
      FROM public.orders o
      WHERE (${buyer}::text IS NULL OR o.buyer = ${buyer})
        AND (${exFactoryDate}::timestamptz IS NULL OR o.delivery_date = ${exFactoryDate})
      ORDER BY o.delivery_date ASC NULLS LAST, o.ref_no ASC
      LIMIT ${limit}
      OFFSET ${skip}
    `;
    const totalRows = await sql`
      SELECT COUNT(*)::int AS count
      FROM public.orders o
      WHERE (${buyer}::text IS NULL OR o.buyer = ${buyer})
        AND (${exFactoryDate}::timestamptz IS NULL OR o.delivery_date = ${exFactoryDate})
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
    return Response.json({ orders: enrichedOrders, data: enrichedOrders, total, page, pages });
  } catch (error) {
    return serverError(error);
  }
}
