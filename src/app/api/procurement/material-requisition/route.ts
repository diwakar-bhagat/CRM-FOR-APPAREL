import { z } from 'zod';
import { ok, created, serverError, validationError } from '@/lib/api-response';
import { createMaterialRequisitionSchema, paginationQuerySchema } from "@/lib/erp-api";
import { prisma } from "@/lib/prisma";

const getMaterialRequisitionSchema = paginationQuerySchema.extend({
  type: z.string().optional(),
  location: z.string().optional(),
  year: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const params = {
      type: url.searchParams.get("type"),
      location: url.searchParams.get("location"),
      year: url.searchParams.get("year"),
      page: url.searchParams.get("page"),
      limit: url.searchParams.get("limit"),
    };

    const parsed = getMaterialRequisitionSchema.safeParse(params);
    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const { type, location, year, page, limit } = parsed.data;

    const where = {
      ...(location ? { forLocation: location } : {}),
      ...(year
        ? {
            requisitionDate: {
              gte: new Date(`${year.split("-")[0]}-04-01`),
              lte: new Date(`${year.split("-")[1]}-03-31`),
            },
          }
        : {}),
      ...(type
        ? {
            items: {
              some: {
                itemCategory: { equals: type, mode: "insensitive" as const },
              },
            },
          }
        : {}),
    };

    const [requisitions, total] = await Promise.all([
      prisma.materialRequisition.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          requisitionNo: true,
          requisitionDate: true,
          company: true,
          reqnType: true,
          requisitionFor: true,
          buyer: true,
          season: true,
          forLocation: true,
          preparedBy: true,
          deptFrom: true,
          deptTo: true,
          createdAt: true,
          items: {
            select: {
              id: true,
              itemCategory: true,
              itemDesc: true,
              color: true,
              width: true,
              unit: true,
              reqnQty: true,
              rate: true,
              reqOn: true,
              remark: true,
            },
          },
        },
      }),
      prisma.materialRequisition.count({ where }),
    ]);

    const pages = Math.ceil(total / limit);
    return ok(requisitions, { total, page, pages });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as unknown;
    const parsed = createMaterialRequisitionSchema.safeParse(body);
    
    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const requisition = await prisma.materialRequisition.create({
      data: {
        ...parsed.data,
        items: {
          create: parsed.data.items,
        },
      },
      select: {
        id: true,
        requisitionNo: true,
        requisitionDate: true,
        createdAt: true,
      },
    });

    return created(requisition);
  } catch (error) {
    return serverError(error);
  }
}
