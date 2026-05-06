import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { ensureDispatchChallanTables } from "@/lib/cta-schema";
import { sql } from "@/lib/db";
import { invalidateByPrefix, invalidateKeys } from "@/lib/redis";

const patchDispatchSchema = z.object({
  dispatchDate: z.coerce.date().optional(),
  fromLocation: z.string().optional(),
  toLocation: z.string().optional(),
  preparedBy: z.string().optional().nullable(),
  status: z.enum(["DRAFT", "SENT", "DELIVERED"]).optional(),
});

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ensureDispatchChallanTables();
    const { id } = await params;
    const rows = await sql`
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
      WHERE dc.id::text = ${id} OR dc.challan_no = ${id}
      GROUP BY dc.id, o.ref_no
      LIMIT 1
    `;
    const challan = rows[0];
    if (!challan) {
      return NextResponse.json({ error: "Dispatch challan not found" }, { status: 404 });
    }
    return NextResponse.json({ challan, data: challan });
  } catch (error) {
    console.error("[dispatch-challan:get-one] failed:", (error as Error).message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ensureDispatchChallanTables();
    const { id } = await params;
    const body = (await req.json()) as unknown;
    const parsed = patchDispatchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const rows = await sql`
      UPDATE public.dispatch_challans
      SET
        dispatch_date = COALESCE(${data.dispatchDate ?? null}, dispatch_date),
        from_location = COALESCE(${data.fromLocation ?? null}, from_location),
        to_location = COALESCE(${data.toLocation ?? null}, to_location),
        prepared_by = COALESCE(${data.preparedBy ?? null}, prepared_by),
        status = COALESCE(${data.status ?? null}, status),
        updated_at = NOW()
      WHERE id::text = ${id} OR challan_no = ${id}
      RETURNING id, challan_no AS "challanNo", dispatch_date AS "dispatchDate", status
    `;
    const challan = rows[0];
    if (!challan) {
      return NextResponse.json({ error: "Dispatch challan not found" }, { status: 404 });
    }

    await invalidateKeys(`dispatch-challan:${challan.id}`);
    await invalidateByPrefix("dispatch-challan:");
    return NextResponse.json({ challan, data: challan });
  } catch (error) {
    console.error("[dispatch-challan:patch] failed:", (error as Error).message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ensureDispatchChallanTables();
    const { id } = await params;
    const rows = await sql`
      DELETE FROM public.dispatch_challans
      WHERE id::text = ${id} OR challan_no = ${id}
      RETURNING id
    `;
    if (!rows[0]) {
      return NextResponse.json({ error: "Dispatch challan not found" }, { status: 404 });
    }

    await invalidateByPrefix("dispatch-challan:");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[dispatch-challan:delete] failed:", (error as Error).message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
