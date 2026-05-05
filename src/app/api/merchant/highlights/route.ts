import { NextResponse } from "next/server";

import { sql } from "@/lib/db";

export async function GET() {
  try {
    // 1. Fetch Production File Handover (recently completed pfh_status)
    const pfhRows = await sql`
      SELECT id as "orderId", ref_no as "refNo", buyer, brand, style_id as "styleId", style_name as "styleName", pfh_status as "status"
      FROM public.orders
      WHERE pfh_status IS NOT NULL
      ORDER BY delivery_date ASC
      LIMIT 10
    `;

    // 2. Fetch Risk Analysis (orders with high/critical severity from priority engine)
    const riskRows = await sql`
      SELECT o.id as "orderId", o.ref_no as "refNo", o.buyer, o.brand, o.style_id as "styleId", o.style_name as "styleName"
      FROM public.orders o
      JOIN public.priority_scores ps ON o.id = ps.order_id
      WHERE ps.severity IN ('critical', 'high')
      ORDER BY ps.score DESC
      LIMIT 10
    `;

    // 3. Fetch PPM Report (orders with ppm_status completed)
    const ppmRows = await sql`
      SELECT id as "orderId", ref_no as "refNo", buyer, brand, style_id as "styleId", style_name as "styleName"
      FROM public.orders
      WHERE ppm_status = 'approved'
      ORDER BY delivery_date ASC
      LIMIT 10
    `;

    // 4. Fetch Mill Highlights (Lab Dips)
    const labDips = await sql`
      SELECT 
        ld.id, ld.action_status as "actionStatus", ld.sent_date as "sentDate", ld.sent_by as "sentBy", ld.deadline_margin as "deadlineMargin",
        o.ref_no as "refNo", o.buyer, o.brand, o.style_id as "styleId", o.style_name as "styleName"
      FROM public.lab_dips ld
      JOIN public.orders o ON ld.order_id = o.id
      ORDER BY ld.sent_date DESC
      LIMIT 10
    `;

    return NextResponse.json({
      pfh: pfhRows,
      risk: riskRows,
      ppm: ppmRows,
      labDips: labDips,
    });
  } catch (error) {
    console.error("Merchant Highlights GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
