import { ok, serverError } from '@/lib/api-response';
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const initialRdSopReport = await sql`
      SELECT id, "orderNo", "styleDescription", "planStatus", qty, month
      FROM public."Order"
      WHERE "rdDate" IS NOT NULL
      ORDER BY "rdDate" DESC
      LIMIT 100
    `;
    const bulkEmbroideryOrder = await sql`
      SELECT id, "orderNo", "styleDescription", "specialWork", "planStatus", qty, month
      FROM public."Order"
      WHERE "specialWork" ILIKE '%Emb.%'
      ORDER BY "createdAt" DESC
      LIMIT 100
    `;

    return ok({
      initialRdSopReport,
      bulkEmbroideryOrder,
    });
  } catch (error) {
    return serverError(error);
  }
}
