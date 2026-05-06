'use client';

import { useQuery } from '@tanstack/react-query';
import { AlertCircle, Plus } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { DataTableSkeleton } from '@/components/ui/skeletons/data-table-skeleton';
import { TaskManagerFilters } from './task-manager-filters';
import { columns } from './task-manager-columns';

interface TaskManagerOrder {
  id: string;
  orderNo: string;
  styleDescription: string;
  qty: number;
  month: string;
  planStatus: string;
  exFactoryDate: string | null;
  fileHoDate: string | null;
  pcdPlan: string | null;
  finalPcdClosure: string | null;
  rdDate: string | null;
  ppComments: string | null;
  specialWork: string | null;
  fob: number | null;
  buyer: { name: string };
  productionEntries: Array<{ id: string; balanceStitchQty: number | null; balanceSpecialWork: number | null }>;
}

export function TaskManagerView() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['task-manager'],
    queryFn: async () => {
      const res = await fetch('/api/task-manager?page=1&limit=100');
      if (!res.ok) throw new Error('Failed to fetch task manager data');
      return res.json() as Promise<{ orders: TaskManagerOrder[]; total: number }>;
    },
    retry: 2,
    staleTime: 60 * 1000,
  });

  if (isLoading) {
    return <DataTableSkeleton cols={15} rows={10} />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load task manager data. Please try again.</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Order Processes</CardTitle>
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </CardHeader>
      <CardContent>
        <TaskManagerFilters />
        <div className="mt-4 overflow-x-auto">
          <DataTable columns={columns} data={data?.orders ?? []} />
        </div>
      </CardContent>
    </Card>
  );
}
