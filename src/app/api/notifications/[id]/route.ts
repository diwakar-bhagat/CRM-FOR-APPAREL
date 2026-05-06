import { ok, badRequest, serverError } from '@/lib/api-response';
import { sql } from "@/lib/db";
import { z } from 'zod';
import { ensureNotificationsTable } from "@/lib/cta-schema";

const updateNotificationSchema = z.object({
  isRead: z.boolean(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json() as unknown;
    
    const parsed = updateNotificationSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest("Invalid request body: isRead must be a boolean");
    }

    await ensureNotificationsTable();

    const rows = await sql`
      UPDATE public.notifications
      SET is_read = ${parsed.data.isRead}
      WHERE id = ${id}
      RETURNING id, is_read AS "isRead"
    `;
    const notification = rows[0];

    return ok(notification);
  } catch (error) {
    return serverError(error);
  }
}
