import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { z } from "zod";

import { ensureDispatchChallanTables } from "@/lib/cta-schema";
import { sql } from "@/lib/db";
import { invalidateByPrefix } from "@/lib/redis";

const dispatchItemSchema = z.object({
  description: z.string().min(1),
  qty: z.coerce.number().nonnegative().default(0),
  unit: z.string().default("PCS"),
  remark: z.string().optional().nullable(),
});

const dispatchChallanSchema = z.object({
  challanNo: z.string().optional(),
  orderId: z.string().optional().nullable(),
  dispatchDate: z.coerce.date().optional(),
  fromLocation: z.string().min(1),
  toLocation: z.string().min(1),
  preparedBy: z.string().optional().nullable(),
  status: z.enum(["DRAFT", "SENT", "DELIVERED"]).default("DRAFT"),
  items: z.array(dispatchItemSchema).min(1),
});

export async function GET(req: NextRequest) {
  try {
    await ensureDispatchChallanTables();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 50)));
    const skip = (page - 1) * limit;

    const challans = await sql`
      SELECT
        dc.id,
        dc.challan_no AS "challanNo",
        dc.order_id AS "orderId",
        o.ref_no AS "orderNo",
        dc.dispatch_date AS "dispatchDate",
        dc.from_location AS "fromLocation",
        dc.to_location AS "toLocation",
        dc.prepared_by AS "preparedBy",
        dc.status,
        dc.created_at AS "createdAt",
        COALESCE(
          json_agg(
            json_build_object(
              'id', di.id,
              'description', di.description,
              'qty', di.qty,
              'unit', di.unit,
              'remark', di.remark
            )
          ) FILTER (WHERE di.id IS NOT NULL),
          '[]'::json
        ) AS items
      FROM public.dispatch_challans dc
      LEFT JOIN public.dispatch_items di ON di.challan_id = dc.id
      LEFT JOIN public.orders o ON o.id = dc.order_id
      WHERE (${status}::text IS NULL OR dc.status = ${status})
      GROUP BY dc.id, o.ref_no
      ORDER BY dc.created_at DESC
      LIMIT ${limit}
      OFFSET ${skip}
    `;

    const totalRows = await sql`
      SELECT COUNT(*)::int AS count
      FROM public.dispatch_challans
      WHERE (${status}::text IS NULL OR status = ${status})
    `;
    const total = Number(totalRows[0]?.count ?? 0);

    return NextResponse.json({
      challans,
      data: challans,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("[dispatch-challan:get] failed:", (error as Error).message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureDispatchChallanTables();
    const body = (await req.json()) as unknown;
    const parsed = dispatchChallanSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const challanNo = data.challanNo || `DC-${String(Date.now()).slice(-6)}`;
    const rows = await sql`
      INSERT INTO public.dispatch_challans (
        challan_no, order_id, dispatch_date, from_location, to_location, prepared_by, status
      ) VALUES (
        ${challanNo},
        ${data.orderId ?? null},
        ${data.dispatchDate ?? new Date()},
        ${data.fromLocation},
        ${data.toLocation},
        ${data.preparedBy ?? null},
        ${data.status}
      )
      RETURNING id, challan_no AS "challanNo", dispatch_date AS "dispatchDate", status
    `;

    const challan = rows[0];
    for (const item of data.items) {
      await sql`
        INSERT INTO public.dispatch_items (id, challan_id, description, qty, unit, remark)
        VALUES (${randomUUID()}, ${challan.id}, ${item.description}, ${item.qty}, ${item.unit}, ${item.remark ?? null})
      `;
    }

    await invalidateByPrefix("dispatch-challan:");
    return NextResponse.json({ challan, data: challan }, { status: 201 });
  } catch (error) {
    console.error("[dispatch-challan:post] failed:", (error as Error).message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
