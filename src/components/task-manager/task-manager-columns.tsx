'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/format-date';

interface TaskManagerOrder {
  id: string;
  orderNo: string;
  styleDescription: string;
  qty: number;
  month: string;
  planStatus: string;
  exFactoryDate: string | null;
  buyer: { name: string };
}

export const columns: ColumnDef<TaskManagerOrder>[] = [
  {
    accessorKey: 'orderNo',
    header: 'Order No.',
    cell: ({ row }) => (
      <Badge variant="outline" className="cursor-pointer">
        {row.getValue('orderNo')}
      </Badge>
    ),
  },
  {
    accessorKey: 'styleDescription',
    header: 'Style Description',
    cell: ({ row }) => <span className="truncate">{row.getValue('styleDescription')}</span>,
  },
  {
    accessorKey: 'buyer.name',
    header: 'Buyer',
    cell: ({ row }) => row.original.buyer.name,
  },
  {
    accessorKey: 'qty',
    header: 'Qty',
    cell: ({ row }) => (
      <span className="text-right font-medium">{(row.getValue('qty') as number).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: 'exFactoryDate',
    header: 'Ex-Factory Date',
    cell: ({ row }) => formatDate(row.getValue('exFactoryDate')),
  },
  {
    accessorKey: 'planStatus',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('planStatus') as string;
      const variantMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
        Planned: 'outline',
        Running: 'secondary',
        Stitched: 'default',
        Shipped: 'default',
      };
      return <Badge variant={variantMap[status] ?? 'outline'}>{status}</Badge>;
    },
  },
];
