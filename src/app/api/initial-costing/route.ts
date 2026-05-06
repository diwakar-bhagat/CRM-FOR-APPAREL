import { NextResponse } from "next/server";
import { z } from "zod";

import { ensureInitialCostingTable } from "@/lib/cta-schema";
import { sql } from "@/lib/db";

const costingSchema = z.object({
  buyer: z.string().min(1),
  styleNo: z.string().min(1),
  styleName: z.string().optional().nullable(),
  orderQty: z.coerce.number().nonnegative().default(0),
  fabricCost: z.coerce.number().nonnegative().default(0),
  trimCost: z.coerce.number().nonnegative().default(0),
  processCost: z.coerce.number().nonnegative().default(0),
  embroideryCost: z.coerce.number().nonnegative().default(0),
  washingCost: z.coerce.number().nonnegative().default(0),
  overhead: z.coerce.number().nonnegative().default(0),
  margin: z.coerce.number().min(0).max(100).default(20),
  status: z.enum(["DRAFT", "PENDING", "APPROVED", "REJECTED"]).default("DRAFT"),
});

export async function GET() {
  try {
    await ensureInitialCostingTable();
    const rows = await sql`
      SELECT
        id,
        buyer,
        style_no AS "styleNo",
        style_name AS "styleName",
        order_qty AS "orderQty",
        fabric_cost AS "fabricCost",
        trim_cost AS "trimCost",
        process_cost AS "processCost",
        embroidery_cost AS "embroideryCost",
        washing_cost AS "washingCost",
        overhead,
        margin,
        final_fob AS "finalFob",
        status,
        created_at AS "createdAt"
      FROM public.initial_costings
      ORDER BY created_at DESC
      LIMIT 100
    `;
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error("[initial-costing:get] failed:", (error as Error).message);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureInitialCostingTable();
    const body = await request.json();
    const parsed = costingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const base =
      data.fabricCost + data.trimCost + data.processCost + data.embroideryCost + data.washingCost + data.overhead;
    const finalFob = base * (1 + data.margin / 100);

    const rows = await sql`
      INSERT INTO public.initial_costings (
        buyer, style_no, style_name, order_qty, fabric_cost, trim_cost, process_cost,
        embroidery_cost, washing_cost, overhead, margin, final_fob, status
      ) VALUES (
        ${data.buyer}, ${data.styleNo}, ${data.styleName ?? null}, ${data.orderQty}, ${data.fabricCost},
        ${data.trimCost}, ${data.processCost}, ${data.embroideryCost}, ${data.washingCost},
        ${data.overhead}, ${data.margin}, ${finalFob}, ${data.status}
      )
      RETURNING id, style_no AS "styleNo", final_fob AS "finalFob", status
    `;
    return NextResponse.json({ success: true, data: rows[0] }, { status: 201 });
  } catch (error) {
    console.error("[initial-costing:post] failed:", (error as Error).message);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
