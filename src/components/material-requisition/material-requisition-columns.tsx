'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/format-date';

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

export const columns: ColumnDef<MaterialRequisition>[] = [
  {
    accessorKey: 'requisitionNo',
    header: 'Req. No.',
    cell: ({ row }) => <span className="font-mono text-sm">{row.getValue('requisitionNo') || '-'}</span>,
  },
  {
    accessorKey: 'requisitionDate',
    header: 'Date',
    cell: ({ row }) => formatDate(row.getValue('requisitionDate')),
  },
  {
    accessorKey: 'reqnType',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('reqnType') as string;
      return (
        <Badge variant={type === 'Local' ? 'secondary' : 'default'}>
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'buyer',
    header: 'Buyer',
    cell: ({ row }) => row.getValue('buyer') || '-',
  },
  {
    accessorKey: 'preparedBy',
    header: 'Prepared By',
    cell: ({ row }) => row.getValue('preparedBy') || '-',
  },
  {
    accessorKey: 'forLocation',
    header: 'Location',
    cell: ({ row }) => row.getValue('forLocation') || '-',
  },
  {
    id: 'itemCount',
    header: 'Items',
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.original.items.length}
      </Badge>
    ),
  },
];
