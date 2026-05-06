import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { ensureDesignVaultTable } from "@/lib/cta-schema";
import { sql } from "@/lib/db";
import { invalidateByPrefix, invalidateKeys } from "@/lib/redis";

const updateDesignSchema = z.object({
  styleNo: z.string().min(1).optional(),
  styleName: z.string().optional().nullable(),
  buyer: z.string().min(1).optional(),
  brand: z.string().min(1).optional(),
  designer: z.string().min(1).optional(),
  season: z.string().min(1).optional(),
  status: z.enum(["DESIGNING", "PRODUCTION", "ARCHIVED"]).optional(),
  imageUrl: z.string().url().optional().nullable(),
  additionalImages: z.array(z.string().url()).optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ensureDesignVaultTable();
    const { id } = await params;
    const body = (await req.json()) as unknown;
    const parsed = updateDesignSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const rows = await sql`
      UPDATE public.design_vault_items
      SET
        style_no = COALESCE(${data.styleNo ?? null}, style_no),
        style_name = COALESCE(${data.styleName ?? null}, style_name),
        buyer = COALESCE(${data.buyer ?? null}, buyer),
        brand = COALESCE(${data.brand ?? null}, brand),
        designer = COALESCE(${data.designer ?? null}, designer),
        season = COALESCE(${data.season ?? null}, season),
        status = COALESCE(${data.status ?? null}, status),
        image_url = COALESCE(${data.imageUrl ?? null}, image_url),
        additional_images = COALESCE(${data.additionalImages ?? null}, additional_images),
        updated_at = NOW()
      WHERE id::text = ${id}
      RETURNING *
    `;

    if (!rows[0]) {
      return NextResponse.json({ error: "Design item not found" }, { status: 404 });
    }

    await invalidateKeys(`design-vault:item:${id}`);
    await invalidateByPrefix("design-vault:list:");
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("[design-vault:patch] failed:", (error as Error).message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ensureDesignVaultTable();
    const { id } = await params;
    await sql`DELETE FROM public.design_vault_items WHERE id::text = ${id}`;
    await invalidateKeys(`design-vault:item:${id}`);
    await invalidateByPrefix("design-vault:list:");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[design-vault:delete] failed:", (error as Error).message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
