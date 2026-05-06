import { Metadata } from 'next';
import { Suspense } from 'react';

import { FabricWorkingView } from '@/components/fabric-working/fabric-working-view';
import { DataTableSkeleton } from '@/components/ui/skeletons/data-table-skeleton';

export const metadata: Metadata = {
  title: 'Fabric Working',
  description: 'Pending fabric working status',
};

export default function FabricWorkingPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-2 py-4 sm:px-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fabric Working</h1>
          <p className="text-sm text-muted-foreground">Monitor pending fabric working items</p>
        </div>
      </div>

      <Suspense fallback={<DataTableSkeleton cols={12} rows={10} />}>
        <FabricWorkingView />
      </Suspense>
    </div>
  );
}
