import { notFound, serverError } from '@/lib/api-response';
import { sql } from "@/lib/db";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const rows = await sql`
      SELECT
        o.id,
        o.ref_no,
        o.ref_no AS "refNo",
        o.buyer,
        o.brand,
        o.style_id,
        o.style_id AS "styleId",
        o.style_name,
        o.style_name AS "styleName",
        o.order_qty,
        o.order_qty AS "orderQty",
        o.delivery_date,
        o.delivery_date AS "deliveryDate",
        o.pfh_status,
        o.pfh_status AS "pfhStatus",
        o.sop_status,
        o.sop_status AS "sopStatus",
        o.ppm_status,
        o.ppm_status AS "ppmStatus",
        o.approval_pending,
        o.approval_pending AS "approvalPending",
        o.vendor_last_active,
        o.vendor_last_active AS "vendorLastActive",
        o.created_at,
        o.created_at AS "createdAt",
        o.updated_at,
        o.updated_at AS "updatedAt"
      FROM public.orders o
      WHERE o.id::text = ${id} OR o.ref_no = ${id}
      LIMIT 1
    `;
    const order = rows[0];

    if (!order) {
      return notFound("Order not found");
    }

    return Response.json({ order, data: order });
  } catch (error) {
    return serverError(error);
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json() as any;
    const rows = await sql`
      UPDATE public.orders
      SET
        ref_no = COALESCE(${data.refNo ?? data.ref_no ?? null}, ref_no),
        buyer = COALESCE(${data.buyer ?? null}, buyer),
        brand = COALESCE(${data.brand ?? null}, brand),
        style_id = COALESCE(${data.styleId ?? data.styleNo ?? data.style_id ?? null}, style_id),
        style_name = COALESCE(${data.styleName ?? data.style_name ?? null}, style_name),
        order_qty = COALESCE(${data.orderQty ?? data.order_qty ?? null}, order_qty),
        delivery_date = COALESCE(${data.deliveryDate ? new Date(data.deliveryDate) : null}, delivery_date),
        pfh_status = COALESCE(${data.pfhStatus ?? data.pfh_status ?? null}, pfh_status),
        sop_status = COALESCE(${data.sopStatus ?? data.sop_status ?? null}, sop_status),
        ppm_status = COALESCE(${data.ppmStatus ?? data.ppm_status ?? null}, ppm_status),
        approval_pending = COALESCE(${data.approvalPending ?? data.approval_pending ?? null}, approval_pending),
        vendor_last_active = COALESCE(${data.vendorLastActive ? new Date(data.vendorLastActive) : null}, vendor_last_active),
        updated_at = NOW()
      WHERE id::text = ${id} OR ref_no = ${id}
      RETURNING
        id,
        ref_no,
        ref_no AS "refNo",
        buyer,
        brand,
        style_id,
        style_id AS "styleId",
        style_name,
        style_name AS "styleName",
        order_qty,
        order_qty AS "orderQty",
        delivery_date,
        delivery_date AS "deliveryDate"
    `;
    const order = rows[0];

    return Response.json({ order, data: order });
  } catch (error) {
    return serverError(error);
  }
}
