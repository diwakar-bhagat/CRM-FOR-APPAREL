import { z } from 'zod';
import { ok, serverError, validationError } from '@/lib/api-response';
import { prisma } from "@/lib/prisma";
import { safeInt } from '@/lib/parse-utils';

const getAnalyticsSchema = z.object({
  year: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const params = {
      year: url.searchParams.get("year"),
    };

    const parsed = getAnalyticsSchema.safeParse(params);
    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const year = params.year ? safeInt(params.year) : new Date().getFullYear();
    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year}-12-31`);

    const summaries = await prisma.monthlySummary.findMany({
      where: {
        month: { gte: start, lte: end },
      },
      select: {
        month: true,
        planToShip: true,
        stitchedQty: true,
        balToSew: true,
      },
      orderBy: { month: "asc" },
    });

    const grouped = new Map<string, { month: string; totalPlanned: number; totalStitched: number; balToSew: number }>();
    for (const item of summaries) {
      const month = item.month.toISOString().slice(0, 7);
      const current = grouped.get(month) ?? { month, totalPlanned: 0, totalStitched: 0, balToSew: 0 };
      current.totalPlanned += item.planToShip ?? 0;
      current.totalStitched += item.stitchedQty ?? 0;
      current.balToSew += item.balToSew ?? 0;
      grouped.set(month, current);
    }

    return ok([...grouped.values()]);
  } catch (error) {
    return serverError(error);
  }
}
