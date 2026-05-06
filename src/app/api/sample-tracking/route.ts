import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { ensureSampleTrackingTables } from "@/lib/cta-schema";
import { sql } from "@/lib/db";
import { invalidateByPrefix } from "@/lib/redis";

const createSampleSchema = z.object({
  orderId: z.string().optional().nullable(),
  deptFrom: z.string().min(1),
  itemType: z.enum(["FABRIC", "TRIM", "ACCESSORY"]).default("FABRIC"),
  buyer: z.string().optional().nullable(),
  season: z.string().optional().nullable(),
  merchant: z.string().optional().nullable(),
  preparedBy: z.string().optional().nullable(),
});

const STAGES = ["CUTTING", "SWING_LINE", "FINISHING", "PACKED_FOR_SHIPMENT"] as const;

export async function GET(req: NextRequest) {
  try {
    await ensureSampleTrackingTables();
    const { searchParams } = new URL(req.url);
    const buyer = searchParams.get("buyer");

    const samples = await sql`
      SELECT
        sr.id,
        sr.our_ref AS "ourRef",
        sr.merchant,
        sr.prepared_by AS "preparedBy",
        sr.dept_from AS "deptFrom",
        sr.item_type AS "itemType",
        sr.buyer,
        sr.season,
        sr.created_at AS "createdAt",
        COALESCE(st.items, '[]'::json) AS stages
      FROM public.sample_requests sr
      LEFT JOIN LATERAL (
        SELECT json_agg(json_build_object(
          'id', id,
          'stage', stage,
          'status', status,
          'startedAt', started_at,
          'completedAt', completed_at,
          'assignedTo', assigned_to,
          'remarks', remarks
        ) ORDER BY array_position(ARRAY['CUTTING','SWING_LINE','FINISHING','PACKED_FOR_SHIPMENT'], stage)) AS items
        FROM public.sample_stages
        WHERE sample_request_id = sr.id
      ) st ON true
      WHERE (${buyer}::text IS NULL OR sr.buyer = ${buyer})
      ORDER BY sr.created_at DESC
    `;

    return NextResponse.json({ samples, data: samples });
  } catch (error) {
    console.error("[sample-tracking:get] failed:", (error as Error).message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureSampleTrackingTables();
    const body = (await req.json()) as unknown;
    const parsed = createSampleSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const ourRef = `CTA/${String(Date.now()).slice(-6)}`;
    const rows = await sql`
      INSERT INTO public.sample_requests (
        our_ref, order_id, merchant, prepared_by, dept_from, item_type, buyer, season
      ) VALUES (
        ${ourRef}, ${data.orderId ?? null}, ${data.merchant ?? null}, ${data.preparedBy ?? null},
        ${data.deptFrom}, ${data.itemType}, ${data.buyer ?? null}, ${data.season ?? null}
      )
      RETURNING id, our_ref AS "ourRef", merchant, buyer, dept_from AS "deptFrom", created_at AS "createdAt"
    `;
    const sample = rows[0];

    for (const stage of STAGES) {
      await sql`
        INSERT INTO public.sample_stages (sample_request_id, stage, status)
        VALUES (${sample.id}, ${stage}, 'PENDING')
        ON CONFLICT (sample_request_id, stage) DO NOTHING
      `;
    }

    await invalidateByPrefix("samples:list:");
    return NextResponse.json(sample, { status: 201 });
  } catch (error) {
    console.error("[sample-tracking:post] failed:", (error as Error).message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
