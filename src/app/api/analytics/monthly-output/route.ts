import { z } from 'zod';
import { ok, serverError, validationError } from '@/lib/api-response';
import { sql } from "@/lib/db";
import { safeInt } from '@/lib/parse-utils';

const getAnalyticsSchema = z.object({
  year: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const params = {
      year: url.searchParams.get("year"),
    };

    const parsed = getAnalyticsSchema.safeParse(params);
    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const year = params.year ? safeInt(params.year) : new Date().getFullYear();
    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year}-12-31`);

    const summaries = await sql`
      SELECT
        date_trunc('month', delivery_date) AS month,
        SUM(COALESCE(order_qty, 0))::float AS "planToShip",
        SUM(CASE WHEN ppm_status = 'APPROVED' THEN COALESCE(order_qty, 0) ELSE 0 END)::float AS "stitchedQty",
        SUM(CASE WHEN ppm_status <> 'APPROVED' OR ppm_status IS NULL THEN COALESCE(order_qty, 0) ELSE 0 END)::float AS "balToSew"
      FROM public.orders
      WHERE delivery_date >= ${start}
        AND delivery_date <= ${end}
      GROUP BY date_trunc('month', delivery_date)
      ORDER BY month ASC
    `;

    const grouped = new Map<string, { month: string; totalPlanned: number; totalStitched: number; balToSew: number }>();
    for (const item of summaries) {
      const month = new Date(item.month as string | Date).toISOString().slice(0, 7);
      const current = grouped.get(month) ?? { month, totalPlanned: 0, totalStitched: 0, balToSew: 0 };
      current.totalPlanned += Number(item.planToShip ?? 0);
      current.totalStitched += Number(item.stitchedQty ?? 0);
      current.balToSew += Number(item.balToSew ?? 0);
      grouped.set(month, current);
    }

    return ok([...grouped.values()]);
  } catch (error) {
    return serverError(error);
  }
}
