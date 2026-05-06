import { NextResponse } from "next/server";

import { sql } from "@/lib/db";
import { ensureOrderProcessTable } from "@/lib/cta-schema";

export async function POST() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ success: false, error: "Service misconfigured" }, { status: 503 });
  }

  try {
    await ensureOrderProcessTable();

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

    await sql`
      INSERT INTO public.order_processes (order_id)
      SELECT id
      FROM public.orders
      ON CONFLICT (order_id) DO NOTHING
    `;

    return NextResponse.json({
      success: true,
      data: {
        message: "Merchant dashboard tables are ready.",
      },
    });
  } catch (error) {
    console.error("[setup-merchant:post] failed:", (error as Error).message);
    return NextResponse.json({ success: false, error: "Migration failed" }, { status: 500 });
  }
}
