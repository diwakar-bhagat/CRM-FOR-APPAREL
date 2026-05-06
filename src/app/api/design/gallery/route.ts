import { z } from 'zod';
import { ok, serverError, validationError } from '@/lib/api-response';
import { paginationQuerySchema } from "@/lib/erp-api";
import { prisma } from "@/lib/prisma";

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

    const where = {
      ...(buyer ? { buyer: { equals: buyer, mode: "insensitive" as const } } : {}),
      ...(status ? { status: { equals: status, mode: "insensitive" as const } } : {}),
    };

    const [designs, total] = await Promise.all([
      prisma.design.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          galleryId: true,
          styleNo: true,
          buyer: true,
          designer: true,
          season: true,
          status: true,
          imageUrl: true,
          createdAt: true,
        },
      }),
      prisma.design.count({ where }),
    ]);

    const pages = Math.ceil(total / limit);
    return ok(designs, { total, page, pages });
  } catch (error) {
    return serverError(error);
  }
}
