import { ok, serverError, validationError } from '@/lib/api-response';
import { updateDrEntrySchema } from "@/lib/erp-api";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json() as unknown;
    const parsed = updateDrEntrySchema.safeParse(body);
    
    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const entry = await prisma.dREntry.update({
      where: { id },
      data: parsed.data,
      select: {
        id: true,
        srNo: true,
        orderNo: true,
        onMachine: true,
        offMachine: true,
        remarks: true,
      },
    });

    return ok(entry);
  } catch (error) {
    return serverError(error);
  }
}
