import { NextResponse } from "next/server";

import { sql } from "@/lib/db";

export async function POST() {
  try {
    // 1. Add new columns to orders if they don't exist
    await sql`
      ALTER TABLE public.orders 
      ADD COLUMN IF NOT EXISTS total_reqd_qty NUMERIC(12,2) DEFAULT 0,
      ADD COLUMN IF NOT EXISTS target_pfh_date TIMESTAMPTZ
    `;

    // 2. Create Fabric Tracking Table
    await sql`
      CREATE TABLE IF NOT EXISTS public.fabric_tracking (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
        status_red INTEGER DEFAULT 0,
        status_orange INTEGER DEFAULT 0,
        status_green INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(order_id)
      )
    `;

    // 3. Create Trims Tracking Table
    await sql`
      CREATE TABLE IF NOT EXISTS public.trims_tracking (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
        status_red INTEGER DEFAULT 0,
        status_orange INTEGER DEFAULT 0,
        status_green INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(order_id)
      )
    `;

    // 4. Create Lab Dips Table (Mill Highlights)
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

    // Seed dummy data for existing orders to populate the new dashboards
    await sql`
      INSERT INTO public.fabric_tracking (order_id, status_red, status_orange, status_green)
      SELECT id, floor(random() * 3), floor(random() * 3), floor(random() * 3)
      FROM public.orders
      ON CONFLICT (order_id) DO NOTHING
    `;

    await sql`
      INSERT INTO public.trims_tracking (order_id, status_red, status_orange, status_green)
      SELECT id, floor(random() * 5), floor(random() * 5), floor(random() * 5)
      FROM public.orders
      ON CONFLICT (order_id) DO NOTHING
    `;

    return NextResponse.json({
      success: true,
      message: "Merchant dashboard tables created and seeded successfully.",
    });
  } catch (error) {
    console.error("Merchant Setup Error:", error);
    return NextResponse.json(
      { error: "Migration failed", details: String(error) },
      { status: 500 }
    );
  }
}
