import { Metadata } from 'next';
import { Suspense } from 'react';

import { DesignGalleryView } from '@/components/design-gallery/design-gallery-view';
import { DataTableSkeleton } from '@/components/ui/skeletons/data-table-skeleton';

export const metadata: Metadata = {
  title: 'Design Gallery',
  description: 'Design vault and gallery',
};

export default function DesignGalleryPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-2 py-4 sm:px-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Design Gallery</h1>
          <p className="text-sm text-muted-foreground">Browse and manage design assets</p>
        </div>
      </div>

      <Suspense fallback={<DataTableSkeleton cols={6} rows={12} />}>
        <DesignGalleryView />
      </Suspense>
    </div>
  );
}
