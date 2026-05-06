import { DataTableSkeleton } from '@/components/ui/skeletons/data-table-skeleton';

export default function FabricWorkingLoading() {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-2 py-4 sm:px-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
          <div className="mt-2 h-4 w-64 bg-slate-100 rounded animate-pulse" />
        </div>
      </div>
      <DataTableSkeleton cols={12} rows={10} />
    </div>
  );
}
