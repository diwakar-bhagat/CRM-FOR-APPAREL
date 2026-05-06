import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { ensureOrderProcessTable } from "@/lib/cta-schema";
import fs from "fs";
import path from "path";

export async function POST() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ success: false, error: "Service misconfigured" }, { status: 503 });
  }

  try {
    const filePath = path.join(process.cwd(), "legacy_data.json");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, error: "legacy_data.json not found" }, { status: 404 });
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    await ensureOrderProcessTable();
    
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

      const res = await sql`
        INSERT INTO public.orders (
          ref_no, buyer, brand, style_id, style_name, order_qty, delivery_date
        ) VALUES (
          ${order.refNo}, 
          ${order.buyer}, 
          ${order.brand}, 
          ${order.styleNo}, 
          ${order.styleName}, 
          ${order.orderQty}, 
          ${deliveryDate}
        )
        RETURNING id
      `;

      if (res.length > 0) {
        const orderId = res[0].id;
        
        await sql`
          INSERT INTO public.order_processes (order_id)
          VALUES (${orderId})
          ON CONFLICT (order_id) DO NOTHING
        `;
      }
    }

    return NextResponse.json({ success: true, data: { count: data.length } });
  } catch (error) {
    console.error("[seed-legacy:post] failed:", (error as Error).message);
    return NextResponse.json({ success: false, error: "Seed failed" }, { status: 500 });
  }
}
