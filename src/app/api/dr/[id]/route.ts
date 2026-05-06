import { ok, serverError, validationError } from '@/lib/api-response';
import { updateDrEntrySchema } from "@/lib/erp-api";
import { sql } from "@/lib/db";
import { ensureDrEntriesTable } from "@/lib/cta-schema";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json() as unknown;
    const parsed = updateDrEntrySchema.safeParse(body);
    
    if (!parsed.success) {
      return validationError(parsed.error);
    }

    await ensureDrEntriesTable();

    const rows = await sql`
      UPDATE public.dr_entries
      SET
        on_machine = COALESCE(${parsed.data.onMachine ?? null}, on_machine),
        off_machine = COALESCE(${parsed.data.offMachine ?? null}, off_machine),
        remarks = COALESCE(${parsed.data.remarks ?? null}, remarks),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING
        id,
        sr_no AS "srNo",
        order_no AS "orderNo",
        on_machine AS "onMachine",
        off_machine AS "offMachine",
        remarks
    `;
    const entry = rows[0];

    return ok(entry);
  } catch (error) {
    return serverError(error);
  }
}
