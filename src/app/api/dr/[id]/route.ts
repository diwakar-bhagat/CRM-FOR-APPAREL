import { ok, serverError, validationError } from '@/lib/api-response';
import { updateDrEntrySchema } from "@/lib/erp-api";
import { sql } from "@/lib/db";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json() as unknown;
    const parsed = updateDrEntrySchema.safeParse(body);
    
    if (!parsed.success) {
      return validationError(parsed.error);
    }

    const rows = await sql`
      UPDATE public."DREntry"
      SET
        "onMachine" = COALESCE(${parsed.data.onMachine ?? null}, "onMachine"),
        "offMachine" = COALESCE(${parsed.data.offMachine ?? null}, "offMachine"),
        remarks = COALESCE(${parsed.data.remarks ?? null}, remarks)
      WHERE id = ${id}
      RETURNING id, "srNo", "orderNo", "onMachine", "offMachine", remarks
    `;
    const entry = rows[0];

    return ok(entry);
  } catch (error) {
    return serverError(error);
  }
}
