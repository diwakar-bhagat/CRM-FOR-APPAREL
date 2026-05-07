import { MaterialRequisitionView } from "@/components/material-requisition/material-requisition-view";

export default function MaterialRequisitionPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-2 py-4 sm:px-4">
      <div>
        <h1 className="font-semibold text-3xl tracking-tight">Material Requisition</h1>
        <p className="text-muted-foreground text-sm">Create and track fabric, trim, and accessory requisitions.</p>
      </div>
      <MaterialRequisitionView />
    </div>
  );
}
