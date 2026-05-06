import { createOrderSchema, paginationQuerySchema } from "@/lib/erp-api";
import { ok, created, serverError, validationError } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const params = url.searchParams;
    const distinct = params.get("distinct");
    
    if (distinct === "buyers") {
      const buyers = await prisma.buyer.findMany({
        select: { name: true },
        orderBy: { name: "asc" },
      });
      return ok(buyers.map((buyer) => buyer.name));
    }
    
    if (distinct === "months") {
      const months = await prisma.order.findMany({
        distinct: ["month"],
        select: { month: true },
        orderBy: { month: "asc" },
      });
      return ok(months.map((item) => item.month));
    }

    const parsedPagination = paginationQuerySchema.safeParse({
      page: params.get("page") ?? "1",
      limit: params.get("limit") ?? "100",
    });
    
    if (!parsedPagination.success) {
      return validationError(parsedPagination.error);
    }

    const month = params.get("month");
    const buyer = params.get("buyer");
    const unit = params.get("unit");
    const status = params.get("status");
    const search = params.get("search");
    const { page, limit } = parsedPagination.data;

    const where = {
      ...(month ? { month } : {}),
      ...(status ? { planStatus: status } : {}),
      ...(buyer ? { buyer: { name: buyer } } : {}),
      ...(unit ? { unit: { name: unit } } : {}),
      ...(search
        ? {
            OR: [
              { orderNo: { contains: search, mode: "insensitive" as const } },
              { styleDescription: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          orderNo: true,
          styleDescription: true,
          qty: true,
          month: true,
          planStatus: true,
          exFactoryDate: true,
          pcdPlan: true,
          fileHoDate: true,
          rdDate: true,
          buyer: { select: { id: true, name: true } },
          unit: { select: { id: true, name: true } },
        },
      }),
      prisma.order.count({ where }),
    ]);

    const pages = Math.ceil(total / limit);
    return ok(orders, { total, page, pages });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as unknown;
    const parsed = createOrderSchema.safeParse(body);
    
    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const order = await prisma.order.create({
      data: parsed.data,
      select: {
        id: true,
        orderNo: true,
        styleDescription: true,
        qty: true,
        month: true,
      },
    });

    return created(order);
  } catch (error) {
    return serverError(error);
  }
}
