import { z } from 'zod';
import { ok, serverError, validationError } from '@/lib/api-response';
import { paginationQuerySchema } from '@/lib/erp-api';
import { sql } from "@/lib/db";

const getNotificationsSchema = paginationQuerySchema.extend({
  read: z.enum(['true', 'false']).optional(),
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const params = {
      read: url.searchParams.get("read"),
      page: url.searchParams.get("page"),
      limit: url.searchParams.get("limit"),
    };

    const parsed = getNotificationsSchema.safeParse(params);
    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const { read, page, limit } = parsed.data;
    const isRead = read === undefined ? null : read === "true";
    const skip = (page - 1) * limit;

    const notifications = await sql`
      SELECT
        id,
        "reffNo",
        "styleName",
        message,
        "createdBy",
        "isRead",
        type,
        "createdAt"
      FROM public."Notification"
      WHERE (${isRead}::boolean IS NULL OR "isRead" = ${isRead})
      ORDER BY "createdAt" DESC
      LIMIT ${limit}
      OFFSET ${skip}
    `;
    const totalRows = await sql`
      SELECT COUNT(*)::int AS count
      FROM public."Notification"
      WHERE (${isRead}::boolean IS NULL OR "isRead" = ${isRead})
    `;
    const unreadRows = await sql`SELECT COUNT(*)::int AS count FROM public."Notification" WHERE "isRead" = false`;
    const total = Number(totalRows[0]?.count ?? 0);
    const unreadCount = Number(unreadRows[0]?.count ?? 0);

    const pages = Math.ceil(total / limit);
    return ok({ notifications, unreadCount }, { total, page, pages });
  } catch (error) {
    return serverError(error);
  }
}
