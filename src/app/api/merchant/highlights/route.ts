import { NextResponse } from "next/server";

import { ensureOrdersTable } from "@/lib/cta-schema";
import { sql } from "@/lib/db";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ success: false, error: "Service misconfigured" }, { status: 503 });
  }

  try {
    await ensureOrdersTable();
    await sql`
      CREATE TABLE IF NOT EXISTS public.lab_dips (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
        action_status TEXT DEFAULT 'pending',
        sent_date TIMESTAMPTZ,
        sent_by TEXT,
        deadline_margin TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

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
      WHERE o.delivery_date < NOW() OR o.approval_pending = true
      ORDER BY o.delivery_date ASC NULLS LAST
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
      success: true,
      data: {
        pfh: pfhRows,
        risk: riskRows,
        ppm: ppmRows,
        labDips: labDips,
      },
    });
  } catch (error) {
    console.error("[merchant:highlights:get] failed:", (error as Error).message);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
