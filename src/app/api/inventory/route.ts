import { NextResponse } from "next/server";

import { ensureInventoryTables } from "@/lib/cta-schema";
import { sql } from "@/lib/db";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ success: false, error: "Service misconfigured" }, { status: 503 });
  }

  try {
    await ensureInventoryTables();

    const rows = await sql`
      SELECT
        id,
        item_type AS "itemType",
        category,
        sub_category AS "subCategory",
        item_name AS "itemName",
        width,
        storage_method AS "storageMethod",
        supplier,
        stock_qty AS "stockQty",
        reserved_qty AS "reservedQty",
        unit,
        reorder_level AS "reorderLevel",
        status
      FROM public.inventory_items
      ORDER BY item_type DESC, category ASC, sub_category ASC, item_name ASC
    `;

    const summaryRows = await sql`
      SELECT
        COUNT(*)::int AS "itemCount",
        COALESCE(SUM(stock_qty), 0)::float AS "stockQty",
        COALESCE(SUM(reserved_qty), 0)::float AS "reservedQty",
        COUNT(*) FILTER (WHERE status = 'LOW')::int AS "lowCount",
        COUNT(*) FILTER (WHERE status = 'WATCH')::int AS "watchCount"
      FROM public.inventory_items
    `;

    return NextResponse.json({ success: true, data: rows, summary: summaryRows[0] });
  } catch (error) {
    console.error("[inventory:get] failed:", (error as Error).message);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
