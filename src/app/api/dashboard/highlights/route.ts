import { ok, serverError } from '@/lib/api-response';
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const productionFileHandover = await sql`
      SELECT o."orderNo", o."styleDescription", b.name AS "buyerName"
      FROM public."Order" o
      JOIN public."Buyer" b ON b.id = o."buyerId"
      WHERE o."fileHoDate" IS NOT NULL
      ORDER BY o."fileHoDate" DESC
      LIMIT 50
    `;
    const riskAnalysis = await sql`
      SELECT
        r."riskType",
        r.severity,
        o."orderNo",
        o."styleDescription",
        b.name AS "buyerName"
      FROM public."RiskFlag" r
      JOIN public."Order" o ON o.id = r."orderId"
      JOIN public."Buyer" b ON b.id = o."buyerId"
      WHERE r.resolved = false
      ORDER BY r."createdAt" DESC
      LIMIT 50
    `;
    const ppmReport = await sql`
      SELECT "orderNo"
      FROM public."Order"
      WHERE "ppComments" IS NOT NULL
      ORDER BY "updatedAt" DESC
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
