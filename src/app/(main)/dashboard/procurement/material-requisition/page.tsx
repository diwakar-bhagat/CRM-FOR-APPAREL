import { Metadata } from 'next';
import { Suspense } from 'react';

import { MaterialRequisitionView } from '@/components/material-requisition/material-requisition-view';
import { DataTableSkeleton } from '@/components/ui/skeletons/data-table-skeleton';

export const metadata: Metadata = {
  title: 'Material Requisition',
  description: 'Material requisition and tracking',
};

export default function MaterialRequisitionPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-2 py-4 sm:px-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Material Requisition</h1>
          <p className="text-sm text-muted-foreground">Manage material requests and requisitions</p>
        </div>
      </div>

      <Suspense fallback={<DataTableSkeleton cols={10} rows={10} />}>
        <MaterialRequisitionView />
      </Suspense>
    </div>
  );
}
