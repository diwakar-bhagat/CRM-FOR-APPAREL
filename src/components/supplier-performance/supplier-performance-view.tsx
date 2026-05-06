"use client";

import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Factory } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ExportButton } from "@/components/dashboard/export-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTableSkeleton } from "@/components/ui/skeletons/data-table-skeleton";

type SupplierRow = {
  id: string;
  supplierName: string;
  category: string;
  buyer: string | null;
  orderRef: string | null;
  qualityStatus: string;
  rejectionCount: number;
  delayDays: number;
};

export function SupplierPerformanceView() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["supplier-performance"],
    queryFn: async () => {
      const res = await fetch("/api/supplier-performance");
      if (!res.ok) throw new Error("Failed to load supplier performance");
      return res.json() as Promise<{
        data: SupplierRow[];
        summary: { onTimePct: number; avgDelayDays: number; rejectionCount: number; openIssues: number };
      }>;
    },
    staleTime: 60_000,
  });

  if (isLoading) return <DataTableSkeleton cols={6} rows={8} />;
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Supplier Performance Error</AlertTitle>
        <AlertDescription>Unable to load supplier metrics.</AlertDescription>
      </Alert>
    );
  }

  const rows = data?.data ?? [];
  const summary = data?.summary ?? { onTimePct: 0, avgDelayDays: 0, rejectionCount: 0, openIssues: 0 };
  const chartRows = Object.values(
    rows.reduce<Record<string, { supplier: string; delay: number; rejections: number }>>((acc, row) => {
      acc[row.supplierName] ??= { supplier: row.supplierName, delay: 0, rejections: 0 };
      acc[row.supplierName].delay += Number(row.delayDays ?? 0);
      acc[row.supplierName].rejections += Number(row.rejectionCount ?? 0);
      return acc;
    }, {}),
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="mr-auto">
          <h1 className="flex items-center gap-2 font-semibold text-2xl"><Factory className="h-5 w-5" />Supplier Performance</h1>
          <p className="text-muted-foreground text-sm">Delivery, quality, and rejection signals synced with production.</p>
        </div>
        <ExportButton data={rows} filename="supplier-performance" />
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Kpi title="On-time %" value={`${summary.onTimePct}%`} />
        <Kpi title="Avg Delay" value={`${summary.avgDelayDays}d`} />
        <Kpi title="Rejections" value={summary.rejectionCount} />
        <Kpi title="Open Issues" value={summary.openIssues} />
      </div>
      <Card>
        <CardHeader><CardTitle>Supplier Delay / Rejection Score</CardTitle></CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartRows}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="supplier" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="delay" fill="#f97316" />
              <Bar dataKey="rejections" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Supplier</TableHead><TableHead>Category</TableHead><TableHead>Buyer</TableHead><TableHead>Ref</TableHead><TableHead>Delay</TableHead><TableHead>Quality</TableHead></TableRow></TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}><TableCell>{row.supplierName}</TableCell><TableCell>{row.category}</TableCell><TableCell>{row.buyer ?? "-"}</TableCell><TableCell>{row.orderRef ?? "-"}</TableCell><TableCell className={row.delayDays > 0 ? "text-red-600" : "text-emerald-600"}>{row.delayDays}</TableCell><TableCell>{row.qualityStatus}</TableCell></TableRow>
              ))}
              {rows.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No supplier events yet.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function Kpi({ title, value }: { title: string; value: string | number }) {
  return <Card><CardContent className="p-4"><div className="text-muted-foreground text-sm">{title}</div><div className="font-semibold text-2xl">{value}</div></CardContent></Card>;
}
