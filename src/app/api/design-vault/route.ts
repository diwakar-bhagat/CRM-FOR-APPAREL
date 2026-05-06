import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { ensureDesignVaultTable } from "@/lib/cta-schema";
import { sql } from "@/lib/db";
import { invalidateByPrefix } from "@/lib/redis";

const designSchema = z.object({
  styleNo: z.string().min(1),
  styleName: z.string().optional().nullable(),
  buyer: z.string().min(1),
  brand: z.string().min(1),
  designer: z.string().min(1),
  season: z.string().min(1),
  status: z.enum(["DESIGNING", "PRODUCTION", "ARCHIVED"]).default("DESIGNING"),
  imageUrl: z.string().url().optional().nullable(),
  additionalImages: z.array(z.string().url()).default([]),
  orderId: z.string().optional().nullable(),
  createdBy: z.string().optional().nullable(),
});

export async function GET(req: NextRequest) {
  try {
    await ensureDesignVaultTable();
    const { searchParams } = new URL(req.url);
    const buyer = searchParams.get("buyer");
    const season = searchParams.get("season");
    const status = searchParams.get("status");

    const items = await sql`
      SELECT
        id,
        design_id AS "designId",
        style_no AS "styleNo",
        style_name AS "styleName",
        buyer,
        brand,
        designer,
        season,
        status,
        image_url AS "imageUrl",
        additional_images AS "additionalImages",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM public.design_vault_items
      WHERE (${buyer}::text IS NULL OR buyer = ${buyer})
        AND (${season}::text IS NULL OR season = ${season})
        AND (${status}::text IS NULL OR status = ${status})
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ items, designs: items, data: items });
  } catch (error) {
    console.error("[design-vault:get] failed:", (error as Error).message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureDesignVaultTable();
    const body = (await req.json()) as unknown;
    const parsed = designSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const rows = await sql`
      INSERT INTO public.design_vault_items (
        style_no, style_name, buyer, brand, designer, season, status,
        image_url, additional_images, order_id, created_by
      ) VALUES (
        ${data.styleNo}, ${data.styleName ?? null}, ${data.buyer}, ${data.brand}, ${data.designer},
        ${data.season}, ${data.status}, ${data.imageUrl ?? null}, ${data.additionalImages},
        ${data.orderId ?? null}, ${data.createdBy ?? null}
      )
      RETURNING
        id,
        design_id AS "designId",
        style_no AS "styleNo",
        style_name AS "styleName",
        buyer,
        brand,
        designer,
        season,
        status,
        image_url AS "imageUrl",
        additional_images AS "additionalImages",
        created_at AS "createdAt"
    `;

    await invalidateByPrefix("design-vault:");
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error("[design-vault:post] failed:", (error as Error).message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
