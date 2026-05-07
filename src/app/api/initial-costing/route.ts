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
  yarnCostPerKg: z.coerce.number().nonnegative().optional(),
  totalWeightKg: z.coerce.number().nonnegative().optional(),
  yarnWastePct: z.coerce.number().min(0).max(20).optional(),
  fabricPricePerMeter: z.coerce.number().nonnegative().optional(),
  fabricQuantity: z.coerce.number().nonnegative().optional(),
  fabricWastagePct: z.coerce.number().min(0).max(20).optional(),
  sizingCost: z.coerce.number().nonnegative().optional(),
  weavingCost: z.coerce.number().nonnegative().optional(),
  inspectionCost: z.coerce.number().nonnegative().optional(),
  dyeingCost: z.coerce.number().nonnegative().optional(),
  printingCost: z.coerce.number().nonnegative().optional(),
  treatmentCost: z.coerce.number().nonnegative().optional(),
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
    const rawMaterialCost =
      (data.yarnCostPerKg ?? 0) * (data.totalWeightKg ?? 0) * (1 + (data.yarnWastePct ?? 0) / 100);
    const formulaFabricCost =
      (data.fabricPricePerMeter ?? 0) * (data.fabricQuantity ?? 0) * (1 + (data.fabricWastagePct ?? 0) / 100);
    const fabricCost = formulaFabricCost > 0 ? formulaFabricCost : rawMaterialCost > 0 ? rawMaterialCost : data.fabricCost;
    const quantity = data.fabricQuantity || data.orderQty || 0;
    const conversionCost =
      quantity * ((data.sizingCost ?? 6) + (data.weavingCost ?? 18) + (data.inspectionCost ?? 2.5));
    const processCost = conversionCost > 0 ? conversionCost : data.processCost;
    const finishingCost = (data.dyeingCost ?? 0) + (data.printingCost ?? 0) + (data.treatmentCost ?? 0);
    const washingCost = finishingCost > 0 ? finishingCost : data.washingCost;
    const base = fabricCost + data.trimCost + processCost + data.embroideryCost + washingCost + data.overhead;
    const finalFob = base * (1 + data.margin / 100);

    const rows = await sql`
      INSERT INTO public.initial_costings (
        buyer, style_no, style_name, order_qty, fabric_cost, trim_cost, process_cost,
        embroidery_cost, washing_cost, overhead, margin, final_fob, status
      ) VALUES (
        ${data.buyer}, ${data.styleNo}, ${data.styleName ?? null}, ${data.orderQty}, ${fabricCost},
        ${data.trimCost}, ${processCost}, ${data.embroideryCost}, ${washingCost},
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
