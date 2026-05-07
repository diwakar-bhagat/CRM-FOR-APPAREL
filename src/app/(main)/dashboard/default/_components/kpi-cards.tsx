"use client";

import { useEffect, useState } from "react";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { AlertTriangle, CheckCircle2, ClipboardList, Clock, IndianRupee } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// --- Animated counter hook ---
function useAnimatedNumber(target: number, duration = 800) {
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 80, damping: 20, duration });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    motionVal.set(target);
  }, [target, motionVal]);

  useEffect(() => {
    const unsub = springVal.on("change", (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [springVal]);

  return display;
}

// --- Mini sparkline SVG ---
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 64;
  const h = 24;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");

  return (
    <svg width={w} height={h} className="shrink-0">
      <title>Trend sparkline</title>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// --- KPI data ---
interface KPIData {
  label: string;
  value: number;
  displayValue?: string;
  delta: { value: number; direction: "up" | "down"; sentiment: "positive" | "negative" };
  icon: LucideIcon;
  status: "default" | "on-track" | "at-risk" | "delayed";
  sparkline: number[];
  tooltip: string;
}

const kpiData: KPIData[] = [
  {
    label: "Total Revenue",
    value: 0,
    displayValue: "Rs 0",
    delta: { value: 0, direction: "up", sentiment: "positive" },
    icon: IndianRupee,
    status: "default",
    sparkline: [0, 0, 0, 0, 0, 0, 0],
    tooltip: "Revenue calculated from the imported Excel order sheet",
  },
  {
    label: "Total Orders",
    value: 148,
    delta: { value: 12, direction: "up", sentiment: "positive" },
    icon: ClipboardList,
    status: "default",
    sparkline: [120, 125, 130, 128, 135, 142, 148],
    tooltip: "Active purchase orders across all buyers",
  },
  {
    label: "On Track",
    value: 94,
    delta: { value: 8, direction: "down", sentiment: "negative" },
    icon: CheckCircle2,
    status: "on-track",
    sparkline: [102, 100, 98, 96, 95, 93, 94],
    tooltip: "Orders progressing within TNA schedule",
  },
  {
    label: "At Risk",
    value: 31,
    delta: { value: 3, direction: "up", sentiment: "negative" },
    icon: Clock,
    status: "at-risk",
    sparkline: [22, 24, 26, 28, 29, 30, 31],
    tooltip: "Orders approaching deadline with pending milestones",
  },
  {
    label: "Delayed",
    value: 23,
    delta: { value: 5, direction: "up", sentiment: "negative" },
    icon: AlertTriangle,
    status: "delayed",
    sparkline: [14, 16, 17, 19, 20, 21, 23],
    tooltip: "Orders past one or more TNA deadlines",
  },
];

const statusColor: Record<string, string> = {
  default: "hsl(var(--primary))",
  "on-track": "hsl(var(--status-on-track))",
  "at-risk": "hsl(var(--status-at-risk))",
  delayed: "hsl(var(--status-delayed))",
};

const statusBg: Record<string, string> = {
  default: "bg-primary/5",
  "on-track": "bg-status-on-track/5",
  "at-risk": "bg-status-at-risk/5",
  delayed: "bg-status-delayed/5",
};

export function KPICards() {
  const [data, setData] = useState(kpiData);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch("/api/dashboard/home-metrics");
        if (res.ok) {
          const json = await res.json();
          const summary = json.data?.summary;
          if (!summary) return;
          setData((prev) => {
            const newData = [...prev];
            newData[0] = {
              ...newData[0],
              value: Number(summary.totalRevenue ?? 0),
              displayValue: formatCompactCurrency(Number(summary.totalRevenue ?? 0)),
            };
            newData[1] = { ...newData[1], value: Number(summary.totalOrders ?? 0) };
            newData[2] = { ...newData[2], value: Math.max(0, Number(summary.totalOrders ?? 0) - Number(summary.atRiskOrders ?? 0) - Number(summary.delayedOrders ?? 0)) };
            newData[3] = { ...newData[3], value: Number(summary.atRiskOrders ?? 0) + Number(summary.delayedOrders ?? 0) };
            return newData;
          });
        }
      } catch (err) {
        console.error("Failed to fetch dashboard metrics", err);
      }
    }
    void fetchMetrics();
  }, []);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.map((kpi, i) => (
          <KPICard key={kpi.label} kpi={kpi} index={i} />
        ))}
      </div>
    </TooltipProvider>
  );
}

function KPICard({ kpi, index }: { kpi: KPIData; index: number }) {
  const count = useAnimatedNumber(kpi.value);
  const isDelayed = kpi.status === "delayed";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.08 }}
          whileHover={{ y: -3, boxShadow: "0 8px 24px hsl(0 0% 0% / 0.10)" }}
          className="relative"
        >
          <Card
            className={`relative overflow-hidden border-border bg-card shadow-sm ${isDelayed ? "scale-[1.01]" : ""}`}
          >
            {/* Status accent bar */}
            <motion.div
              className="absolute top-0 left-0 h-full w-[3px] rounded-l-md"
              style={{ background: statusColor[kpi.status] }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            />

            {/* Delayed pulsing ring */}
            {isDelayed && (
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-[inherit]"
                style={{ border: `2px solid hsl(var(--status-delayed) / 0.4)` }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}

            <CardContent className="p-4 pl-5">
              <div className="mb-3 flex items-start justify-between">
                <span className="font-medium text-[11px] text-muted-foreground uppercase tracking-[0.06em]">
                  {kpi.label}
                </span>
                <div className={`rounded-lg p-1.5 ${statusBg[kpi.status]}`}>
                  <kpi.icon className="size-4" style={{ color: statusColor[kpi.status] }} />
                </div>
              </div>

              <div className="flex items-end justify-between gap-2">
                <div className="flex flex-col gap-1.5">
                  <span className="font-semibold text-3xl tabular-nums leading-none tracking-tight">
                    {kpi.displayValue ?? count}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`size-1 rounded-full ${kpi.delta.sentiment === "positive" ? "bg-status-on-track" : "bg-status-delayed"}`}
                    />
                    <span
                      className={`font-medium text-[10px] ${kpi.delta.sentiment === "positive" ? "text-status-on-track" : "text-status-delayed"}`}
                    >
                      {kpi.delta.direction === "up" ? "+" : "-"}
                      {kpi.delta.value}%
                    </span>
                  </div>
                </div>
                <Sparkline data={kpi.sparkline} color={statusColor[kpi.status]} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-[200px] text-xs">
        {kpi.tooltip}
      </TooltipContent>
    </Tooltip>
  );
}

function formatCompactCurrency(value: number) {
  if (value >= 10_000_000) return `Rs ${(value / 10_000_000).toFixed(2)}Cr`;
  if (value >= 100_000) return `Rs ${(value / 100_000).toFixed(2)}L`;
  return `Rs ${Math.round(value).toLocaleString("en-IN")}`;
}
