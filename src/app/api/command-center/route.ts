import { NextResponse } from "next/server";

import { ensurePriorityTables } from "@/lib/cta-schema";
import { sql } from "@/lib/db";
import { CACHE_KEYS, CACHE_TTL, redis } from "@/lib/redis";
import type { CommandCenterResponse, PriorityItem } from "@/types/erp";

export async function GET(request: Request) {
  try {
    await ensurePriorityTables();

    const url = new URL(request.url);
    const severityFilter = url.searchParams.get("severity");

    // 1. Try Cache First (Fast Read Path)
    const cacheKey = severityFilter ? CACHE_KEYS.PRIORITY_FILTERED(severityFilter) : CACHE_KEYS.PRIORITY_LIST;

    const cachedData = redis ? await redis.get<CommandCenterResponse>(cacheKey) : null;

    if (cachedData) {
      return NextResponse.json({
        ...cachedData,
        meta: { ...cachedData.meta, cached: true },
      });
    }

    // 2. Cache Miss - Query Postgres Fallback
    const rows = await sql`
      SELECT 
        o.id as "orderId",
        o.ref_no as "refNo",
        o.buyer,
        o.style_id as "styleId",
        o.delivery_date as "deliveryDate",
        o.pfh_status as "pfhStatus",
        o.sop_status as "sopStatus",
        o.ppm_status as "ppmStatus",
        o.approval_pending as "approvalPending",
        ps.score,
        ps.severity,
        ps.reason_codes as "reasonCodes",
        ps.recommended_action as "recommendedAction",
        ds.cascade_risk as "cascadeRisk"
      FROM public.priority_scores ps
      JOIN public.orders o ON ps.order_id = o.id
      JOIN public.derived_signals ds ON ds.order_id = o.id
      ORDER BY ps.score DESC, o.delivery_date ASC
    `;

    // Filter if needed (handled in DB would be better for scale, but done here for MVP flexibility)
    let priorities: PriorityItem[] = rows as PriorityItem[];
    if (severityFilter) {
      priorities = priorities.filter((p) => p.severity === severityFilter);
    }

    // Calculate Summary
    const summary = {
      critical: rows.filter((r) => r.severity === "critical").length,
      high: rows.filter((r) => r.severity === "high").length,
      medium: rows.filter((r) => r.severity === "medium").length,
      low: rows.filter((r) => r.severity === "low").length,
    };

    const responseData: CommandCenterResponse = {
      priorities,
      summary,
      meta: {
        cached: false,
        computedAt: new Date().toISOString(),
      },
    };

    // 3. Store in Redis asynchronously
    // Background cache write (non-blocking)
    if (redis) {
      redis.set(cacheKey, JSON.stringify(responseData), { ex: CACHE_TTL }).catch(console.error);
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Command Center API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
