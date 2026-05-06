import { NextResponse } from "next/server";

import { ensureSupplierPerformanceTables } from "@/lib/cta-schema";
import { sql } from "@/lib/db";

export async function GET(request: Request) {
  try {
    await ensureSupplierPerformanceTables();
    const { searchParams } = new URL(request.url);
    const supplier = searchParams.get("supplier");
    const category = searchParams.get("category");

    const rows = await sql`
      SELECT
        id,
        supplier_name AS "supplierName",
        category,
        buyer,
        order_ref AS "orderRef",
        due_date AS "dueDate",
        actual_date AS "actualDate",
        quality_status AS "qualityStatus",
        rejection_count AS "rejectionCount",
        delay_days AS "delayDays",
        remarks,
        created_at AS "createdAt"
      FROM public.supplier_performance_events
      WHERE (${supplier}::text IS NULL OR supplier_name = ${supplier})
        AND (${category}::text IS NULL OR category = ${category})
      ORDER BY created_at DESC
      LIMIT 200
    `;

    const total = rows.length;
    const onTime = rows.filter((row: any) => Number(row.delayDays ?? 0) <= 0).length;
    const rejectionCount = rows.reduce((sum: number, row: any) => sum + Number(row.rejectionCount ?? 0), 0);
    const avgDelay = total ? rows.reduce((sum: number, row: any) => sum + Number(row.delayDays ?? 0), 0) / total : 0;
    const openIssues = rows.filter((row: any) => row.qualityStatus !== "APPROVED").length;

    return NextResponse.json({
      success: true,
      data: rows,
      summary: {
        onTimePct: total ? Math.round((onTime / total) * 100) : 0,
        avgDelayDays: Number(avgDelay.toFixed(1)),
        rejectionCount,
        openIssues,
      },
    });
  } catch (error) {
    console.error("[supplier-performance:get] failed:", (error as Error).message);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
