import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const res = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'orders'
    `;
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
