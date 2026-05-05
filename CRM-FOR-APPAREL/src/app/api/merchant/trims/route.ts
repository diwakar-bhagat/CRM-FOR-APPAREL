import { NextResponse } from "next/server";

import { sql } from "@/lib/db";

export async function GET() {
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
        o.total_reqd_qty as "totalReqdQty",
        o.target_pfh_date as "targetPfhDate",
        tt.status_red as "statusRed",
        tt.status_orange as "statusOrange",
        tt.status_green as "statusGreen"
      FROM public.orders o
      LEFT JOIN public.trims_tracking tt ON o.id = tt.order_id
      ORDER BY o.delivery_date ASC
    `;

    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error("Trims GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, orderQty, totalReqdQty, statusRed, statusOrange, statusGreen } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
    }

    if (orderQty !== undefined || totalReqdQty !== undefined) {
      await sql`
        UPDATE public.orders 
        SET 
          order_qty = COALESCE(${orderQty ?? null}, order_qty),
          total_reqd_qty = COALESCE(${totalReqdQty ?? null}, total_reqd_qty)
        WHERE id = ${id}
      `;
    }

    if (statusRed !== undefined || statusOrange !== undefined || statusGreen !== undefined) {
      await sql`
        UPDATE public.trims_tracking
        SET 
          status_red = COALESCE(${statusRed ?? null}, status_red),
          status_orange = COALESCE(${statusOrange ?? null}, status_orange),
          status_green = COALESCE(${statusGreen ?? null}, status_green),
          updated_at = NOW()
        WHERE order_id = ${id}
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Trims PATCH Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
