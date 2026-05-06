'use client';

import { useQuery } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { DataTableSkeleton } from '@/components/ui/skeletons/data-table-skeleton';
import { columns } from './fabric-working-columns';

interface FabricWorkingOrder {
  id: string;
  orderNo: string;
  styleDescription: string;
  qty: number;
  month: string;
  planStatus: string;
  exFactoryDate: string | null;
  buyer: { name: string };
  fabricStatus: string;
  pendingItems: number;
}

export function FabricWorkingView() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['fabric-working'],
    queryFn: async () => {
      const res = await fetch('/api/fabric-working?status=All%20Items');
      if (!res.ok) throw new Error('Failed to fetch fabric working data');
      return res.json() as Promise<{ orders: FabricWorkingOrder[]; total: number }>;
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
        <AlertDescription>Failed to load fabric working data. Please try again.</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Fabric Working</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={data?.orders ?? []} />
        </div>
      </CardContent>
    </Card>
  );
}
