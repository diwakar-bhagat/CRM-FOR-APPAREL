import { NextResponse } from "next/server";
import { z } from "zod";

import { sql } from "@/lib/db";

const patchSchema = z
  .object({
    id: z.string().min(1),
    orderQty: z.number().optional(),
    totalReqdQty: z.number().optional(),
    statusRed: z.number().int().min(0).optional(),
    statusOrange: z.number().int().min(0).optional(),
    statusGreen: z.number().int().min(0).optional(),
  })
  .strict();

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ success: false, error: "Service misconfigured" }, { status: 503 });
  }

  try {
    const rows = await sql`
      SELECT 
        o.id,
        o.ref_no as "refNo",
        o.delivery_date as "deliveryDate",
        o.buyer,
        o.style_id as "styleId",
        o.style_name as "styleName",
        o.order_qty as "orderQty",
        o.order_qty as "totalReqdQty",
        NULL::timestamptz as "targetPfhDate",
        0 as "statusRed",
        0 as "statusOrange",
        1 as "statusGreen"
      FROM public.orders o
      ORDER BY o.delivery_date ASC
    `;

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error("[merchant:fabric:get] failed:", (error as Error).message);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ success: false, error: "Service misconfigured" }, { status: 503 });
  }

  try {
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
    }
    const parsed = patchSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Validation failed" }, { status: 400 });
    }
    const body = parsed.data;
    const { id, orderQty, totalReqdQty, statusRed, statusOrange, statusGreen } = body;

    if (orderQty !== undefined || totalReqdQty !== undefined) {
      await sql`
        UPDATE public.orders 
        SET 
          order_qty = COALESCE(${orderQty ?? totalReqdQty ?? null}, order_qty)
        WHERE id = ${id}
      `;
    }

    return NextResponse.json({ success: true, data: { updated: true } });
  } catch (error) {
    console.error("[merchant:fabric:patch] failed:", (error as Error).message);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
