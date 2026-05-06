import { z } from 'zod';
import { ok, serverError, validationError } from '@/lib/api-response';
import { paginationQuerySchema } from '@/lib/erp-api';
import { prisma } from "@/lib/prisma";

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
    const where = read ? { isRead: read === 'true' } : undefined;

    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          reffNo: true,
          styleName: true,
          message: true,
          createdBy: true,
          isRead: true,
          type: true,
          createdAt: true,
        },
      }),
      prisma.notification.count({ where }),
      prisma.notification.count({ where: { isRead: false } }),
    ]);

    const pages = Math.ceil(total / limit);
    return ok({ notifications, unreadCount }, { total, page, pages });
  } catch (error) {
    return serverError(error);
  }
}
