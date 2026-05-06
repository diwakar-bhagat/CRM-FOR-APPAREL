import { ok, serverError, validationError } from '@/lib/api-response';
import { paginationQuerySchema } from "@/lib/erp-api";
import { prisma } from "@/lib/prisma";
import { isValidDate } from '@/lib/parse-utils';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const params = url.searchParams;
    const buyer = params.get("buyer");
    const deliveryDate = params.get("deliveryDate");
    
    const parsedPagination = paginationQuerySchema.safeParse({
      page: params.get("page") ?? "1",
      limit: params.get("limit") ?? "100",
    });
    
    if (!parsedPagination.success) {
      return validationError(parsedPagination.error);
    }
    
    const { page, limit } = parsedPagination.data;

    const where = {
      ...(buyer ? { buyer: { name: buyer } } : {}),
      ...(deliveryDate && isValidDate(deliveryDate) 
        ? { exFactoryDate: new Date(deliveryDate) } 
        : {}),
    };

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { exFactoryDate: "asc" },
        select: {
          id: true,
          orderNo: true,
          styleDescription: true,
          qty: true,
          month: true,
          planStatus: true,
          exFactoryDate: true,
          fileHoDate: true,
          pcdPlan: true,
          finalPcdClosure: true,
          rdDate: true,
          ppComments: true,
          specialWork: true,
          fob: true,
          buyer: { select: { name: true } },
          productionEntries: {
            select: { id: true, balanceStitchQty: true, balanceSpecialWork: true },
          },
          trimStatus: { select: { id: true, trimStatus: true } },
        },
      }),
      prisma.order.count({ where }),
    ]);

    const enrichedOrders = orders.map((order: any) => ({
      ...order,
      vgLinked: Boolean(order.fileHoDate),
      ra: {
        fabrics: [
          order.productionEntries.filter((entry: any) => (entry.balanceStitchQty ?? 0) > 0).length,
          order.productionEntries.filter((entry: any) => (entry.balanceStitchQty ?? 0) === 0).length,
          order.productionEntries.length,
          order.productionEntries.reduce((sum: number, entry: any) => sum + (entry.balanceStitchQty ?? 0), 0),
        ] as number[],
        trims: [
          order.trimStatus.filter((item: any) => item.trimStatus.toLowerCase() === "awaited").length,
          order.trimStatus.filter((item: any) => item.trimStatus.toLowerCase() === "partial").length,
          order.trimStatus.filter((item: any) => item.trimStatus.toLowerCase() === "ok").length,
          order.trimStatus.length,
        ] as number[],
        bulkProcess: order.productionEntries.length,
        fob: order.fob ?? 0,
        bulkEmb: order.productionEntries.reduce((sum: number, item: any) => sum + (item.balanceSpecialWork ?? 0), 0),
        rdGradedPattern: Boolean(order.rdDate),
        pfh: order.fileHoDate ? 1 : 0,
        rd: order.rdDate ? 1 : 0,
        sop: order.finalPcdClosure ? 1 : 0,
        ppm: order.ppComments ? 1 : 0,
      },
    }));

    const pages = Math.ceil(total / limit);
    return ok(enrichedOrders, { total, page, pages });
  } catch (error) {
    return serverError(error);
  }
}
