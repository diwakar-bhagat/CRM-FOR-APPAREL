"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Factory, Funnel, Search } from "lucide-react";

import { ExportButton } from "@/components/dashboard/export-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type OrderRow = {
  id: string;
  refNo: string;
  buyer: string | null;
  brand: string | null;
  styleId: string | null;
  styleName: string | null;
  orderQty: number | null;
  productionQty: number | null;
  finishingQty: number | null;
  deliveryDate: string | null;
};

type QueueStatus = "ALL" | "QUEUED" | "IN_WIP" | "COMPLETED";

function deriveQueue(order: OrderRow) {
  const orderQty = Number(order.orderQty ?? 0);
  const productionQty = Number(order.productionQty ?? 0);
  const finishingQty = Number(order.finishingQty ?? 0);
  const wipQty = Math.max(orderQty - finishingQty, 0);

  const status: QueueStatus =
    finishingQty >= orderQty && orderQty > 0
      ? "COMPLETED"
      : productionQty > 0
        ? "IN_WIP"
        : "QUEUED";

  return { ...order, orderQty, productionQty, finishingQty, wipQty, status };
}

export function ProductionWipView() {
  const [buyer, setBuyer] = useState("ALL");
  const [status, setStatus] = useState<QueueStatus>("ALL");
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["production-wip-orders"],
    queryFn: async () => {
      const res = await fetch("/api/orders?limit=300");
      if (!res.ok) throw new Error("Failed to load production queue");
      const json = await res.json() as { data?: OrderRow[]; orders?: OrderRow[] };
      return (json.data ?? json.orders ?? []).map(deriveQueue);
    },
    staleTime: 60_000,
  });

  const rows = data ?? [];
  const buyers = useMemo(
    () => Array.from(new Set(rows.map((row) => row.buyer).filter(Boolean))) as string[],
    [rows],
  );

  const filtered = rows.filter((row) => {
    if (buyer !== "ALL" && row.buyer !== buyer) return false;
    if (status !== "ALL" && row.status !== status) return false;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const hay = `${row.refNo} ${row.styleId ?? ""} ${row.styleName ?? ""} ${row.brand ?? ""} ${row.buyer ?? ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const kpis = useMemo(() => {
    const liveQueue = filtered.filter((row) => row.status !== "COMPLETED").length;
    const wipStyles = filtered.filter((row) => row.status === "IN_WIP").length;
    const totalWipQty = filtered.reduce((sum, row) => sum + row.wipQty, 0);
    return { liveQueue, wipStyles, totalWipQty };
  }, [filtered]);

  if (isLoading) return <div className="p-6 text-muted-foreground">Loading production queue...</div>;
  if (error) return <div className="p-6 text-destructive">Failed to load production queue.</div>;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="mr-auto">
          <h1 className="flex items-center gap-2 font-semibold text-2xl">
            <Factory className="h-5 w-5" />
            Production and WIP
          </h1>
          <p className="text-muted-foreground text-sm">Live production queue and WIP status by style.</p>
        </div>
        <ExportButton data={filtered} filename="production-wip-queue" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard title="Live Queue" value={kpis.liveQueue} />
        <MetricCard title="WIP Styles" value={kpis.wipStyles} />
        <MetricCard title="Total WIP Qty" value={kpis.totalWipQty.toLocaleString("en-IN")} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Funnel className="h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <Select value={buyer} onValueChange={setBuyer}>
            <SelectTrigger><SelectValue placeholder="Buyer" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Buyers</SelectItem>
              {buyers.map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={(value) => setStatus(value as QueueStatus)}>
            <SelectTrigger><SelectValue placeholder="Queue Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="QUEUED">Queued</SelectItem>
              <SelectItem value="IN_WIP">In WIP</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} className="pl-9" placeholder="Search ref/style/buyer" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ref</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Style</TableHead>
                <TableHead>Order Qty</TableHead>
                <TableHead>Produced</TableHead>
                <TableHead>Finished</TableHead>
                <TableHead>WIP Qty</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.refNo}</TableCell>
                  <TableCell>{row.buyer ?? "-"}</TableCell>
                  <TableCell>{row.styleName ?? row.styleId ?? "-"}</TableCell>
                  <TableCell>{row.orderQty.toLocaleString("en-IN")}</TableCell>
                  <TableCell>{row.productionQty.toLocaleString("en-IN")}</TableCell>
                  <TableCell>{row.finishingQty.toLocaleString("en-IN")}</TableCell>
                  <TableCell>{row.wipQty.toLocaleString("en-IN")}</TableCell>
                  <TableCell><StatusBadge status={row.status} /></TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                    No production rows for current filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: number | string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-muted-foreground text-sm">{title}</div>
        <div className="font-semibold text-2xl">{value}</div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: QueueStatus }) {
  if (status === "COMPLETED") return <Badge className="bg-emerald-600">Completed</Badge>;
  if (status === "IN_WIP") return <Badge className="bg-orange-500">In WIP</Badge>;
  return <Badge className="bg-blue-600">Queued</Badge>;
}
