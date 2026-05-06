import { paginationQuerySchema } from "@/lib/erp-api";
import { ok, serverError, validationError } from "@/lib/api-response";
import { sql } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const params = url.searchParams;
    const distinct = params.get("distinct");
    
    if (distinct === "buyers") {
      const buyers = await sql`
        SELECT DISTINCT buyer AS name
        FROM public.orders
        WHERE buyer IS NOT NULL AND buyer <> ''
        ORDER BY buyer ASC
      `;
      return ok(buyers.map((buyer: any) => buyer.name));
    }
    
    if (distinct === "months") {
      const months = await sql`
        SELECT DISTINCT TO_CHAR(delivery_date, 'YYYY-MM') AS month
        FROM public.orders
        WHERE delivery_date IS NOT NULL
        ORDER BY month ASC
      `;
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
    const status = params.get("status");
    const search = params.get("search");
    const { page, limit } = parsedPagination.data;

    const searchPattern = search ? `%${search}%` : null;
    const skip = (page - 1) * limit;
    const orders = await sql`
      SELECT
        o.id,
        o.ref_no,
        o.ref_no AS "refNo",
        o.buyer,
        o.brand,
        o.style_id,
        o.style_id AS "styleId",
        o.style_name,
        o.style_name AS "styleName",
        o.order_qty,
        o.order_qty AS "orderQty",
        o.delivery_date,
        o.delivery_date AS "deliveryDate",
        o.pfh_status,
        o.pfh_status AS "pfhStatus",
        o.sop_status,
        o.sop_status AS "sopStatus",
        o.ppm_status,
        o.ppm_status AS "ppmStatus",
        o.approval_pending,
        o.approval_pending AS "approvalPending",
        o.vendor_last_active,
        o.vendor_last_active AS "vendorLastActive",
        o.created_at,
        o.created_at AS "createdAt",
        o.updated_at,
        o.updated_at AS "updatedAt"
      FROM public.orders o
      WHERE (${month}::text IS NULL OR TO_CHAR(o.delivery_date, 'YYYY-MM') = ${month})
        AND (${status}::text IS NULL OR ${status}::text = 'All' OR ${status}::text = 'All Items')
        AND (${buyer}::text IS NULL OR o.buyer = ${buyer})
        AND (
          ${searchPattern}::text IS NULL
          OR o.ref_no ILIKE ${searchPattern}
          OR o.style_id ILIKE ${searchPattern}
          OR o.style_name ILIKE ${searchPattern}
          OR o.buyer ILIKE ${searchPattern}
          OR o.brand ILIKE ${searchPattern}
        )
      ORDER BY o.delivery_date ASC NULLS LAST, o.ref_no ASC
      LIMIT ${limit}
      OFFSET ${skip}
    `;
    const totalRows = await sql`
      SELECT COUNT(*)::int AS count
      FROM public.orders o
      WHERE (${month}::text IS NULL OR TO_CHAR(o.delivery_date, 'YYYY-MM') = ${month})
        AND (${status}::text IS NULL OR ${status}::text = 'All' OR ${status}::text = 'All Items')
        AND (${buyer}::text IS NULL OR o.buyer = ${buyer})
        AND (
          ${searchPattern}::text IS NULL
          OR o.ref_no ILIKE ${searchPattern}
          OR o.style_id ILIKE ${searchPattern}
          OR o.style_name ILIKE ${searchPattern}
          OR o.buyer ILIKE ${searchPattern}
          OR o.brand ILIKE ${searchPattern}
        )
    `;
    const total = Number(totalRows[0]?.count ?? 0);

    const pages = Math.ceil(total / limit);
    return Response.json({ orders, data: orders, total, page, pages });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json() as any;
    const rows = await sql`
      INSERT INTO public.orders (
        ref_no, buyer, brand, style_id, style_name, order_qty, delivery_date
      ) VALUES (
        ${data.refNo ?? data.ref_no},
        ${data.buyer},
        ${data.brand ?? null},
        ${data.styleNo ?? data.styleId ?? data.style_id ?? null},
        ${data.styleName ?? data.style_name ?? null},
        ${Number(data.orderQty ?? data.order_qty ?? 0)},
        ${data.deliveryDate ? new Date(data.deliveryDate) : null}
      )
      RETURNING
        id,
        ref_no,
        ref_no AS "refNo",
        buyer,
        brand,
        style_id,
        style_id AS "styleId",
        style_name,
        style_name AS "styleName",
        order_qty,
        order_qty AS "orderQty",
        delivery_date,
        delivery_date AS "deliveryDate"
    `;
    const order = rows[0];

    return Response.json({ order, data: order }, { status: 201 });
  } catch (error) {
    return serverError(error);
  }
}
