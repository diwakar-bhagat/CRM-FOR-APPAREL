import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function POST() {
  try {
    const filePath = path.join(process.cwd(), "legacy_data.json");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "legacy_data.json not found" }, { status: 404 });
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    
    // Wipe existing dummy data
    await sql`DELETE FROM public.fabric_tracking`;
    await sql`DELETE FROM public.trims_tracking`;
    await sql`DELETE FROM public.orders`;

    // We'll insert these into the public.orders table.
    for (const order of data) {
      if (!order.refNo) continue;
      
      let deliveryDate = null;
      if (order.deliveryDate && order.deliveryDate !== '-') {
        deliveryDate = new Date(order.deliveryDate);
        if (Number.isNaN(deliveryDate.getTime())) deliveryDate = null;
      }

      let orderDate = null;
      if (order.orderDate && order.orderDate !== '-') {
        orderDate = new Date(order.orderDate);
        if (Number.isNaN(orderDate.getTime())) orderDate = null;
      }

      let targetPfhDate = null;
      if (order.targetPfhDate && order.targetPfhDate !== '-') {
        targetPfhDate = new Date(order.targetPfhDate);
        if (Number.isNaN(targetPfhDate.getTime())) targetPfhDate = null;
      }

      const res = await sql`
        INSERT INTO public.orders (
          ref_no, buyer, brand, style_id, style_name, order_qty, delivery_date, target_pfh_date
        ) VALUES (
          ${order.refNo}, 
          ${order.buyer}, 
          ${order.brand}, 
          ${order.styleNo}, 
          ${order.styleName}, 
          ${order.orderQty}, 
          ${deliveryDate}, 
          ${targetPfhDate}
        )
        RETURNING id
      `;

      if (res.length > 0) {
        const orderId = res[0].id;
        
        await sql`
          INSERT INTO public.fabric_tracking (order_id, status_red, status_orange, status_green)
          VALUES (${orderId}, 0, 0, 0)
        `;

        await sql`
          INSERT INTO public.trims_tracking (order_id, status_red, status_orange, status_green)
          VALUES (${orderId}, 0, 0, 0)
        `;
      }
    }

    return NextResponse.json({ success: true, count: data.length });
  } catch (error) {
    console.error("Seed Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
