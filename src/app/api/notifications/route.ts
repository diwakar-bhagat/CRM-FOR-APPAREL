import { ok, serverError } from '@/lib/api-response';
import { sql } from "@/lib/db";
import { ensureNotificationsTable } from "@/lib/cta-schema";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const readParam = url.searchParams.get("read");
    const isRead = readParam === "true" ? true : readParam === "false" ? false : null;
    const pageParam = Number(url.searchParams.get("page") ?? 1);
    const limitParam = Number(url.searchParams.get("limit") ?? 100);
    const page = Number.isFinite(pageParam) && pageParam >= 1 ? Math.floor(pageParam) : 1;
    const limit =
      Number.isFinite(limitParam) && limitParam >= 1 ? Math.min(500, Math.floor(limitParam)) : 100;
    const skip = (page - 1) * limit;

    await ensureNotificationsTable();

    const notifications = await sql`
      SELECT
        id,
        reff_no AS "reffNo",
        style_name AS "styleName",
        message,
        created_by AS "createdBy",
        is_read AS "isRead",
        type,
        created_at AS "createdAt"
      FROM public.notifications
      WHERE (${isRead}::boolean IS NULL OR is_read = ${isRead})
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${skip}
    `;
    const totalRows = await sql`
      SELECT COUNT(*)::int AS count
      FROM public.notifications
      WHERE (${isRead}::boolean IS NULL OR is_read = ${isRead})
    `;
    const unreadRows = await sql`SELECT COUNT(*)::int AS count FROM public.notifications WHERE is_read = false`;
    const total = Number(totalRows[0]?.count ?? 0);
    const unreadCount = Number(unreadRows[0]?.count ?? 0);

    const pages = Math.ceil(total / limit);
    return ok({ notifications, unreadCount }, { total, page, pages });
  } catch (error) {
    return serverError(error);
  }
}
