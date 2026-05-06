import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { ensureOrderProcessTable } from "@/lib/cta-schema";
import { sql } from "@/lib/db";
import { invalidateByPrefix, invalidateKeys } from "@/lib/redis";

const processUpdateSchema = z.object({
  fabricPending: z.number().int().optional(),
  fabricPr: z.number().int().optional(),
  fabricPo: z.number().int().optional(),
  fabricStock: z.number().int().optional(),
  trimPending: z.number().int().optional(),
  trimPr: z.number().int().optional(),
  trimPo: z.number().int().optional(),
  trimStock: z.number().int().optional(),
  bulkProcess: z.number().int().nullable().optional(),
  fob: z.number().int().nullable().optional(),
  bulkEmb: z.number().int().nullable().optional(),
  rdGradedPattern: z.boolean().optional(),
  pfh: z.number().int().nullable().optional(),
  rd: z.number().int().nullable().optional(),
  sop: z.number().int().nullable().optional(),
  ppm: z.number().int().nullable().optional(),
  vgLinked: z.boolean().optional(),
  raApproved: z.boolean().optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ensureOrderProcessTable();
    const { id } = await params;
    const body = (await req.json()) as unknown;
    const parsed = processUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const orderRows = await sql`SELECT id FROM public.orders WHERE id::text = ${id} OR ref_no = ${id} LIMIT 1`;
    const orderId = orderRows[0]?.id as string | undefined;
    if (!orderId) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    await sql`
      INSERT INTO public.order_processes (order_id)
      VALUES (${orderId})
      ON CONFLICT (order_id) DO NOTHING
    `;

    const data = parsed.data;
    const rows = await sql`
      UPDATE public.order_processes
      SET
        fabric_pending = COALESCE(${data.fabricPending ?? null}, fabric_pending),
        fabric_pr = COALESCE(${data.fabricPr ?? null}, fabric_pr),
        fabric_po = COALESCE(${data.fabricPo ?? null}, fabric_po),
        fabric_stock = COALESCE(${data.fabricStock ?? null}, fabric_stock),
        fabric_total = COALESCE(${sumDefined(data.fabricPending, data.fabricPr, data.fabricPo, data.fabricStock)}, fabric_total),
        trim_pending = COALESCE(${data.trimPending ?? null}, trim_pending),
        trim_pr = COALESCE(${data.trimPr ?? null}, trim_pr),
        trim_po = COALESCE(${data.trimPo ?? null}, trim_po),
        trim_stock = COALESCE(${data.trimStock ?? null}, trim_stock),
        trim_total = COALESCE(${sumDefined(data.trimPending, data.trimPr, data.trimPo, data.trimStock)}, trim_total),
        bulk_process = COALESCE(${data.bulkProcess ?? null}, bulk_process),
        fob = COALESCE(${data.fob ?? null}, fob),
        bulk_emb = COALESCE(${data.bulkEmb ?? null}, bulk_emb),
        rd_graded_pattern = COALESCE(${data.rdGradedPattern ?? null}, rd_graded_pattern),
        pfh = COALESCE(${data.pfh ?? null}, pfh),
        rd = COALESCE(${data.rd ?? null}, rd),
        sop = COALESCE(${data.sop ?? null}, sop),
        ppm = COALESCE(${data.ppm ?? null}, ppm),
        vg_linked = COALESCE(${data.vgLinked ?? null}, vg_linked),
        ra_approved = COALESCE(${data.raApproved ?? null}, ra_approved),
        updated_at = NOW()
      WHERE order_id = ${orderId}
      RETURNING *
    `;

    await invalidateKeys(`order:${orderId}`);
    await invalidateByPrefix("orders:list:");
    await invalidateByPrefix("dashboard:");

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("[orders:processes:patch] failed:", (error as Error).message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function sumDefined(...values: Array<number | undefined>) {
  return values.some((value) => value !== undefined)
    ? values.reduce<number>((sum, value) => sum + (value ?? 0), 0)
    : null;
}
