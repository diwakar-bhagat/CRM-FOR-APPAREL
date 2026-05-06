'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/format-date';

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

export const columns: ColumnDef<FabricWorkingOrder>[] = [
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
    header: 'Style',
    cell: ({ row }) => <span className="truncate">{row.getValue('styleDescription')}</span>,
  },
  {
    accessorKey: 'buyer.name',
    header: 'Buyer',
    cell: ({ row }) => row.original.buyer.name,
  },
  {
    accessorKey: 'qty',
    header: 'Order Qty',
    cell: ({ row }) => (
      <span className="text-right font-medium">{(row.getValue('qty') as number).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: 'pendingItems',
    header: 'Pending Items',
    cell: ({ row }) => (
      <Badge variant={row.original.pendingItems > 0 ? 'destructive' : 'default'}>
        {row.getValue('pendingItems')}
      </Badge>
    ),
  },
  {
    accessorKey: 'fabricStatus',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('fabricStatus') as string;
      const variant = status === 'Pending' ? 'destructive' : 'default';
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'exFactoryDate',
    header: 'Ex-Factory Date',
    cell: ({ row }) => formatDate(row.getValue('exFactoryDate')),
  },
];
