import { NextResponse } from "next/server";

import { sql } from "@/lib/db";
import { CACHE_KEYS, CACHE_TTL, redis } from "@/lib/redis";
import type { Order } from "@/types/erp";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const buyerFilter = url.searchParams.get("buyer");
    const statusFilter = url.searchParams.get("status");

    // Build a deterministic cache key based on the filters
    const cacheKey = buyerFilter || statusFilter
      ? CACHE_KEYS.ORDERS_FILTERED({ buyer: buyerFilter ?? undefined, status: statusFilter ?? undefined })
      : CACHE_KEYS.ORDERS_LIST;

    // 1. Cache-aside: try Redis first
    const cached = await redis.get<{ orders: Order[]; count: number; cached: boolean }>(cacheKey);
    if (cached) {
      return NextResponse.json({ ...cached, cached: true });
    }

    // 2. Cache miss — query Neon
    let rows: Awaited<ReturnType<typeof sql>>;

    if (!buyerFilter && !statusFilter) {
      rows = await sql`SELECT * FROM public.orders ORDER BY created_at DESC`;
    } else if (buyerFilter && statusFilter) {
      rows = await sql`SELECT * FROM public.orders WHERE buyer = ${buyerFilter} AND pfh_status = ${statusFilter} ORDER BY created_at DESC`;
    } else if (buyerFilter) {
      rows = await sql`SELECT * FROM public.orders WHERE buyer = ${buyerFilter} ORDER BY created_at DESC`;
    } else {
      rows = await sql`SELECT * FROM public.orders WHERE pfh_status = ${statusFilter} ORDER BY created_at DESC`;
    }

    const payload = { orders: rows as Order[], count: rows.length, cached: false };

    // 3. Populate cache asynchronously (non-blocking)
    redis.set(cacheKey, JSON.stringify(payload), { ex: CACHE_TTL }).catch(console.error);

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Orders API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { refNo, buyer, brand, styleNo, styleName, orderQty, deliveryDate, targetPfhDate, imageUrl } = body;

    // Validate required fields
    if (!refNo || !buyer || !styleNo || !orderQty) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const dDate = deliveryDate ? new Date(deliveryDate) : null;
    const pfhDate = targetPfhDate ? new Date(targetPfhDate) : null;

    const res = await sql`
      INSERT INTO public.orders (
        ref_no, buyer, brand, style_id, style_name, order_qty, delivery_date, target_pfh_date, image_url
      ) VALUES (
        ${refNo}, 
        ${buyer}, 
        ${brand}, 
        ${styleNo}, 
        ${styleName}, 
        ${Number(orderQty)}, 
        ${dDate}, 
        ${pfhDate},
        ${imageUrl || null}
      )
      RETURNING id, ref_no
    `;

    if (res.length > 0) {
      const orderId = res[0].id;

      // Initialize tracking tables for this new order
      // (These tables may not exist in all environments — safe to skip if they don't)
      try {
        await sql`
          INSERT INTO public.fabric_tracking (order_id, status_red, status_orange, status_green)
          VALUES (${orderId}, 0, 0, 0)
        `;
        await sql`
          INSERT INTO public.trims_tracking (order_id, status_red, status_orange, status_green)
          VALUES (${orderId}, 0, 0, 0)
        `;
      } catch (_trackingError) {
        // Tracking tables are optional — don't fail the whole request
      }

      // Invalidate orders list cache so the next GET fetches fresh data
      redis.del(CACHE_KEYS.ORDERS_LIST).catch(console.error);
    }

    return NextResponse.json({ success: true, order: res[0] });
  } catch (error) {
    console.error("Create Order Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
