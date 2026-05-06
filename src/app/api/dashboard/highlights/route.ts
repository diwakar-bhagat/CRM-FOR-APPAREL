import { ok, serverError } from '@/lib/api-response';
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [productionFileHandover, riskAnalysis, ppmReport] = await Promise.all([
      prisma.order.findMany({
        where: { fileHoDate: { not: null } },
        take: 50,
        orderBy: { fileHoDate: "desc" },
        select: {
          orderNo: true,
          buyer: { select: { name: true } },
          styleDescription: true,
        },
      }),
      prisma.riskFlag.findMany({
        where: { resolved: false },
        take: 50,
        orderBy: { createdAt: "desc" },
        select: {
          riskType: true,
          severity: true,
          order: {
            select: {
              orderNo: true,
              styleDescription: true,
              buyer: { select: { name: true } },
            },
          },
        },
      }),
      prisma.order.findMany({
        where: { ppComments: { not: null } },
        take: 50,
        orderBy: { updatedAt: "desc" },
        select: {
          orderNo: true,
        },
      }),
    ]);

    const data = {
      productionFileHandover: productionFileHandover.map((entry) => ({
        reffNo: entry.orderNo,
        vgReffNo: null,
        buyer: entry.buyer.name,
        brand: null,
        styleNo: null,
        styleName: entry.styleDescription,
      })),
      riskAnalysis: riskAnalysis.map((flag) => ({
        reffNo: flag.order.orderNo,
        vgReffNo: null,
        buyer: flag.order.buyer.name,
        brand: null,
        styleNo: null,
        styleName: flag.order.styleDescription,
        riskType: flag.riskType,
        severity: flag.severity,
      })),
      ppmReport: ppmReport.map((order) => ({
        reffNo: order.orderNo,
        vgReffNo: null,
      })),
    };

    return ok(data);
  } catch (error) {
    return serverError(error);
  }
}
