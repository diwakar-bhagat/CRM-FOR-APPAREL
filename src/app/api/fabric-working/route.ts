import { z } from 'zod';
import { ok, serverError, validationError } from '@/lib/api-response';
import { parsePagination } from '@/lib/parse-utils';
import { prisma } from '@/lib/prisma';

const getFabricWorkingSchema = z.object({
  status: z.string().default('All Items'),
  buyer: z.string().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(50),
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const params = {
      status: url.searchParams.get('status') ?? 'All Items',
      buyer: url.searchParams.get('buyer'),
      page: url.searchParams.get('page'),
      limit: url.searchParams.get('limit'),
    };

    const parsed = getFabricWorkingSchema.safeParse(params);
    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const { status, buyer, page, limit } = parsed.data;
    const { skip } = parsePagination(page, limit);

    const where = {
      ...(buyer ? { buyer: { name: { equals: buyer, mode: 'insensitive' as const } } } : {}),
    };

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          orderNo: true,
          styleDescription: true,
          qty: true,
          exFactoryDate: true,
          pcdPlan: true,
          buyer: { select: { name: true } },
          productionEntries: {
            select: {
              balanceCuttingQty: true,
              balanceStitchQty: true,
            },
            orderBy: { entryDate: 'desc' },
            take: 1,
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    const normalized = orders.map((order) => {
      const latestEntry = order.productionEntries[0];
      const pendingItems = Math.max(
        0,
        (latestEntry?.balanceCuttingQty ?? 0) + (latestEntry?.balanceStitchQty ?? 0)
      );
      const fabricStatus = pendingItems > 0 ? 'Pending' : 'In-House';

      return {
        ...order,
        fabricStatus,
        pendingItems,
      };
    });

    const filtered =
      status !== 'All Items'
        ? normalized.filter((order) => order.fabricStatus === status)
        : normalized;

    const pages = Math.ceil(total / limit);
    return ok(filtered, { total, page, pages });
  } catch (error) {
    return serverError(error);
  }
}
