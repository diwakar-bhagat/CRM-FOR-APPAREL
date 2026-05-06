import { ok, badRequest, serverError } from '@/lib/api-response';
import { prisma } from "@/lib/prisma";
import { z } from 'zod';

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

    const notification = await prisma.notification.update({
      where: { id },
      data: { isRead: parsed.data.isRead },
      select: {
        id: true,
        isRead: true,
      },
    });

    return ok(notification);
  } catch (error) {
    return serverError(error);
  }
}
