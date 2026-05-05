import { NextResponse } from "next/server";

import { sql } from "@/lib/db";
import type { Order } from "@/types/erp";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // In a real app we'd also join priority_scores and derived_signals
    const rows = await sql`
      SELECT 
        o.*,
        ds.delay_days as "delayDays",
        ds.is_delayed as "isDelayed",
        ds.is_blocked as "isBlocked",
        ds.blocked_reason as "blockedReason",
        ds.inactivity_hours as "inactivityHours",
        ds.cascade_risk as "cascadeRisk",
        ds.cascade_reason as "cascadeReason",
        ds.deadline_proximity as "deadlineProximity"
      FROM public.orders o
      LEFT JOIN public.derived_signals ds ON ds.order_id = o.id
      WHERE o.id = ${id}
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Convert keys to camelCase based on Order type
    const raw = rows[0];
    const order: Order & { derivedSignals?: any } = {
      id: raw.id,
      refNo: raw.ref_no,
      buyer: raw.buyer,
      brand: raw.brand,
      styleId: raw.style_id,
      styleName: raw.style_name,
      orderQty: raw.order_qty,
      deliveryDate: raw.delivery_date,
      pfhStatus: raw.pfh_status,
      sopStatus: raw.sop_status,
      ppmStatus: raw.ppm_status,
      approvalPending: raw.approval_pending,
      vendorLastActive: raw.vendor_last_active,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
      derivedSignals: {
        isDelayed: raw.isDelayed,
        delayDays: raw.delayDays,
        isBlocked: raw.isBlocked,
        blockedReason: raw.blockedReason,
        inactivityHours: raw.inactivityHours,
        cascadeRisk: raw.cascadeRisk,
        cascadeReason: raw.cascadeReason,
        deadlineProximity: raw.deadlineProximity,
      },
    };

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Order Detail API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Expected fields to patch: pfhStatus, sopStatus, ppmStatus, approvalPending
    // For MVP, we'll construct a simple update. In prod, use Drizzle.

    const updateQueries = [];
    if (body.pfhStatus !== undefined) updateQueries.push(sql`pfh_status = ${body.pfhStatus}`);
    if (body.sopStatus !== undefined) updateQueries.push(sql`sop_status = ${body.sopStatus}`);
    if (body.ppmStatus !== undefined) updateQueries.push(sql`ppm_status = ${body.ppmStatus}`);
    if (body.approvalPending !== undefined) updateQueries.push(sql`approval_pending = ${body.approvalPending}`);

    if (updateQueries.length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    // Warning: Manual string building for set clauses in serverless neon is tricky,
    // it's safer to update all commonly updated fields or use an ORM.
    // Since this is a mock API, we'll update explicitly if they exist.

    await sql`
      UPDATE public.orders 
      SET 
        pfh_status = COALESCE(${body.pfhStatus ?? null}, pfh_status),
        sop_status = COALESCE(${body.sopStatus ?? null}, sop_status),
        ppm_status = COALESCE(${body.ppmStatus ?? null}, ppm_status),
        approval_pending = COALESCE(${body.approvalPending ?? null}, approval_pending),
        updated_at = NOW()
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order Update API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
