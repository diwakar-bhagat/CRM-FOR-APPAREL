import { ok, serverError } from '@/lib/api-response';
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const summaries = await sql`
      SELECT id, month, "buyerName", "planToShip", "stitchedQty", "balToSew"
      FROM public."MonthlySummary"
      ORDER BY month ASC
    `;

    const buyers = [...new Set(summaries.map((item: any) => item.buyerName))];
    const months = [...new Set(summaries.map((item: any) => new Date(item.month as string | Date).toISOString().slice(0, 7)))];

    return ok({ summaries, buyers, months });
  } catch (error) {
    return serverError(error);
  }
}
