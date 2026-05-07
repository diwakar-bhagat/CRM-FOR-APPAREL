"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Archive, Boxes, Layers, PackageCheck, Search } from "lucide-react";

import { ExportButton } from "@/components/dashboard/export-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DataTableSkeleton } from "@/components/ui/skeletons/data-table-skeleton";
import { cn } from "@/lib/utils";

type InventoryItem = {
  id: string;
  itemType: string;
  category: string;
  subCategory: string;
  itemName: string;
  width: string | null;
  storageMethod: string | null;
  supplier: string | null;
  stockQty: number;
  reservedQty: number;
  unit: string;
  reorderLevel: number;
  status: "HEALTHY" | "WATCH" | "LOW";
};

type InventoryResponse = {
  data: InventoryItem[];
  summary: {
    itemCount: number;
    stockQty: number;
    reservedQty: number;
    lowCount: number;
    watchCount: number;
  };
};

const statusClass = {
  HEALTHY: "border-emerald-200 bg-emerald-50 text-emerald-700",
  WATCH: "border-orange-200 bg-orange-50 text-orange-700",
  LOW: "border-red-200 bg-red-50 text-red-700",
};

export function FabricTrimInventoryView() {
  const { data, isLoading } = useQuery({
    queryKey: ["inventory", "fabric-trim"],
    queryFn: async () => {
      const res = await fetch("/api/inventory");
      if (!res.ok) throw new Error("Failed to load inventory");
      return res.json() as Promise<InventoryResponse>;
    },
    staleTime: 60_000,
  });

  const rows = data?.data ?? [];
  const exportRows = rows.map((row) => ({
    Type: row.itemType,
    Category: row.category,
    "Sub Category": row.subCategory,
    Item: row.itemName,
    Width: row.width ?? "",
    Supplier: row.supplier ?? "",
    Stock: row.stockQty,
    Reserved: row.reservedQty,
    Unit: row.unit,
    Status: row.status,
    Storage: row.storageMethod ?? "",
  }));
  const byCategory = useMemo(() => {
    const map = new Map<string, InventoryItem[]>();
    for (const row of rows) map.set(row.category, [...(map.get(row.category) ?? []), row]);
    return Array.from(map.entries());
  }, [rows]);

  if (isLoading) return <DataTableSkeleton cols={8} rows={8} />;

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-semibold text-3xl tracking-tight">Fabric and Trim Inventory</h1>
          <p className="text-muted-foreground text-sm">Ribbon, lace, fringe, functional trims, and core fabric stock.</p>
        </div>
        <div className="flex items-center gap-2">
          <ExportButton data={exportRows} filename="fabric-trim-inventory" />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <MetricCard icon={Boxes} label="Items" value={data?.summary.itemCount ?? 0} />
        <MetricCard icon={Archive} label="Stock" value={Math.round(data?.summary.stockQty ?? 0)} />
        <MetricCard icon={PackageCheck} label="Reserved" value={Math.round(data?.summary.reservedQty ?? 0)} />
        <MetricCard icon={Layers} label="Low / Watch" value={`${data?.summary.lowCount ?? 0}/${data?.summary.watchCount ?? 0}`} />
      </div>

      <Card className="border-white/10 bg-card/75 shadow-xl shadow-black/5 backdrop-blur-xl">
        <CardHeader className="flex flex-row items-center justify-between gap-3 border-b bg-muted/25">
          <CardTitle>Inventory Tracking Sheet</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search stock" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-sm">
              <thead>
                <tr className="border-b bg-muted/20 text-left text-muted-foreground text-xs uppercase">
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Width</th>
                  <th className="px-4 py-3">Storage</th>
                  <th className="px-4 py-3">Supplier</th>
                  <th className="px-4 py-3 text-right">Stock</th>
                  <th className="px-4 py-3 text-right">Reserved</th>
                  <th className="px-4 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b last:border-b-0">
                    <td className="px-4 py-3 font-medium">{row.itemType}</td>
                    <td className="px-4 py-3">{row.category}</td>
                    <td className="px-4 py-3">{row.subCategory} - {row.itemName}</td>
                    <td className="px-4 py-3">{row.width ?? "-"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.storageMethod ?? "-"}</td>
                    <td className="px-4 py-3">{row.supplier ?? "-"}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{Number(row.stockQty).toLocaleString()} {row.unit}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{Number(row.reservedQty).toLocaleString()} {row.unit}</td>
                    <td className="px-4 py-3 text-right">
                      <Badge variant="outline" className={cn("text-xs", statusClass[row.status] ?? statusClass.HEALTHY)}>
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 lg:grid-cols-2">
        {byCategory.map(([category, items]) => (
          <Card key={category} className="border-white/10 bg-card/65 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-base">{category}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Badge key={item.id} variant="outline" className="bg-background/60">
                  {item.subCategory}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value }: { icon: typeof Boxes; label: string; value: number | string }) {
  return (
    <Card className="border-white/10 bg-card/75 backdrop-blur-xl">
      <CardContent className="flex items-center gap-3 p-4">
        <div className="rounded-lg border bg-muted p-2 text-muted-foreground">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <div className="text-muted-foreground text-xs uppercase">{label}</div>
          <div className="font-semibold text-2xl tabular-nums">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}
