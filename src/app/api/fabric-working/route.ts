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
        o."orderNo",
        o."styleDescription",
        o.qty,
        o."exFactoryDate",
        o."pcdPlan",
        json_build_object('name', b.name) AS buyer,
        COALESCE(
          json_agg(
            json_build_object(
              'balanceCuttingQty', pe."balanceCuttingQty",
              'balanceStitchQty', pe."balanceStitchQty"
            )
            ORDER BY pe."entryDate" DESC
          ) FILTER (WHERE pe.id IS NOT NULL),
          '[]'::json
        ) AS "productionEntries"
      FROM public."Order" o
      JOIN public."Buyer" b ON b.id = o."buyerId"
      LEFT JOIN LATERAL (
        SELECT id, "balanceCuttingQty", "balanceStitchQty", "entryDate"
        FROM public."ProductionEntry"
        WHERE "orderId" = o.id
        ORDER BY "entryDate" DESC
        LIMIT 1
      ) pe ON true
      WHERE (${buyer}::text IS NULL OR b.name ILIKE ${buyer})
      GROUP BY o.id, b.name
      ORDER BY o."createdAt" DESC
      LIMIT ${limit}
      OFFSET ${skip}
    `;
    const totalRows = await sql`
      SELECT COUNT(*)::int AS count
      FROM public."Order" o
      JOIN public."Buyer" b ON b.id = o."buyerId"
      WHERE (${buyer}::text IS NULL OR b.name ILIKE ${buyer})
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
