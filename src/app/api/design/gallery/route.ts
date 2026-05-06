import { z } from 'zod';
import { ok, serverError, validationError } from '@/lib/api-response';
import { paginationQuerySchema } from "@/lib/erp-api";
import { sql } from "@/lib/db";

const getDesignGallerySchema = paginationQuerySchema.extend({
  buyer: z.string().optional(),
  status: z.string().optional(),
});

export async function GET(request: Request) {
  try {
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
        "galleryId",
        "styleNo",
        buyer,
        designer,
        season,
        status,
        "imageUrl",
        "createdAt"
      FROM public."Design"
      WHERE (${buyer}::text IS NULL OR buyer ILIKE ${buyer})
        AND (${status}::text IS NULL OR status ILIKE ${status})
      ORDER BY "createdAt" DESC
      LIMIT ${limit}
      OFFSET ${skip}
    `;
    const totalRows = await sql`
      SELECT COUNT(*)::int AS count
      FROM public."Design"
      WHERE (${buyer}::text IS NULL OR buyer ILIKE ${buyer})
        AND (${status}::text IS NULL OR status ILIKE ${status})
    `;
    const total = Number(totalRows[0]?.count ?? 0);

    const pages = Math.ceil(total / limit);
    return ok(designs, { total, page, pages });
  } catch (error) {
    return serverError(error);
  }
}
