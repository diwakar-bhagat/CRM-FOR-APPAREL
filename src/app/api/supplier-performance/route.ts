import { NextResponse } from "next/server";

import { ensureSupplierPerformanceTables } from "@/lib/cta-schema";
import { sql } from "@/lib/db";

type SupplierPerformanceRow = {
  id: string;
  supplierName: string;
  category: string;
  buyer: string | null;
  orderRef: string | null;
  dueDate: string | null;
  actualDate: string | null;
  qualityStatus: string;
  rejectionCount: number;
  delayDays: number;
  remarks: string | null;
  createdAt: string;
};

type SupplierRollup = {
  supplier: string;
  events: number;
  avgDelayDays: number;
  rejectionCount: number;
};

export async function GET(request: Request) {
  try {
    await ensureSupplierPerformanceTables();
    const { searchParams } = new URL(request.url);
    const supplier = searchParams.get("supplier");
    const category = searchParams.get("category");
    const quality = searchParams.get("quality");

    const rows = (await sql`
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
        AND (${quality}::text IS NULL OR quality_status = ${quality})
      ORDER BY created_at DESC
      LIMIT 200
    `) as SupplierPerformanceRow[];

    const total = rows.length;
    const onTime = rows.filter((row) => Number(row.delayDays ?? 0) <= 0).length;
    const rejectionCount = rows.reduce((sum, row) => sum + Number(row.rejectionCount ?? 0), 0);
    const avgDelay = total ? rows.reduce((sum, row) => sum + Number(row.delayDays ?? 0), 0) / total : 0;
    const openIssues = rows.filter((row) => row.qualityStatus !== "APPROVED").length;
    const supplierRollup = Object.values(
      rows.reduce<Record<string, SupplierRollup>>(
        (acc, row) => {
          const key = row.supplierName;
          if (!acc[key]) acc[key] = { supplier: key, events: 0, avgDelayDays: 0, rejectionCount: 0 };
          acc[key].events += 1;
          acc[key].avgDelayDays += Number(row.delayDays ?? 0);
          acc[key].rejectionCount += Number(row.rejectionCount ?? 0);
          return acc;
        },
        {},
      ),
    ).map((entry) => ({
      ...entry,
      avgDelayDays: Number((entry.events ? entry.avgDelayDays / entry.events : 0).toFixed(1)),
    }));

    return NextResponse.json({
      success: true,
      data: rows,
      analysis: {
        topDelayedSuppliers: supplierRollup
          .sort((a, b) => b.avgDelayDays - a.avgDelayDays)
          .slice(0, 5),
        topRejectionSuppliers: [...supplierRollup]
          .sort((a, b) => b.rejectionCount - a.rejectionCount)
          .slice(0, 5),
      },
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
