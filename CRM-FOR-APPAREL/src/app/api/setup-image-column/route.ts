import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST() {
  try {
    await sql`
      ALTER TABLE public.orders 
      ADD COLUMN IF NOT EXISTS image_url TEXT;
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
