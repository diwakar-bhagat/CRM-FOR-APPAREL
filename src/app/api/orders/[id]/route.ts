import { ok, notFound, serverError, validationError } from '@/lib/api-response';
import { updateOrderSchema } from "@/lib/erp-api";
import { prisma } from "@/lib/prisma";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const order = await prisma.order.findUnique({
      where: { id },
      select: {
        id: true,
        orderNo: true,
        styleDescription: true,
        qty: true,
        month: true,
        planStatus: true,
        remarks: true,
        buyer: { select: { id: true, name: true } },
        unit: { select: { id: true, name: true } },
        productionEntries: {
          select: {
            id: true,
            entryDate: true,
            balanceStitchQty: true,
            balanceFinishQty: true,
            balanceCuttingQty: true,
            balanceSpecialWork: true,
          },
          orderBy: { entryDate: "desc" },
        },
        weeklyOutputs: {
          select: {
            id: true,
            weekNo: true,
            weekStart: true,
            qty: true,
          },
          orderBy: { weekNo: "asc" },
        },
        riskFlags: {
          select: {
            id: true,
            riskType: true,
            severity: true,
            detail: true,
            resolved: true,
          },
          orderBy: { createdAt: "desc" },
        },
        trimStatus: {
          select: {
            id: true,
            trimStatus: true,
            remarks: true,
            updatedAt: true,
          },
          orderBy: { updatedAt: "desc" },
        },
      },
    });

    if (!order) {
      return notFound("Order not found");
    }

    return ok(order);
  } catch (error) {
    return serverError(error);
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json() as unknown;
    const parsed = updateOrderSchema.safeParse(body);
    
    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const order = await prisma.order.update({
      where: { id },
      data: parsed.data,
      select: {
        id: true,
        orderNo: true,
        styleDescription: true,
        qty: true,
        month: true,
        planStatus: true,
      },
    });

    return ok(order);
  } catch (error) {
    return serverError(error);
  }
}
