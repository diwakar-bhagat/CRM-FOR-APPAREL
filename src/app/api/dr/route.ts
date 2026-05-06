import { z } from 'zod';
import { ok, serverError, validationError } from '@/lib/api-response';
import { paginationQuerySchema } from '@/lib/erp-api';
import { sql } from "@/lib/db";
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

    const weekNo = wk ? safeInt(wk) : null;
    const skip = (page - 1) * limit;
    const entries = await sql`
      SELECT
        d.id,
        d."srNo",
        d."orderNo",
        d."styleDescription",
        d."specialWork",
        d.qty,
        d.tod,
        d."wkNumber",
        d."onMachine",
        d."offMachine",
        d.remarks,
        d."sheetSource",
        json_build_object('name', b.name) AS buyer,
        json_build_object('name', u.name) AS unit
      FROM public."DREntry" d
      JOIN public."Buyer" b ON b.id = d."buyerId"
      JOIN public."Unit" u ON u.id = d."unitId"
      WHERE (${unit}::text IS NULL OR u.name = ${unit})
        AND (${buyer}::text IS NULL OR b.name = ${buyer})
        AND (${weekNo}::int IS NULL OR d."wkNumber" = ${weekNo})
      ORDER BY d.tod ASC
      LIMIT ${limit}
      OFFSET ${skip}
    `;
    const totalRows = await sql`
      SELECT COUNT(*)::int AS count
      FROM public."DREntry" d
      JOIN public."Buyer" b ON b.id = d."buyerId"
      JOIN public."Unit" u ON u.id = d."unitId"
      WHERE (${unit}::text IS NULL OR u.name = ${unit})
        AND (${buyer}::text IS NULL OR b.name = ${buyer})
        AND (${weekNo}::int IS NULL OR d."wkNumber" = ${weekNo})
    `;
    const total = Number(totalRows[0]?.count ?? 0);

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
