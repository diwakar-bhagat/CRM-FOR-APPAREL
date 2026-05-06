import { ok, serverError } from '@/lib/api-response';
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const labDipStrikeOff = await sql`
      SELECT id, "reffNo", "vgReffNo", "sentDate", "sentBy", "deadlineMargin", status, "reportType"
      FROM public."MillReport"
      WHERE "reportType" IN ('LAB_DIP', 'STRIKE_OFF')
      ORDER BY "createdAt" DESC
      LIMIT 100
    `;
    const bulkFobApprovals = await sql`
      SELECT id, "reffNo", "vgReffNo", buyer, brand, "styleNo", "styleName", "reqDate", status
      FROM public."FobApproval"
      ORDER BY "createdAt" DESC
      LIMIT 100
    `;

    return ok({
      labDipStrikeOff,
      bulkFobApprovals,
      total: labDipStrikeOff.length,
    });
  } catch (error) {
    return serverError(error);
  }
}
