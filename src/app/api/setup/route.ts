import { NextResponse } from "next/server";

import { sql } from "@/lib/db";

/**
 * POST /api/setup
 *
 * Temporary migration endpoint. Creates the `settings`, `products`, and `samples`
 * tables in Neon Postgres if they don't already exist.
 *
 * ⚠ This should be removed or protected in production.
 */
export async function POST() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ success: false, error: "Service misconfigured" }, { status: 503 });
  }

  try {
    // ── Settings table ──────────────────────────
    await sql`
      CREATE TABLE IF NOT EXISTS public.settings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        key TEXT UNIQUE NOT NULL,
        value TEXT NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // Seed default settings (Currency: INR, Location: India)
    const defaults: [string, string][] = [
      ["currency", "INR"],
      ["currency_symbol", "₹"],
      ["currency_locale", "en-IN"],
      ["location", "India"],
      ["company_name", "CTA Apparels"],
      ["timezone", "Asia/Kolkata"],
    ];

    for (const [key, value] of defaults) {
      await sql`
        INSERT INTO public.settings (key, value)
        VALUES (${key}, ${value})
        ON CONFLICT (key) DO NOTHING
      `;
    }

    // ── Products table ──────────────────────────
    await sql`
      CREATE TABLE IF NOT EXISTS public.products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        sku TEXT UNIQUE NOT NULL,
        description TEXT,
        category TEXT,
        price NUMERIC(12,2) NOT NULL DEFAULT 0,
        cost_price NUMERIC(12,2),
        stock_qty INTEGER NOT NULL DEFAULT 0,
        min_stock_level INTEGER NOT NULL DEFAULT 0,
        unit TEXT NOT NULL DEFAULT 'pcs',
        image_url TEXT,
        status TEXT NOT NULL DEFAULT 'active',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // ── Samples table ───────────────────────────
    await sql`
      CREATE TABLE IF NOT EXISTS public.samples (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
        product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
        name TEXT NOT NULL,
        buyer TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'requested',
        submitted_date TIMESTAMPTZ,
        feedback_date TIMESTAMPTZ,
        feedback_notes TEXT,
        image_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    return NextResponse.json({
      success: true,
      data: {
        message: "Migration completed. Tables: settings, products, samples created/verified.",
        tables: ["settings", "products", "samples"],
      },
    });
  } catch (error) {
    console.error("[setup:post] failed:", (error as Error).message);
    return NextResponse.json({ success: false, error: "Migration failed" }, { status: 500 });
  }
}
