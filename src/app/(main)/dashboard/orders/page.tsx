"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Clock3,
  Filter,
  LayoutGrid,
  List,
  MoreHorizontal,
  Package2,
  Plus,
  Search,
} from "lucide-react";

import { ExportButton } from "@/components/dashboard/export-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateOrderModal } from "@/components/orders/create-order-modal";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "@/lib/utils";

// --- Types & Data ---

type OrderStatus = "on-track" | "at-risk" | "delayed" | "completed";

interface Order {
  id: string;
  refNo?: string;
  buyer: string;
  product: string;
  stage: string;
  daysLeft: number;
  progress: number;
  status: OrderStatus;
  vendor: string;
  quantity: number;
  amountValue?: number;
  amount: string;
  imageUrl?: string;
}

interface InventoryItem {
  sku: string;
  name: string;
  inStock: number;
  reserved: number;
  sellThrough: string;
  reorderInDays: number;
  status: "healthy" | "watch" | "low";
}

interface ActivityEvent {
  id: string;
  title: string;
  time: string;
  meta: string;
}

const orders: Order[] = [
  {
    id: "ORD-2847",
    buyer: "Zara UK",
    product: "Linen Overshirt SS25",
    stage: "Sampling",
    daysLeft: -4,
    progress: 22,
    status: "delayed",
    vendor: "Apex Fabrics Ltd",
    quantity: 4800,
    amount: formatCurrency(8_24_000, { noDecimals: true }),
  },
  {
    id: "ORD-2901",
    buyer: "H&M EU",
    product: "Jersey Polo 3-Pack",
    stage: "Production",
    daysLeft: 2,
    progress: 61,
    status: "at-risk",
    vendor: "Sunrise Knits",
    quantity: 12000,
    amount: formatCurrency(18_45_000, { noDecimals: true }),
  },
  {
    id: "ORD-2799",
    buyer: "ASOS",
    product: "Relaxed Denim Jacket AW25",
    stage: "Approval",
    daysLeft: -6,
    progress: 41,
    status: "delayed",
    vendor: "Blue Stitch Co.",
    quantity: 2400,
    amount: formatCurrency(6_40_000, { noDecimals: true }),
  },
  {
    id: "ORD-2923",
    buyer: "Primark",
    product: "Organic Cotton Tee 6-Pack",
    stage: "Production",
    daysLeft: 14,
    progress: 55,
    status: "on-track",
    vendor: "Green Thread Ltd.",
    quantity: 48000,
    amount: formatCurrency(32_50_000, { noDecimals: true }),
  },
  {
    id: "ORD-2811",
    buyer: "River Island",
    product: "Faux Leather Biker Jacket",
    stage: "Sampling",
    daysLeft: 8,
    progress: 18,
    status: "on-track",
    vendor: "LuxFab Industries",
    quantity: 1800,
    amount: formatCurrency(12_40_000, { noDecimals: true }),
  },
  {
    id: "ORD-2958",
    buyer: "Urban Outfitters",
    product: "Cargo Parachute Trouser",
    stage: "Production",
    daysLeft: 1,
    progress: 70,
    status: "at-risk",
    vendor: "Fast Track Garments",
    quantity: 5400,
    amount: formatCurrency(14_10_000, { noDecimals: true }),
  },
];

const inventoryItems: InventoryItem[] = [
  {
    sku: "SKU-8812",
    name: "Cotton Tee Core",
    inStock: 12400,
    reserved: 3200,
    sellThrough: "72%",
    reorderInDays: 14,
    status: "healthy",
  },
  {
    sku: "SKU-9921",
    name: "Linen Overshirt",
    inStock: 1800,
    reserved: 1100,
    sellThrough: "64%",
    reorderInDays: 5,
    status: "watch",
  },
  {
    sku: "SKU-4438",
    name: "Cargo Trouser AW",
    inStock: 620,
    reserved: 460,
    sellThrough: "81%",
    reorderInDays: 2,
    status: "low",
  },
  {
    sku: "SKU-5530",
    name: "Denim Jacket Relaxed",
    inStock: 3900,
    reserved: 720,
    sellThrough: "58%",
    reorderInDays: 21,
    status: "healthy",
  },
];

const activityEvents: ActivityEvent[] = [
  { id: "evt-1", title: "Vendor confirmed cut date", time: "8m ago", meta: "ORD-2901 • Sunrise Knits" },
  { id: "evt-2", title: "Inventory threshold reached", time: "23m ago", meta: "SKU-4438 • Reorder suggested" },
  { id: "evt-3", title: "PO approved by buying team", time: "1h ago", meta: "ORD-2923 • Primark" },
  { id: "evt-4", title: "Delay risk automatically flagged", time: "2h ago", meta: "ORD-2847 • Sampling" },
];

const statusStyles: Record<OrderStatus, { dot: string; text: string }> = {
  "on-track": { dot: "bg-status-on-track", text: "text-muted-foreground" },
  "at-risk": { dot: "bg-status-at-risk", text: "text-status-at-risk" },
  delayed: { dot: "bg-status-delayed", text: "text-status-delayed" },
  completed: { dot: "bg-status-on-track", text: "text-muted-foreground" },
};

// --- Animations ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

// --- Premium Components ---

function MetricCard({
  label,
  value,
  change,
  trend,
}: {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-5 shadow-sm transition-colors hover:bg-muted/20"
    >
      <p className="font-medium text-[11px] text-muted-foreground uppercase tracking-widest">{label}</p>
      <div className="mt-3 flex items-end justify-between">
        <h3 className="font-semibold text-3xl text-foreground tracking-tight">{value}</h3>
        <div className="mb-1 flex items-center gap-1.5">
          <span className={`size-1.5 rounded-full ${trend === "up" ? "bg-status-on-track" : "bg-status-at-risk"}`} />
          <span className="font-medium text-[11px] text-muted-foreground">{change}</span>
        </div>
      </div>
    </motion.div>
  );
}

function GridOrderCard({ order }: { order: Order }) {
  const router = useRouter();
  const isDelayed = order.status === "delayed";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      onClick={() => router.push(`/dashboard/tna-tracker?order=${order.id}`)}
      className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border bg-card p-5 transition-colors ${isDelayed ? "border-status-delayed/30" : "border-border/50"} hover:bg-muted/20`}
    >
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-border/40 bg-surface-2/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
              {order.refNo ?? order.id}
            </span>
            <div className="flex items-center gap-1.5 rounded-full border border-white/5 bg-surface-2/30 px-2 py-0.5">
              <span className={`size-1.5 rounded-full ${statusStyles[order.status].dot}`} />
              <span className={`font-semibold text-[10px] uppercase tracking-wider ${statusStyles[order.status].text}`}>
                {order.status}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="-mt-2 -mr-2 size-6 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </div>

        {order.imageUrl && (
          <div className="mt-4 w-full h-32 rounded-xl overflow-hidden border border-border/40">
            <img src={order.imageUrl} alt={order.product} className="w-full h-full object-cover" />
          </div>
        )}

        <h4 className="mt-4 font-bold text-base text-foreground tracking-tight transition-colors group-hover:text-primary">
          {order.product}
        </h4>
        <div className="mt-1 flex items-center gap-2">
          <p className="font-medium text-[12px] text-muted-foreground">{order.buyer}</p>
          <span className="size-1 rounded-full bg-border/40" />
          <p className="text-[12px] text-muted-foreground/60">{order.vendor}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">{order.stage}</span>
            <span className="mt-0.5 font-bold text-lg tabular-nums">{order.progress}%</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Deadline</span>
            <span
              className={`mt-0.5 font-bold text-[13px] ${order.daysLeft < 0 ? "text-status-delayed" : "text-foreground"}`}
            >
              {order.daysLeft < 0 ? `${Math.abs(order.daysLeft)}d Overdue` : `${order.daysLeft}d`}
            </span>
          </div>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full border border-border/40 bg-muted/40">
          <motion.div
            className={`h-full rounded-full ${statusStyles[order.status].dot}`}
            initial={{ width: 0 }}
            animate={{ width: `${order.progress}%` }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function ListOrderRow({ order }: { order: Order }) {
  const router = useRouter();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ backgroundColor: "rgba(125,125,125,0.08)" }}
      onClick={() => router.push(`/dashboard/tna-tracker?order=${order.id}`)}
      className="group flex cursor-pointer items-center gap-4 border-border/40 border-b px-6 py-4 transition-colors"
    >
      <div className="w-[120px] shrink-0">
        <span className="rounded-full border border-border/40 bg-surface-2/50 px-2 py-0.5 font-bold font-mono text-[10px] text-muted-foreground">
          {order.refNo ?? order.id}
        </span>
      </div>

      <div className="min-w-0 flex-1 flex items-center gap-3">
        {order.imageUrl && (
          <img src={order.imageUrl} alt={order.product} className="size-8 rounded-md object-cover border border-border/50 shrink-0" />
        )}
        <div className="flex flex-col overflow-hidden">
          <h4 className="truncate font-bold text-foreground text-sm tracking-tight transition-colors group-hover:text-primary">
            {order.product}
          </h4>
          <p className="truncate font-medium text-[12px] text-muted-foreground/60">{order.buyer}</p>
        </div>
      </div>

      <div className="hidden w-[140px] shrink-0 flex-col md:flex">
        <span className="font-bold text-[12px] text-foreground">{order.vendor}</span>
        <span className="font-medium text-[10px] text-muted-foreground/60">
          {order.quantity.toLocaleString()} units
        </span>
      </div>

      <div className="flex w-[140px] shrink-0 flex-col gap-2">
        <div className="flex items-center justify-between font-bold text-[9px] text-muted-foreground/60 uppercase tracking-widest">
          <span>{order.stage}</span>
          <span className="tabular-nums">{order.progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3/50">
          <motion.div
            className={`h-full rounded-full ${statusStyles[order.status].dot}`}
            initial={{ width: 0 }}
            animate={{ width: `${order.progress}%` }}
            transition={{ duration: 1, delay: 0.1 }}
          />
        </div>
      </div>

      <div className="flex w-[100px] shrink-0 items-center justify-end gap-2">
        <span className={`size-2 rounded-full ${statusStyles[order.status].dot}`} />
        <span className={`font-bold text-[11px] uppercase tracking-wider ${statusStyles[order.status].text}`}>
          {order.status}
        </span>
      </div>

      <div className="flex w-[40px] shrink-0 justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-full opacity-0 transition-all hover:bg-primary/10 hover:text-primary group-hover:opacity-100"
        >
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </motion.div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={`sk-${idx}`} className="rounded-2xl border border-border/50 bg-card p-5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-4 h-7 w-20" />
          <Skeleton className="mt-4 h-2 w-full" />
        </div>
      ))}
    </div>
  );
}

function SectionCard({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/50 bg-card shadow-sm">
      <div className="flex items-center justify-between border-border/40 border-b px-5 py-4">
        <h3 className="font-medium text-foreground text-sm tracking-tight">{title}</h3>
        <span className="text-muted-foreground">{icon}</span>
      </div>
      {children}
    </div>
  );
}

export default function OrdersPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");

  const { data: backendOrders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const json = await res.json();
      return json.orders.map((o: any) => ({
        id: o.id,
        refNo: o.refNo ?? o.ref_no,
        buyer: o.buyer,
        product: o.style_name || o.style_id,
        stage: o.fabricStatus === "INHOUSE" || o.trimStatus === "INHOUSE" ? "Production" : "Sourcing",
        daysLeft: o.deliveryDate ? Math.ceil((new Date(o.deliveryDate).getTime() - Date.now()) / 86_400_000) : 0,
        progress: Number(o.productionQty ?? 0) > 0 && Number(o.orderQty ?? 0) > 0 ? Math.min(100, Math.round((Number(o.productionQty) / Number(o.orderQty)) * 100)) : 0,
        status: o.approvalPending ? "at-risk" : o.deliveryDate && new Date(o.deliveryDate) < new Date() ? "delayed" : "on-track",
        vendor: o.fabricSupplier || o.brand || "N/A",
        quantity: o.order_qty,
        amountValue: Number(o.revenueValue ?? o.revenue_value ?? 0),
        amount: formatCurrency(Number(o.revenueValue ?? o.revenue_value ?? 0), { noDecimals: true }),
        imageUrl: o.image_url
      })) as Order[];
    }
  });

  const filteredOrders = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const sourceOrders = backendOrders;
    if (!needle) return sourceOrders;
    return sourceOrders.filter((order) =>
      [order.refNo ?? order.id, order.buyer, order.product, order.vendor, order.stage].some((value) =>
        value.toLowerCase().includes(needle),
      ),
    );
  }, [query, backendOrders]);

  return (
    <motion.div
      className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 pb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Premium Header */}
      <div className="flex flex-col gap-6 pt-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <motion.h1 variants={itemVariants} className="font-semibold text-4xl text-foreground tracking-tight">
            Production Intel
          </motion.h1>
          <motion.p variants={itemVariants} className="max-w-xl font-medium text-muted-foreground text-sm opacity-80">
            Real-time telemetry and status overview of all active manufacturing pipelines across your vendor network.
          </motion.p>
        </div>
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <ExportButton data={filteredOrders} filename="Production_Intel_Report" />
          <CreateOrderModal />
        </motion.div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Active Revenue" value={formatCurrency(filteredOrders.reduce((sum, order) => sum + Number(order.amountValue || 0), 0), { noDecimals: true })} change="Excel import" trend="up" />
        <MetricCard label="Units in Prod" value={filteredOrders.reduce((sum, order) => sum + Number(order.quantity || 0), 0).toLocaleString("en-IN")} change="Live DB" trend="up" />
        <MetricCard label="At Risk Orders" value={filteredOrders.filter((order) => order.status === "at-risk" || order.status === "delayed").length.toString()} change="Dynamic" trend="down" />
        <MetricCard label="Buyers" value={new Set(filteredOrders.map((order) => order.buyer)).size.toString()} change="Live DB" trend="up" />
      </div>

      {/* Controls Row */}
      <motion.div
        variants={itemVariants}
        className="sticky top-0 z-10 flex flex-col items-center justify-between gap-4 border-border/60 border-b bg-background py-4 sm:flex-row"
      >
        {/* View Toggle */}
        <div className="flex items-center rounded-lg border border-border/50 bg-muted/30 p-1">
          <button
            type="button"
            onClick={() => setView("grid")}
            className={`relative flex items-center gap-2 rounded-md px-3 py-1.5 font-medium text-xs transition-colors ${view === "grid" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {view === "grid" && (
              <motion.div
                layoutId="view-indicator"
                className="absolute inset-0 rounded-md border border-border/60 bg-card shadow-xs"
                transition={{ duration: 0.16, ease: "easeOut" }}
              />
            )}
            <LayoutGrid className="relative z-10 size-3.5" />
            <span className="relative z-10">Kanban</span>
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            className={`relative flex items-center gap-2 rounded-md px-3 py-1.5 font-medium text-xs transition-colors ${view === "list" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {view === "list" && (
              <motion.div
                layoutId="view-indicator"
                className="absolute inset-0 rounded-md border border-border/60 bg-card shadow-xs"
                transition={{ duration: 0.16, ease: "easeOut" }}
              />
            )}
            <List className="relative z-10 size-3.5" />
            <span className="relative z-10">List</span>
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search pipelines..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-9 rounded-lg border-border/50 bg-background pl-9 text-xs placeholder:text-muted-foreground/60"
            />
          </div>
          <Button
            variant="outline"
            className="h-9 w-9 shrink-0 rounded-lg border-border/50 bg-background p-0 hover:bg-muted/30"
          >
            <Filter className="size-3.5 opacity-70" />
          </Button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <motion.div variants={itemVariants} className="min-h-[500px]">
        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <AnimatePresence mode="wait">
            {view === "grid" ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {filteredOrders.map((order) => (
                  <GridOrderCard key={order.id} order={order} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card"
              >
                <div className="flex items-center gap-4 border-border/40 border-b bg-surface-2/30 px-5 py-3 font-semibold text-[10px] text-muted-foreground uppercase tracking-widest">
                  <div className="w-[120px]">Order ID</div>
                  <div className="flex-1">Product & Buyer</div>
                  <div className="hidden w-[140px] md:block">Vendor & Vol</div>
                  <div className="w-[120px]">Progress</div>
                  <div className="w-[100px] text-right">Status</div>
                  <div className="w-[40px]" />
                </div>
                <div className="flex flex-col">
                  {filteredOrders.map((order) => (
                    <ListOrderRow key={order.id} order={order} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SectionCard title="Inventory Analytics" icon={<BarChart3 className="size-4" />}>
          <div className="space-y-4 px-5 py-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-border/40 bg-muted/20 p-3">
                <p className="text-[11px] text-muted-foreground">Sell-through</p>
                <p className="mt-2 font-semibold text-lg">69.4%</p>
              </div>
              <div className="rounded-xl border border-border/40 bg-muted/20 p-3">
                <p className="text-[11px] text-muted-foreground">Fill-rate</p>
                <p className="mt-2 font-semibold text-lg">96.1%</p>
              </div>
              <div className="rounded-xl border border-border/40 bg-muted/20 p-3">
                <p className="text-[11px] text-muted-foreground">Stock turns</p>
                <p className="mt-2 font-semibold text-lg">5.2x</p>
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted/40">
              <motion.div
                className="h-full rounded-full bg-primary/70"
                initial={{ width: 0 }}
                whileInView={{ width: "69%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Recent Activity" icon={<Clock3 className="size-4" />}>
          <div className="px-5 py-3">
            {activityEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: idx * 0.04 }}
                className="flex items-start gap-3 border-border/30 border-b py-3 last:border-b-0"
              >
                <span className="mt-1 size-1.5 rounded-full bg-foreground/50" />
                <div>
                  <p className="font-medium text-[13px]">{event.title}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{event.meta}</p>
                </div>
                <span className="ml-auto text-[11px] text-muted-foreground">{event.time}</span>
              </motion.div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="System Snapshot" icon={<Package2 className="size-4" />}>
          <div className="space-y-4 px-5 py-4">
            <div className="space-y-2">
              <div className="flex justify-between text-[12px]">
                <span className="text-muted-foreground">PO throughput</span>
                <span className="font-medium">+8.2%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted/40">
                <div className="h-full w-[74%] rounded-full bg-foreground/70" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[12px]">
                <span className="text-muted-foreground">Risk exposure</span>
                <span className="font-medium">17 orders</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted/40">
                <div className="h-full w-[36%] rounded-full bg-foreground/70" />
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Inventory Table" icon={<Package2 className="size-4" />}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-border/40 border-b bg-muted/20 text-left text-[11px] text-muted-foreground uppercase tracking-wider">
                <th className="px-5 py-3 font-medium">SKU</th>
                <th className="px-5 py-3 font-medium">Item</th>
                <th className="px-5 py-3 font-medium">In Stock</th>
                <th className="px-5 py-3 font-medium">Reserved</th>
                <th className="px-5 py-3 font-medium">Sell-through</th>
                <th className="px-5 py-3 font-medium">Reorder</th>
                <th className="px-5 py-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => (
                <tr key={item.sku} className="border-border/30 border-b text-sm last:border-b-0">
                  <td className="px-5 py-3 font-mono text-muted-foreground">{item.sku}</td>
                  <td className="px-5 py-3 font-medium">{item.name}</td>
                  <td className="px-5 py-3 tabular-nums">{item.inStock.toLocaleString()}</td>
                  <td className="px-5 py-3 tabular-nums text-muted-foreground">{item.reserved.toLocaleString()}</td>
                  <td className="px-5 py-3">{item.sellThrough}</td>
                  <td className="px-5 py-3">{item.reorderInDays}d</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <span
                        className={`size-1.5 rounded-full ${
                          item.status === "healthy"
                            ? "bg-foreground/70"
                            : item.status === "watch"
                              ? "bg-foreground/50"
                              : "bg-status-delayed"
                        }`}
                      />
                      <span className="font-medium text-[11px] text-muted-foreground uppercase">{item.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </motion.div>
  );
}
