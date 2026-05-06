import { ok, serverError } from '@/lib/api-response';
import { ensureOrdersTable } from "@/lib/cta-schema";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    await ensureOrdersTable();

    const labDipStrikeOff = await sql`
      SELECT
        id,
        ref_no AS "reffNo",
        ref_no AS "vgReffNo",
        created_at AS "sentDate",
        'System' AS "sentBy",
        CASE
          WHEN delivery_date < NOW() THEN 'Overdue'
          ELSE CONCAT(GREATEST(0, EXTRACT(DAY FROM delivery_date - NOW()))::int, 'd buffer')
        END AS "deadlineMargin",
        CASE WHEN approval_pending THEN 'Pending' ELSE 'Sent' END AS status,
        'LAB_DIP' AS "reportType"
      FROM public.orders
      ORDER BY delivery_date ASC NULLS LAST
      LIMIT 100
    `;
    const bulkFobApprovals = await sql`
      SELECT
        id,
        ref_no AS "reffNo",
        ref_no AS "vgReffNo",
        buyer,
        brand,
        style_id AS "styleNo",
        style_name AS "styleName",
        delivery_date AS "reqDate",
        CASE WHEN approval_pending THEN 'Pending' ELSE 'Sent' END AS status
      FROM public.orders
      ORDER BY delivery_date ASC NULLS LAST
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
