import { Metadata } from 'next';
import { Suspense } from 'react';

import { NotificationsView } from '@/components/notifications/notifications-view';
import { DataTableSkeleton } from '@/components/ui/skeletons/data-table-skeleton';

export const metadata: Metadata = {
  title: 'Notifications',
  description: 'Notification center',
};

export default function NotificationsPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-2 py-4 sm:px-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground">Stay updated with system notifications</p>
        </div>
      </div>

      <Suspense fallback={<DataTableSkeleton cols={5} rows={8} />}>
        <NotificationsView />
      </Suspense>
    </div>
  );
}
