import { z } from 'zod';
import { ok, serverError, validationError } from '@/lib/api-response';
import { paginationQuerySchema } from '@/lib/erp-api';
import { prisma } from "@/lib/prisma";
import { safeInt } from '@/lib/parse-utils';

const getDRSchema = paginationQuerySchema.extend({
  unit: z.string().optional(),
  buyer: z.string().optional(),
  wk: z.string().optional(),
  status: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const params = {
      unit: url.searchParams.get("unit"),
      buyer: url.searchParams.get("buyer"),
      wk: url.searchParams.get("wk"),
      status: url.searchParams.get("status"),
      page: url.searchParams.get("page"),
      limit: url.searchParams.get("limit"),
    };

    const parsed = getDRSchema.safeParse(params);
    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const { unit, buyer, wk, status, page, limit } = parsed.data;

    const where = {
      ...(unit ? { unit: { name: unit } } : {}),
      ...(buyer ? { buyer: { name: buyer } } : {}),
      ...(wk ? { wkNumber: safeInt(wk) } : {}),
    };

    const [entries, total] = await Promise.all([
      prisma.dREntry.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { tod: "asc" },
        select: {
          id: true,
          srNo: true,
          orderNo: true,
          styleDescription: true,
          specialWork: true,
          qty: true,
          tod: true,
          wkNumber: true,
          onMachine: true,
          offMachine: true,
          remarks: true,
          sheetSource: true,
          buyer: { select: { name: true } },
          unit: { select: { name: true } },
        },
      }),
      prisma.dREntry.count({ where }),
    ]);

    const filtered =
      status && status !== "All"
        ? entries.filter((entry: typeof entries[0]) => (entry.onMachine ?? "").toLowerCase().includes(status.toLowerCase()))
        : entries;

    const pages = Math.ceil(total / limit);
    return ok(filtered, { total, page, pages });
  } catch (error) {
    return serverError(error);
  }
}
