"use client";

import { Suspense, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { addDays, differenceInDays, format, parse } from "date-fns";
import { motion } from "framer-motion";

import { ExportButton } from "@/components/dashboard/export-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { TNADurationHeatmap } from "./_components/tna-duration-heatmap";
import { TNAKpiCards } from "./_components/tna-kpi-cards";
import { TNAProgressOverview } from "./_components/tna-progress-overview";
import { TNAStageDistribution } from "./_components/tna-stage-distribution";
import { TNAStagePipeline } from "./_components/tna-stage-pipeline";

// ─── Gantt data ───────────────────────────────────────────────────────────────
const tnaData = [
  {
    id: "t1",
    task: "Techpack Finalization",
    duration: 1,
    start: "05/14/25",
    end: "05/15/25",
    stage: "Initiation",
    color: "bg-[var(--chart-1)]",
  },
  {
    id: "t2",
    task: "Fabric And Trim sourcing",
    duration: 3,
    start: "05/23/25",
    end: "05/26/25",
    stage: "Initiation",
    color: "bg-[var(--chart-1)]",
  },
  {
    id: "g1",
    task: "Planning and Design",
    duration: 0,
    start: "",
    end: "",
    stage: "Planning",
    color: "",
    isGroup: true,
  },
  {
    id: "t3",
    task: "Sample Development",
    duration: 5,
    start: "05/14/25",
    end: "05/19/25",
    stage: "Planning",
    color: "bg-[var(--chart-2)]",
  },
  { id: "g2", task: "Execution", duration: 0, start: "", end: "", stage: "Execution", color: "", isGroup: true },
  {
    id: "t4",
    task: "Fabric Cutting",
    duration: 20,
    start: "05/16/25",
    end: "06/05/25",
    stage: "Execution",
    color: "bg-[var(--chart-3)]",
  },
  {
    id: "t5",
    task: "Fabric Inspection",
    duration: 8,
    start: "05/21/25",
    end: "05/29/25",
    stage: "Execution",
    color: "bg-[var(--chart-3)]",
  },
  { id: "g3", task: "Evaluation", duration: 0, start: "", end: "", stage: "Evaluation", color: "", isGroup: true },
  {
    id: "t6",
    task: "Packing and Final QC",
    duration: 6,
    start: "05/10/25",
    end: "05/16/25",
    stage: "Evaluation",
    color: "bg-[var(--chart-4)]",
  },
];

type TNAOrderOption = {
  id: string;
  refNo: string;
  buyer: string;
  product: string;
  status: "delayed" | "at-risk" | "on-track";
};

const statusClass: Record<string, string> = {
  "on-track": "bg-status-on-track/10 text-status-on-track border-status-on-track/20",
  "at-risk": "bg-status-at-risk/10 text-status-at-risk border-status-at-risk/20",
  delayed: "bg-status-delayed/10 text-status-delayed border-status-delayed/20",
};

// Timeline bounds
const allDates = tnaData
  .filter((d) => !d.isGroup && d.start)
  .flatMap((d) => [parse(d.start, "MM/dd/yy", new Date()), parse(d.end, "MM/dd/yy", new Date())])
  .sort((a, b) => a.getTime() - b.getTime());
const timelineStart = allDates[0] ? addDays(allDates[0], -2) : new Date("2025-05-08");
const timelineEnd = allDates[allDates.length - 1] ? addDays(allDates[allDates.length - 1], 2) : new Date("2025-06-10");
const totalDays = differenceInDays(timelineEnd, timelineStart);

function TNATrackerContent() {
  const searchParams = useSearchParams();
  const orderFromUrl = searchParams.get("order");
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState(orderFromUrl ?? "");
  const [activeView, setActiveView] = useState<"pipeline" | "gantt">("pipeline");

  const exportData = tnaData.filter((item) => !item.isGroup).map(({ id, color, isGroup, ...rest }) => rest);

  const gridWeeks: Date[] = [];
  let curr = timelineStart;
  while (curr <= timelineEnd) {
    gridWeeks.push(curr);
    curr = addDays(curr, 7);
  }

  const { data: ordersData, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orders", "tna-options"],
    queryFn: async () => {
      const res = await fetch("/api/orders?limit=100");
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json() as Promise<{ orders?: any[]; data?: any[] }>;
    },
    staleTime: 60_000,
  });

  const orderOptions: TNAOrderOption[] = (ordersData?.orders ?? ordersData?.data ?? []).map((order) => {
    const status: TNAOrderOption["status"] = order.approvalPending
      ? "at-risk"
      : order.pfhStatus && order.pfhStatus !== "approved"
        ? "delayed"
        : "on-track";
    return {
      id: order.id,
      refNo: order.refNo ?? order.ref_no ?? order.id,
      buyer: order.buyer ?? "Unknown buyer",
      product: order.styleName ?? order.styleId ?? "Untitled style",
      status,
    };
  });

  useEffect(() => {
    if (orderOptions.length === 0) return;
    const requested = orderOptions.find((order) => order.id === orderFromUrl || order.refNo === orderFromUrl);
    const selectedExists = orderOptions.some((order) => order.id === selectedOrder);
    if (!selectedOrder || !selectedExists) {
      setSelectedOrder((requested ?? orderOptions[0]).id);
    }
  }, [orderFromUrl, orderOptions, selectedOrder]);

  const selectedOrderInfo = orderOptions.find((o) => o.id === selectedOrder);

  const { data: orderData, isLoading: isLoadingOrder } = useQuery({
    queryKey: ["orders", selectedOrder],
    queryFn: async () => {
      const res = await fetch(`/api/orders/${selectedOrder}`);
      if (!res.ok) throw new Error("Failed to fetch order");
      return res.json();
    },
    enabled: Boolean(selectedOrder) && orderOptions.some((order) => order.id === selectedOrder),
  });

  const realOrder = orderData?.order;

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">
      {/* ── Page Header ────────────────────────────────── */}
      <motion.div
        className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Order & TNA Tracker</h1>
          <p className="text-muted-foreground text-sm">Timeline visualization of merchandising stages.</p>
        </div>
        <div className="flex items-center gap-2">
          <ExportButton data={exportData} filename="tna-report" label="Export Report" />
        </div>
      </motion.div>

      {/* ── KPI Row ────────────────────────────────────── */}
      <TNAKpiCards />

      {/* ── Analytics Row ──────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <TNAStageDistribution />
        </div>
        <div className="lg:col-span-4">
          <TNAProgressOverview />
        </div>
        <div className="lg:col-span-5">
          <TNADurationHeatmap />
        </div>
      </div>

      {/* ── Order Selector + View Toggle ───────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="shrink-0 font-medium text-muted-foreground text-sm">Order TNA:</span>
          <Select value={selectedOrder} onValueChange={setSelectedOrder} disabled={isLoadingOrders || orderOptions.length === 0}>
            <SelectTrigger className="h-9 w-[300px] text-sm">
              <SelectValue placeholder={isLoadingOrders ? "Loading orders..." : "Select order"} />
            </SelectTrigger>
            <SelectContent>
              {orderOptions.map((o) => (
                <SelectItem key={o.id} value={o.id}>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">{o.refNo}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-xs">{o.buyer}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="max-w-[140px] truncate text-xs">{o.product}</span>
                    <Badge variant="outline" className={`ml-1 px-1.5 py-0 text-[9px] ${statusClass[o.status]}`}>
                      {o.status}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedOrderInfo && (
            <Badge variant="outline" className={`text-xs ${statusClass[selectedOrderInfo.status]}`}>
              {selectedOrderInfo.status}
            </Badge>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-surface-2/60 p-1">
          {(["pipeline", "gantt"] as const).map((view) => (
            <motion.button
              key={view}
              onClick={() => setActiveView(view)}
              className={`relative rounded-md px-4 py-1.5 font-medium text-xs transition-colors ${
                activeView === view ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeView === view && (
                <motion.div
                  layoutId="view-pill"
                  className="absolute inset-0 rounded-md border border-border/50 bg-background shadow-xs"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative capitalize">{view === "pipeline" ? "Stage Pipeline" : "Gantt Chart"}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Stage Pipeline View ────────────────────────── */}
      {activeView === "pipeline" && (
        <motion.div
          key="pipeline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="rounded-2xl border-border/50 shadow-xs bg-background/60 backdrop-blur-12px">
            <CardHeader className="border-b pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-semibold text-base">Stage Pipeline</CardTitle>
                  <p className="mt-0.5 text-muted-foreground text-xs">
                    {selectedOrderInfo?.buyer} — {selectedOrderInfo?.product}
                  </p>
                </div>
                <Badge variant="outline" className="font-mono text-xs">
                  {selectedOrderInfo?.refNo ?? selectedOrder}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {isLoadingOrder ? (
                <div className="flex h-64 items-center justify-center text-muted-foreground text-sm">
                  Loading timeline...
                </div>
              ) : realOrder ? (
                <TNAStagePipeline order={realOrder} />
              ) : (
                <div className="flex h-64 items-center justify-center text-muted-foreground text-sm">
                  Order details not available
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* ── Gantt Chart View ───────────────────────────── */}
      {activeView === "gantt" && (
        <motion.div
          key="gantt"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden rounded-2xl border-border/50 shadow-xs bg-background/60 backdrop-blur-12px">
            <CardHeader className="border-b bg-surface-2/50 pb-4">
              <CardTitle className="font-semibold text-base tracking-tight">Gantt Timeline</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col p-0 lg:flex-row">
              {/* Left: tasks list */}
              <div className="z-10 shrink-0 border-border/50 border-r bg-background lg:w-[380px]">
                <Table>
                  <TableHeader>
                    <TableRow className="h-11 border-b-border/50 bg-surface-2 hover:bg-surface-2">
                      <TableHead className="w-[190px] font-semibold text-[11px] text-muted-foreground">TASK</TableHead>
                      <TableHead className="font-semibold text-[11px] text-muted-foreground">DUR</TableHead>
                      <TableHead className="font-semibold text-[11px] text-muted-foreground">START</TableHead>
                      <TableHead className="font-semibold text-[11px] text-muted-foreground">END</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tnaData.map((item) => (
                      <TableRow
                        key={item.id}
                        className={`h-11 border-b-border/50 transition-colors ${item.isGroup ? "bg-muted/10" : "cursor-pointer hover:bg-muted/5"}`}
                        onMouseEnter={() => setActiveTask(item.id)}
                        onMouseLeave={() => setActiveTask(null)}
                      >
                        <TableCell className="py-0">
                          {item.isGroup ? (
                            <span className="font-bold text-xs uppercase tracking-wider">{item.task}</span>
                          ) : (
                            <span
                              className={`pl-4 font-medium text-xs transition-colors ${activeTask === item.id ? "text-primary" : "text-muted-foreground"}`}
                            >
                              {item.task}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="py-0 text-muted-foreground text-xs tabular-nums">
                          {!item.isGroup && `${item.duration}d`}
                        </TableCell>
                        <TableCell className="py-0 text-muted-foreground text-xs tabular-nums">
                          {!item.isGroup && item.start}
                        </TableCell>
                        <TableCell className="py-0 text-muted-foreground text-xs tabular-nums">
                          {!item.isGroup && item.end}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Right: gantt bars */}
              <div className="relative min-w-[500px] flex-1 overflow-x-auto bg-surface-1/30">
                <div className="flex h-full min-w-max flex-col">
                  <div className="flex h-11 border-border/50 border-b bg-surface-2">
                    {gridWeeks.map((date, i) => (
                      <div
                        key={i}
                        className="flex flex-1 items-center justify-center border-border/50 border-r text-center font-semibold text-[10px] text-muted-foreground uppercase"
                      >
                        {format(date, "MMM d")}
                      </div>
                    ))}
                  </div>
                  <div
                    className="relative w-full flex-1"
                    style={{
                      backgroundImage: "linear-gradient(to right, hsl(var(--border) / 0.4) 1px, transparent 1px)",
                      backgroundSize: `${100 / (gridWeeks.length || 1)}% 100%`,
                    }}
                  >
                    <TooltipProvider delayDuration={150}>
                      {tnaData.map((item) => {
                        if (item.isGroup)
                          return <div key={item.id} className="h-11 w-full border-border/50 border-b bg-muted/5" />;
                        const startDate = parse(item.start, "MM/dd/yy", new Date());
                        const endDate = parse(item.end, "MM/dd/yy", new Date());
                        const leftPct = (differenceInDays(startDate, timelineStart) / totalDays) * 100;
                        const widthPct = (differenceInDays(endDate, startDate) / totalDays) * 100;
                        return (
                          <div
                            key={item.id}
                            className={`relative flex h-11 w-full items-center border-border/50 border-b transition-colors ${activeTask === item.id ? "bg-primary/5" : ""}`}
                          >
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <motion.div
                                  className={`absolute h-6 cursor-pointer rounded-md shadow-sm ${item.color} ${activeTask === item.id ? "opacity-100 ring-2 ring-primary ring-offset-1 ring-offset-background" : "opacity-80"}`}
                                  style={{ left: `${Math.max(0, leftPct)}%`, width: `${Math.max(2, widthPct)}%` }}
                                  onMouseEnter={() => setActiveTask(item.id)}
                                  onMouseLeave={() => setActiveTask(null)}
                                  initial={{ scaleX: 0, originX: 0 }}
                                  animate={{ scaleX: 1 }}
                                  transition={{ duration: 0.5, ease: "easeOut" }}
                                  whileHover={{ scaleY: 1.15 }}
                                />
                              </TooltipTrigger>
                              <TooltipContent className="rounded-xl border-border/50 bg-surface-2 p-3 shadow-xl">
                                <div className="flex flex-col gap-1.5">
                                  <span className="font-bold text-sm">{item.task}</span>
                                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                                    <Badge variant="outline" className="text-[10px]">
                                      {item.stage}
                                    </Badge>
                                    <span>{item.duration} days</span>
                                  </div>
                                  <span className="text-[11px] text-muted-foreground">
                                    {format(startDate, "MMM do")} – {format(endDate, "MMM do, yyyy")}
                                  </span>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        );
                      })}
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

export default function TNATrackerPage() {
  return (
    <Suspense
      fallback={<div className="flex h-64 items-center justify-center text-muted-foreground text-sm">Loading…</div>}
    >
      <TNATrackerContent />
    </Suspense>
  );
}
