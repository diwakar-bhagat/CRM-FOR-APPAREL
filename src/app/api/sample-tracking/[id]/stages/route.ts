import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { ensureSampleTrackingTables } from "@/lib/cta-schema";
import { sql } from "@/lib/db";
import { invalidateKeys } from "@/lib/redis";

const stageUpdateSchema = z.object({
  stageId: z.string().min(1),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "ON_HOLD"]),
  remarks: z.string().optional().nullable(),
  assignedTo: z.string().optional().nullable(),
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ensureSampleTrackingTables();
    const { id } = await params;
    const body = (await req.json()) as unknown;
    const parsed = stageUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const rows = await sql`
      UPDATE public.sample_stages
      SET
        status = ${data.status},
        remarks = COALESCE(${data.remarks ?? null}, remarks),
        assigned_to = COALESCE(${data.assignedTo ?? null}, assigned_to),
        started_at = CASE WHEN ${data.status} = 'IN_PROGRESS' THEN COALESCE(started_at, NOW()) ELSE started_at END,
        completed_at = CASE WHEN ${data.status} = 'COMPLETED' THEN NOW() ELSE completed_at END,
        updated_at = NOW()
      WHERE id = ${data.stageId}
        AND sample_request_id::text = ${id}
      RETURNING
        id,
        stage,
        status,
        started_at AS "startedAt",
        completed_at AS "completedAt",
        assigned_to AS "assignedTo",
        remarks
    `;

    if (!rows[0]) {
      return NextResponse.json({ error: "Stage not found" }, { status: 404 });
    }

    await invalidateKeys(`sample:${id}`);
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("[sample-tracking:stages:patch] failed:", (error as Error).message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
