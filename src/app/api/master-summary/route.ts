import { ok, serverError } from '@/lib/api-response';
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const summaries = await prisma.monthlySummary.findMany({
      orderBy: { month: "asc" },
      select: {
        id: true,
        month: true,
        buyerName: true,
        planToShip: true,
        stitchedQty: true,
        balToSew: true,
      },
    });

    const buyers = [...new Set(summaries.map((item) => item.buyerName))];
    const months = [...new Set(summaries.map((item) => item.month.toISOString().slice(0, 7)))];

    return ok({ summaries, buyers, months });
  } catch (error) {
    return serverError(error);
  }
}
