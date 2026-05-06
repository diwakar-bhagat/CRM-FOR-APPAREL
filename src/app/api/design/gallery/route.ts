import { z } from 'zod';
import { ok, serverError, validationError } from '@/lib/api-response';
import { paginationQuerySchema } from "@/lib/erp-api";
import { sql } from "@/lib/db";

const getDesignGallerySchema = paginationQuerySchema.extend({
  buyer: z.string().optional(),
  status: z.string().optional(),
});

const DEFAULT_DESIGNS = [
  {
    galleryId: 1001,
    styleNo: "CS ELODINE TOP",
    buyer: "H&M",
    designer: "Design Studio",
    season: "SS26",
    status: "Designing",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Wardrobe%20(Unsplash).jpg",
  },
  {
    galleryId: 1002,
    styleNo: "NOA MAXI SKIRT",
    buyer: "WEEKDAY",
    designer: "Sampling",
    season: "SS26",
    status: "Production",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Winter%20Fashion%20(Unsplash).jpg",
  },
  {
    galleryId: 1003,
    styleNo: "CS LILLIAN TOP",
    buyer: "H&M",
    designer: "Pattern Room",
    season: "SS26",
    status: "Approved",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Seamstress%20at%20work%20(Unsplash).jpg",
  },
  {
    galleryId: 1004,
    styleNo: "MARIAH SHIRT",
    buyer: "WEEKDAY",
    designer: "CAD Room",
    season: "AW26",
    status: "Designing",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Factory%20Worker%20Making%20Clothes%20(Unsplash).jpg",
  },
];

async function ensureDesignTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS public.designs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      gallery_id INTEGER UNIQUE NOT NULL,
      style_no TEXT NOT NULL,
      buyer TEXT NOT NULL,
      designer TEXT,
      season TEXT,
      status TEXT NOT NULL DEFAULT 'Designing',
      image_url TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  for (const design of DEFAULT_DESIGNS) {
    await sql`
      INSERT INTO public.designs (gallery_id, style_no, buyer, designer, season, status, image_url)
      VALUES (
        ${design.galleryId}, ${design.styleNo}, ${design.buyer}, ${design.designer},
        ${design.season}, ${design.status}, ${design.imageUrl}
      )
      ON CONFLICT (gallery_id) DO NOTHING
    `;
  }
}

export async function GET(request: Request) {
  try {
    await ensureDesignTable();

    const url = new URL(request.url);
    const params = {
      buyer: url.searchParams.get("buyer"),
      status: url.searchParams.get("status"),
      page: url.searchParams.get("page"),
      limit: url.searchParams.get("limit"),
    };

    const parsed = getDesignGallerySchema.safeParse(params);
    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const { buyer, status, page, limit } = parsed.data;

    const skip = (page - 1) * limit;
    const designs = await sql`
      SELECT
        id,
        gallery_id AS "galleryId",
        style_no AS "styleNo",
        buyer,
        designer,
        season,
        status,
        image_url AS "imageUrl",
        created_at AS "createdAt"
      FROM public.designs
      WHERE (${buyer}::text IS NULL OR buyer ILIKE ${buyer})
        AND (${status}::text IS NULL OR status ILIKE ${status})
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${skip}
    `;
    const totalRows = await sql`
      SELECT COUNT(*)::int AS count
      FROM public.designs
      WHERE (${buyer}::text IS NULL OR buyer ILIKE ${buyer})
        AND (${status}::text IS NULL OR status ILIKE ${status})
    `;
    const total = Number(totalRows[0]?.count ?? 0);

    const pages = Math.ceil(total / limit);
    return Response.json({ designs, data: designs, total, page, pages });
  } catch (error) {
    return serverError(error);
  }
}
