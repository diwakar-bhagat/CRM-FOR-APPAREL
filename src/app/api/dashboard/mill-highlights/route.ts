import { ok, serverError } from '@/lib/api-response';
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [labDipStrikeOff, bulkFobApprovals] = await Promise.all([
      prisma.millReport.findMany({
        where: { reportType: { in: ["LAB_DIP", "STRIKE_OFF"] } },
        orderBy: { createdAt: "desc" },
        take: 100,
        select: {
          id: true,
          reffNo: true,
          vgReffNo: true,
          sentDate: true,
          sentBy: true,
          deadlineMargin: true,
          status: true,
          reportType: true,
        },
      }),
      prisma.fobApproval.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
        select: {
          id: true,
          reffNo: true,
          vgReffNo: true,
          buyer: true,
          brand: true,
          styleNo: true,
          styleName: true,
          reqDate: true,
          status: true,
        },
      }),
    ]);

    return ok({
      labDipStrikeOff,
      bulkFobApprovals,
      total: labDipStrikeOff.length,
    });
  } catch (error) {
    return serverError(error);
  }
}
