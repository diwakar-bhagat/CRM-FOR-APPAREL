import { NextResponse } from "next/server";

import { sql } from "@/lib/db";
import { CACHE_KEYS, SETTINGS_CACHE_TTL, redis } from "@/lib/redis";
import type { GlobalConfig } from "@/types/app";

const DEFAULT_SETTINGS: Record<string, string> = {
  currency: "INR",
  currency_symbol: "₹",
  currency_locale: "en-IN",
  location: "India",
  company_name: "CTA Apparels",
  timezone: "Asia/Kolkata",
};

async function ensureSettingsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS public.settings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      key TEXT UNIQUE NOT NULL,
      value TEXT NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    await sql`
      INSERT INTO public.settings (key, value)
      VALUES (${key}, ${value})
      ON CONFLICT (key) DO NOTHING
    `;
  }
}

/**
 * GET /api/settings
 *
 * Returns all global settings as a flat config object.
 * Uses Redis as a fast read-path cache. Falls back to Neon on cache miss.
 */
export async function GET() {
  try {
    // 1. Try Redis cache first
    const cached = redis ? await redis.get<GlobalConfig>(CACHE_KEYS.GLOBAL_SETTINGS) : null;
    if (cached) {
      return NextResponse.json({ settings: cached, cached: true });
    }

    await ensureSettingsTable();

    // 2. Cache miss — read from Neon
    const rows = await sql`SELECT key, value FROM public.settings`;

    const config: Record<string, string> = {};
    for (const row of rows) {
      // Convert snake_case DB keys to camelCase for the frontend
      const camelKey = (row.key as string).replace(/_([a-z])/g, (_, c) => c.toUpperCase());
      config[camelKey] = row.value as string;
    }

    const settings = config as unknown as GlobalConfig;

    // 3. Populate Redis cache
    if (redis) {
      await redis
        .set(CACHE_KEYS.GLOBAL_SETTINGS, JSON.stringify(settings), {
          ex: SETTINGS_CACHE_TTL,
        })
        .catch(console.error);
    }

    return NextResponse.json({ settings, cached: false });
  } catch (error) {
    console.error("[settings:get] failed:", (error as Error).message);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

/**
 * PATCH /api/settings
 *
 * Updates one or more settings in Neon and invalidates the Redis cache.
 *
 * Body: { currency?: string, currencySymbol?: string, location?: string, ... }
 */
export async function PATCH(request: Request) {
  try {
    await ensureSettingsTable();
    const body = await request.json();

    // Map camelCase keys back to snake_case for the DB
    const keyMap: Record<string, string> = {
      currency: "currency",
      currencySymbol: "currency_symbol",
      currencyLocale: "currency_locale",
      location: "location",
      companyName: "company_name",
      timezone: "timezone",
    };

    let updatedCount = 0;

    for (const [camelKey, value] of Object.entries(body)) {
      const dbKey = keyMap[camelKey];
      if (!dbKey || typeof value !== "string") continue;

      await sql`
        UPDATE public.settings
        SET value = ${value}, updated_at = NOW()
        WHERE key = ${dbKey}
      `;
      updatedCount++;
    }

    if (updatedCount === 0) {
      return NextResponse.json({ error: "No valid settings to update" }, { status: 400 });
    }

    // Invalidate Redis cache so next GET fetches fresh data
    if (redis) {
      await redis.del(CACHE_KEYS.GLOBAL_SETTINGS).catch(console.error);
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updatedCount} setting(s).`,
    });
  } catch (error) {
    console.error("[settings:patch] failed:", (error as Error).message);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
