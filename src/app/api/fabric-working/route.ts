import { z } from 'zod';
import { ok, serverError, validationError } from '@/lib/api-response';
import { parsePagination } from '@/lib/parse-utils';
import { sql } from '@/lib/db';

const getFabricWorkingSchema = z.object({
  status: z.string().default('All Items'),
  buyer: z.string().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(50),
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const params = {
      status: url.searchParams.get('status') ?? 'All Items',
      buyer: url.searchParams.get('buyer'),
      page: url.searchParams.get('page'),
      limit: url.searchParams.get('limit'),
    };

    const parsed = getFabricWorkingSchema.safeParse(params);
    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const { status, buyer, page, limit } = parsed.data;
    const { skip } = parsePagination(page, limit);

    const orders = await sql`
      SELECT
        o.id,
        o.ref_no AS "orderNo",
        o.style_name AS "styleDescription",
        o.order_qty AS qty,
        o.delivery_date AS "exFactoryDate",
        NULL::timestamptz AS "pcdPlan",
        json_build_object('name', o.buyer) AS buyer,
        '[]'::json AS "productionEntries"
      FROM public.orders o
      WHERE (${buyer}::text IS NULL OR o.buyer ILIKE ${buyer})
      ORDER BY o.delivery_date ASC NULLS LAST, o.ref_no ASC
      LIMIT ${limit}
      OFFSET ${skip}
    `;
    const totalRows = await sql`
      SELECT COUNT(*)::int AS count
      FROM public.orders o
      WHERE (${buyer}::text IS NULL OR o.buyer ILIKE ${buyer})
    `;
    const total = Number(totalRows[0]?.count ?? 0);

    const normalized = orders.map((order: any) => {
      const latestEntry = order.productionEntries[0];
      const pendingItems = Math.max(
        0,
        (latestEntry?.balanceCuttingQty ?? 0) + (latestEntry?.balanceStitchQty ?? 0)
      );
      const fabricStatus = pendingItems > 0 ? 'Pending' : 'In-House';

      return {
        ...order,
        fabricStatus,
        pendingItems,
      };
    });

    const filtered =
      status !== 'All Items'
        ? normalized.filter((order: any) => order.fabricStatus === status)
        : normalized;

    const pages = Math.ceil(total / limit);
    return ok(filtered, { total, page, pages });
  } catch (error) {
    return serverError(error);
  }
}
