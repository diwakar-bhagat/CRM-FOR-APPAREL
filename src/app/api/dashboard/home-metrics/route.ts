import { NextResponse } from "next/server";

import { ensureOrdersTable } from "@/lib/cta-schema";
import { sql } from "@/lib/db";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ success: false, error: "Service misconfigured" }, { status: 503 });
  }

  try {
    await ensureOrdersTable();

    const [summary] = await sql`
      SELECT
        COUNT(*)::int AS "totalOrders",
        COALESCE(SUM(order_qty), 0)::float AS "totalUnits",
        COALESCE(SUM(revenue_value), 0)::float AS "totalRevenue",
        COUNT(*) FILTER (WHERE approval_pending = true)::int AS "atRiskOrders",
        COUNT(*) FILTER (WHERE delivery_date < NOW() AND COALESCE(ppm_status, '') <> 'completed')::int AS "delayedOrders",
        COUNT(DISTINCT buyer)::int AS "activeBuyers"
      FROM public.orders
    `;

    const revenueByBuyer = await sql`
      SELECT buyer, COALESCE(SUM(revenue_value), 0)::float AS revenue
      FROM public.orders
      WHERE buyer IS NOT NULL
      GROUP BY buyer
      ORDER BY revenue DESC
      LIMIT 12
    `;

    return NextResponse.json({ success: true, data: { summary, revenueByBuyer } });
  } catch (error) {
    console.error("[dashboard:home-metrics] failed:", (error as Error).message);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
