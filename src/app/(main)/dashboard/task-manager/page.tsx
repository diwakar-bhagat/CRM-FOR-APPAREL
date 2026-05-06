import { Metadata } from 'next';
import { Suspense } from 'react';

import { TaskManagerView } from '@/components/task-manager/task-manager-view';
import { DataTableSkeleton } from '@/components/ui/skeletons/data-table-skeleton';

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Manage orders and processes',
};

export default function TaskManagerPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-2 py-4 sm:px-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Manager</h1>
          <p className="text-sm text-muted-foreground">Track and manage order processes and statuses</p>
        </div>
      </div>

      <Suspense fallback={<DataTableSkeleton cols={15} rows={10} />}>
        <TaskManagerView />
      </Suspense>
    </div>
  );
}
