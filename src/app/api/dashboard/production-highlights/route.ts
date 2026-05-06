import { ok, serverError } from '@/lib/api-response';
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [initialRdSopReport, bulkEmbroideryOrder] = await Promise.all([
      prisma.order.findMany({
        where: { rdDate: { not: null } },
        orderBy: { rdDate: "desc" },
        take: 100,
        select: {
          id: true,
          orderNo: true,
          styleDescription: true,
          planStatus: true,
          qty: true,
          month: true,
        },
      }),
      prisma.order.findMany({
        where: { specialWork: { contains: "Emb.", mode: "insensitive" } },
        orderBy: { createdAt: "desc" },
        take: 100,
        select: {
          id: true,
          orderNo: true,
          styleDescription: true,
          specialWork: true,
          planStatus: true,
          qty: true,
          month: true,
        },
      }),
    ]);

    return ok({
      initialRdSopReport,
      bulkEmbroideryOrder,
    });
  } catch (error) {
    return serverError(error);
  }
}
