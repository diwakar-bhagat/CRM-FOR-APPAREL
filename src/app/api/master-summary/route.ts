import { ok, serverError } from '@/lib/api-response';
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const summaries = await sql`
      SELECT
        MIN(id::text) AS id,
        date_trunc('month', delivery_date) AS month,
        buyer AS "buyerName",
        SUM(COALESCE(order_qty, 0))::float AS "planToShip",
        SUM(CASE WHEN ppm_status = 'APPROVED' THEN COALESCE(order_qty, 0) ELSE 0 END)::float AS "stitchedQty",
        SUM(CASE WHEN ppm_status <> 'APPROVED' OR ppm_status IS NULL THEN COALESCE(order_qty, 0) ELSE 0 END)::float AS "balToSew"
      FROM public.orders
      WHERE delivery_date IS NOT NULL
      GROUP BY date_trunc('month', delivery_date), buyer
      ORDER BY month ASC
    `;

    const buyers = [...new Set(summaries.map((item: any) => item.buyerName))];
    const months = [...new Set(summaries.map((item: any) => new Date(item.month as string | Date).toISOString().slice(0, 7)))];

    return ok({ summaries, buyers, months });
  } catch (error) {
    return serverError(error);
  }
}
