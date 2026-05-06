'use client';

import { useQuery } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { DataTableSkeleton } from '@/components/ui/skeletons/data-table-skeleton';
import { columns } from './material-requisition-columns';

interface MaterialRequisition {
  id: string;
  requisitionNo: string | null;
  requisitionDate: string;
  company: string;
  reqnType: string;
  requisitionFor: string;
  buyer: string | null;
  season: string | null;
  forLocation: string | null;
  preparedBy: string | null;
  deptFrom: string | null;
  deptTo: string | null;
  items: Array<{
    id: string;
    itemCategory: string;
    itemDesc: string;
    color: string | null;
    width: string | null;
    unit: string | null;
    reqnQty: number | null;
    rate: number | null;
    reqOn: string | null;
    remark: string | null;
  }>;
}

export function MaterialRequisitionView() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['material-requisition'],
    queryFn: async () => {
      const res = await fetch('/api/procurement/material-requisition?page=1&limit=50');
      if (!res.ok) throw new Error('Failed to fetch material requisitions');
      return res.json() as Promise<{ requisitions: MaterialRequisition[]; total: number }>;
    },
    retry: 2,
    staleTime: 60 * 1000,
  });

  if (isLoading) {
    return <DataTableSkeleton cols={10} rows={10} />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load material requisitions. Please try again.</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Material Requisitions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={data?.requisitions ?? []} />
        </div>
      </CardContent>
    </Card>
  );
}
