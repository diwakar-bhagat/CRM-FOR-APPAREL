"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Factory, Search } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ExportButton } from "@/components/dashboard/export-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

type SupplierAnalysisRow = {
  supplier: string;
  events: number;
  avgDelayDays: number;
  rejectionCount: number;
};

export function SupplierPerformanceView() {
  const [supplier, setSupplier] = useState("ALL");
  const [category, setCategory] = useState("ALL");
  const [quality, setQuality] = useState("ALL");
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["supplier-performance", supplier, category, quality],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (supplier !== "ALL") params.set("supplier", supplier);
      if (category !== "ALL") params.set("category", category);
      if (quality !== "ALL") params.set("quality", quality);
      const res = await fetch(`/api/supplier-performance?${params}`);
      if (!res.ok) throw new Error("Failed to load supplier performance");
      return res.json() as Promise<{
        data: SupplierRow[];
        summary: { onTimePct: number; avgDelayDays: number; rejectionCount: number; openIssues: number };
        analysis?: { topDelayedSuppliers: SupplierAnalysisRow[]; topRejectionSuppliers: SupplierAnalysisRow[] };
      }>;
    },
    staleTime: 60_000,
  });

  const rows = useMemo(() => data?.data ?? [], [data]);
  const suppliers = useMemo(() => Array.from(new Set(rows.map((row) => row.supplierName))).sort(), [rows]);
  const categories = useMemo(() => Array.from(new Set(rows.map((row) => row.category))).sort(), [rows]);
  const qualities = useMemo(() => Array.from(new Set(rows.map((row) => row.qualityStatus))).sort(), [rows]);
  const filteredRows = useMemo(
    () =>
      rows.filter((row) => {
        if (!search.trim()) return true;
        const query = search.trim().toLowerCase();
        return `${row.supplierName} ${row.category} ${row.buyer ?? ""} ${row.orderRef ?? ""} ${row.qualityStatus}`
          .toLowerCase()
          .includes(query);
      }),
    [rows, search],
  );
  const chartRows = useMemo(
    () =>
      Object.values(
        filteredRows.reduce<Record<string, { supplier: string; delay: number; rejections: number }>>((acc, row) => {
          acc[row.supplierName] ??= { supplier: row.supplierName, delay: 0, rejections: 0 };
          acc[row.supplierName].delay += Number(row.delayDays ?? 0);
          acc[row.supplierName].rejections += Number(row.rejectionCount ?? 0);
          return acc;
        }, {}),
      ),
    [filteredRows],
  );
  const summary = data?.summary ?? { onTimePct: 0, avgDelayDays: 0, rejectionCount: 0, openIssues: 0 };

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

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="mr-auto">
          <h1 className="flex items-center gap-2 font-semibold text-2xl"><Factory className="h-5 w-5" />Supplier Performance</h1>
          <p className="text-muted-foreground text-sm">Delivery, quality, and rejection signals synced with production.</p>
        </div>
        <ExportButton data={filteredRows} filename="supplier-performance" />
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Kpi title="On-time %" value={`${summary.onTimePct}%`} />
        <Kpi title="Avg Delay" value={`${summary.avgDelayDays}d`} />
        <Kpi title="Rejections" value={summary.rejectionCount} />
        <Kpi title="Open Issues" value={summary.openIssues} />
      </div>
      <Card>
        <CardContent className="grid gap-3 p-4 md:grid-cols-4">
          <Select value={supplier} onValueChange={setSupplier}>
            <SelectTrigger><SelectValue placeholder="Supplier" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Suppliers</SelectItem>
              {suppliers.map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Categories</SelectItem>
              {categories.map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={quality} onValueChange={setQuality}>
            <SelectTrigger><SelectValue placeholder="Quality" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Quality Status</SelectItem>
              {qualities.map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} className="pl-9" placeholder="Search supplier/ref/buyer" />
          </div>
        </CardContent>
      </Card>
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
      <div className="grid gap-4 lg:grid-cols-2">
        <AnalysisCard title="Highest Delay Risk" rows={data?.analysis?.topDelayedSuppliers ?? []} metric="avgDelayDays" suffix="d" />
        <AnalysisCard title="Highest Rejection Risk" rows={data?.analysis?.topRejectionSuppliers ?? []} metric="rejectionCount" />
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Supplier</TableHead><TableHead>Category</TableHead><TableHead>Buyer</TableHead><TableHead>Ref</TableHead><TableHead>Delay</TableHead><TableHead>Quality</TableHead></TableRow></TableHeader>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.id}><TableCell>{row.supplierName}</TableCell><TableCell>{row.category}</TableCell><TableCell>{row.buyer ?? "-"}</TableCell><TableCell>{row.orderRef ?? "-"}</TableCell><TableCell className={row.delayDays > 0 ? "text-red-600" : "text-emerald-600"}>{row.delayDays}</TableCell><TableCell>{row.qualityStatus}</TableCell></TableRow>
              ))}
              {filteredRows.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No supplier events for current filter.</TableCell></TableRow>}
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

function AnalysisCard({
  title,
  rows,
  metric,
  suffix = "",
}: {
  title: string;
  rows: SupplierAnalysisRow[];
  metric: "avgDelayDays" | "rejectionCount";
  suffix?: string;
}) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {rows.map((row) => (
          <div key={`${title}-${row.supplier}`} className="flex items-center justify-between gap-3 rounded-md border p-3">
            <div>
              <div className="font-medium">{row.supplier}</div>
              <div className="text-muted-foreground text-xs">{row.events} production events</div>
            </div>
            <div className={Number(row[metric]) > 0 ? "font-semibold text-red-600" : "font-semibold text-emerald-600"}>
              {row[metric]}{suffix}
            </div>
          </div>
        ))}
        {rows.length === 0 && <div className="py-6 text-center text-muted-foreground text-sm">No report rows.</div>}
      </CardContent>
    </Card>
  );
}
