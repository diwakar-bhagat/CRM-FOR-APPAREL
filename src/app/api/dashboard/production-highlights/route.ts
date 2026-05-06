import { ok, serverError } from '@/lib/api-response';
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const initialRdSopReport = await sql`
      SELECT
        id,
        ref_no AS "orderNo",
        style_name AS "styleDescription",
        sop_status AS "planStatus",
        order_qty AS qty,
        TO_CHAR(delivery_date, 'YYYY-MM') AS month
      FROM public.orders
      ORDER BY delivery_date ASC NULLS LAST
      LIMIT 100
    `;
    const bulkEmbroideryOrder = await sql`
      SELECT
        id,
        ref_no AS "orderNo",
        style_name AS "styleDescription",
        NULL::text AS "specialWork",
        ppm_status AS "planStatus",
        order_qty AS qty,
        TO_CHAR(delivery_date, 'YYYY-MM') AS month
      FROM public.orders
      ORDER BY updated_at DESC
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
