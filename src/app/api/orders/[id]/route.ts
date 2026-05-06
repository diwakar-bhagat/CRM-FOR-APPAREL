import { ok, notFound, serverError, validationError } from '@/lib/api-response';
import { updateOrderSchema } from "@/lib/erp-api";
import { sql } from "@/lib/db";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const rows = await sql`
      SELECT
        o.id,
        o."orderNo",
        o."styleDescription",
        o.qty,
        o.month,
        o."planStatus",
        o.remarks,
        json_build_object('id', b.id, 'name', b.name) AS buyer,
        json_build_object('id', u.id, 'name', u.name) AS unit,
        COALESCE(pe.items, '[]'::json) AS "productionEntries",
        COALESCE(wo.items, '[]'::json) AS "weeklyOutputs",
        COALESCE(rf.items, '[]'::json) AS "riskFlags",
        COALESCE(te.items, '[]'::json) AS "trimStatus"
      FROM public."Order" o
      JOIN public."Buyer" b ON b.id = o."buyerId"
      JOIN public."Unit" u ON u.id = o."unitId"
      LEFT JOIN LATERAL (
        SELECT json_agg(json_build_object(
          'id', id,
          'entryDate', "entryDate",
          'balanceStitchQty', "balanceStitchQty",
          'balanceFinishQty', "balanceFinishQty",
          'balanceCuttingQty', "balanceCuttingQty",
          'balanceSpecialWork', "balanceSpecialWork"
        ) ORDER BY "entryDate" DESC) AS items
        FROM public."ProductionEntry"
        WHERE "orderId" = o.id
      ) pe ON true
      LEFT JOIN LATERAL (
        SELECT json_agg(json_build_object(
          'id', id,
          'weekNo', "weekNo",
          'weekStart', "weekStart",
          'qty', qty
        ) ORDER BY "weekNo" ASC) AS items
        FROM public."WeeklyOutput"
        WHERE "orderId" = o.id
      ) wo ON true
      LEFT JOIN LATERAL (
        SELECT json_agg(json_build_object(
          'id', id,
          'riskType', "riskType",
          'severity', severity,
          'detail', detail,
          'resolved', resolved
        ) ORDER BY "createdAt" DESC) AS items
        FROM public."RiskFlag"
        WHERE "orderId" = o.id
      ) rf ON true
      LEFT JOIN LATERAL (
        SELECT json_agg(json_build_object(
          'id', id,
          'trimStatus', "trimStatus",
          'remarks', remarks,
          'updatedAt', "updatedAt"
        ) ORDER BY "updatedAt" DESC) AS items
        FROM public."TrimEntry"
        WHERE "orderId" = o.id
      ) te ON true
      WHERE o.id = ${id}
      LIMIT 1
    `;
    const order = rows[0];

    if (!order) {
      return notFound("Order not found");
    }

    return ok(order);
  } catch (error) {
    return serverError(error);
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json() as unknown;
    const parsed = updateOrderSchema.safeParse(body);
    
    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const data = parsed.data;
    const rows = await sql`
      UPDATE public."Order"
      SET
        "orderNo" = COALESCE(${data.orderNo ?? null}, "orderNo"),
        "styleDescription" = COALESCE(${data.styleDescription ?? null}, "styleDescription"),
        qty = COALESCE(${data.qty ?? null}, qty),
        "buyerId" = COALESCE(${data.buyerId ?? null}, "buyerId"),
        "unitId" = COALESCE(${data.unitId ?? null}, "unitId"),
        month = COALESCE(${data.month ?? null}, month),
        "specialWork" = COALESCE(${data.specialWork ?? null}, "specialWork"),
        sam = COALESCE(${data.sam ?? null}, sam),
        "totalQty" = COALESCE(${data.totalQty ?? null}, "totalQty"),
        "fabricSupplier" = COALESCE(${data.fabricSupplier ?? null}, "fabricSupplier"),
        "fabricInhDate" = COALESCE(${data.fabricInhDate ?? null}, "fabricInhDate"),
        "exFactoryDate" = COALESCE(${data.exFactoryDate ?? null}, "exFactoryDate"),
        "revisedExFactory" = COALESCE(${data.revisedExFactory ?? null}, "revisedExFactory"),
        "pcdPlan" = COALESCE(${data.pcdPlan ?? null}, "pcdPlan"),
        "fileHoDate" = COALESCE(${data.fileHoDate ?? null}, "fileHoDate"),
        "rdDate" = COALESCE(${data.rdDate ?? null}, "rdDate"),
        "ppComments" = COALESCE(${data.ppComments ?? null}, "ppComments"),
        remarks = COALESCE(${data.remarks ?? null}, remarks),
        "planStatus" = COALESCE(${data.planStatus ?? null}, "planStatus"),
        fob = COALESCE(${data.fob ?? null}, fob),
        "totalCost" = COALESCE(${data.totalCost ?? null}, "totalCost"),
        "producedSam" = COALESCE(${data.producedSam ?? null}, "producedSam"),
        "prodLeadTime" = COALESCE(${data.prodLeadTime ?? null}, "prodLeadTime"),
        "updatedAt" = NOW()
      WHERE id = ${id}
      RETURNING id, "orderNo", "styleDescription", qty, month, "planStatus"
    `;
    const order = rows[0];

    return ok(order);
  } catch (error) {
    return serverError(error);
  }
}
