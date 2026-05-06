import { ok, serverError } from '@/lib/api-response';
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const productionFileHandover = await sql`
      SELECT o.ref_no AS "orderNo", o.style_name AS "styleDescription", o.buyer AS "buyerName"
      FROM public.orders o
      ORDER BY o.delivery_date ASC NULLS LAST
      LIMIT 50
    `;
    const riskAnalysis = await sql`
      SELECT
        'DELIVERY_RISK' AS "riskType",
        CASE WHEN o.delivery_date < NOW() THEN 'high' ELSE 'medium' END AS severity,
        o.ref_no AS "orderNo",
        o.style_name AS "styleDescription",
        o.buyer AS "buyerName"
      FROM public.orders o
      WHERE o.delivery_date IS NOT NULL
      ORDER BY o.delivery_date ASC
      LIMIT 50
    `;
    const ppmReport = await sql`
      SELECT ref_no AS "orderNo"
      FROM public.orders
      WHERE ppm_status IS NOT NULL
      ORDER BY updated_at DESC
      LIMIT 50
    `;

    const data = {
      productionFileHandover: productionFileHandover.map((entry: any) => ({
        reffNo: entry.orderNo,
        vgReffNo: null,
        buyer: entry.buyerName,
        brand: null,
        styleNo: null,
        styleName: entry.styleDescription,
      })),
      riskAnalysis: riskAnalysis.map((flag: any) => ({
        reffNo: flag.orderNo,
        vgReffNo: null,
        buyer: flag.buyerName,
        brand: null,
        styleNo: null,
        styleName: flag.styleDescription,
        riskType: flag.riskType,
        severity: flag.severity,
      })),
      ppmReport: ppmReport.map((order: any) => ({
        reffNo: order.orderNo,
        vgReffNo: null,
      })),
    };

    return ok(data);
  } catch (error) {
    return serverError(error);
  }
}
