import { NextResponse } from "next/server";

import { ensurePriorityTables } from "@/lib/cta-schema";
import { sql } from "@/lib/db";
import { computeDerivedSignals, computePriorityScore } from "@/lib/priority-engine";
import { CACHE_KEYS, redis } from "@/lib/redis";
import type { Order } from "@/types/erp";

const SYNC_SECRET = process.env.ERP_SYNC_SECRET;
const SYNC_RATE_LIMIT_WINDOW_SECONDS = 60;
const SYNC_RATE_LIMIT_MAX_REQUESTS = 10;

function getRequesterId(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const [firstIp] = forwarded.split(",");
    if (firstIp?.trim()) return firstIp.trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  try {
    await ensurePriorityTables();

    const requesterId = getRequesterId(request);
    const windowBucket = Math.floor(Date.now() / 1000 / SYNC_RATE_LIMIT_WINDOW_SECONDS);
    const rateLimitKey = `rate_limit:erp_sync:{${requesterId}}:${windowBucket}`;

    const requestCount = redis ? await redis.incr(rateLimitKey) : 0;
    if (redis && requestCount === 1) {
      await redis.expire(rateLimitKey, SYNC_RATE_LIMIT_WINDOW_SECONDS);
    }

    if (requestCount > SYNC_RATE_LIMIT_MAX_REQUESTS) {
      return NextResponse.json(
        { error: "Too Many Requests" },
        {
          status: 429,
          headers: {
            "Retry-After": SYNC_RATE_LIMIT_WINDOW_SECONDS.toString(),
            "X-RateLimit-Limit": SYNC_RATE_LIMIT_MAX_REQUESTS.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": (windowBucket + 1).toString(),
          },
        },
      );
    }

    const rateLimitHeaders = {
      "X-RateLimit-Limit": SYNC_RATE_LIMIT_MAX_REQUESTS.toString(),
      "X-RateLimit-Remaining": Math.max(0, SYNC_RATE_LIMIT_MAX_REQUESTS - Number(requestCount)).toString(),
      "X-RateLimit-Reset": (windowBucket + 1).toString(),
    };

    // 1. Authenticate Machine-to-Machine call
    const authHeader = request.headers.get("x-sync-secret");
    if (SYNC_SECRET && authHeader !== SYNC_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: rateLimitHeaders });
    }

    // 2. Fetch "Raw" Orders from DB (simulating an ERP fetch)
    // In reality, you'd fetch from process.env.ERP_API_BASE_URL here
    const rawOrders = await sql`
      SELECT 
        id, ref_no as "refNo", buyer, brand, style_id as "styleId", style_name as "styleName",
        order_qty as "orderQty", delivery_date as "deliveryDate", pfh_status as "pfhStatus",
        sop_status as "sopStatus", ppm_status as "ppmStatus", approval_pending as "approvalPending",
        vendor_last_active as "vendorLastActive", created_at as "createdAt", updated_at as "updatedAt"
      FROM public.orders
    `;

    let processedCount = 0;

    // 3. Process each order through the Priority Engine
    for (const row of rawOrders) {
      const order = row as Order;

      // Step A: Derive signals
      const signals = computeDerivedSignals(order);

      // Step B: Compute strict priority score
      const scoreData = computePriorityScore(order, signals);

      // Step C: Upsert into Postgres
      // Upsert derived_signals
      await sql`
        INSERT INTO public.derived_signals (
          order_id, is_delayed, delay_days, is_blocked, blocked_reason, 
          inactivity_hours, cascade_risk, cascade_reason, deadline_proximity, computed_at
        ) VALUES (
          ${signals.orderId}, ${signals.isDelayed}, ${signals.delayDays}, ${signals.isBlocked}, ${signals.blockedReason},
          ${signals.inactivityHours}, ${signals.cascadeRisk}, ${signals.cascadeReason}, ${signals.deadlineProximity}, NOW()
        )
        ON CONFLICT (order_id) DO UPDATE SET
          is_delayed = EXCLUDED.is_delayed,
          delay_days = EXCLUDED.delay_days,
          is_blocked = EXCLUDED.is_blocked,
          blocked_reason = EXCLUDED.blocked_reason,
          inactivity_hours = EXCLUDED.inactivity_hours,
          cascade_risk = EXCLUDED.cascade_risk,
          cascade_reason = EXCLUDED.cascade_reason,
          deadline_proximity = EXCLUDED.deadline_proximity,
          computed_at = NOW()
      `;

      // Upsert priority_scores
      await sql`
        INSERT INTO public.priority_scores (
          order_id, score, severity, reason_codes, recommended_action, updated_at
        ) VALUES (
          ${scoreData.orderId}, ${scoreData.score}, ${scoreData.severity}, 
          ${JSON.stringify(scoreData.reasonCodes)}::jsonb, ${scoreData.recommendedAction}, NOW()
        )
        ON CONFLICT (order_id) DO UPDATE SET
          score = EXCLUDED.score,
          severity = EXCLUDED.severity,
          reason_codes = EXCLUDED.reason_codes,
          recommended_action = EXCLUDED.recommended_action,
          updated_at = NOW()
      `;

      processedCount++;
    }

    // 4. Invalidate and Update Redis Cache
    if (redis) {
      await redis.del(CACHE_KEYS.PRIORITY_LIST);
      await redis.set(CACHE_KEYS.SYNC_LAST_RUN, new Date().toISOString());
    }

    return NextResponse.json(
      {
        success: true,
        message: `Sync completed. Processed ${processedCount} orders.`,
        timestamp: new Date().toISOString(),
      },
      {
        headers: rateLimitHeaders,
      },
    );
  } catch (error) {
    console.error("ERP Sync API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
