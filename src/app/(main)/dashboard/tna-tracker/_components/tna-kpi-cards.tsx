"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Clock, Package } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const kpis = [
  { label: "Total Tasks", value: 6, icon: Package, status: "default", delta: null },
  {
    label: "On Track",
    value: 3,
    icon: CheckCircle2,
    status: "on-track",
    delta: { value: 2, direction: "up" as const },
  },
  { label: "At Risk", value: 1, icon: Clock, status: "at-risk", delta: { value: 1, direction: "up" as const } },
  { label: "Delayed", value: 2, icon: AlertTriangle, status: "delayed", delta: { value: 1, direction: "up" as const } },
];

const statusColors: Record<string, string> = {
  default: "var(--primary)",
  "on-track": "hsl(var(--status-on-track))",
  "at-risk": "hsl(var(--status-at-risk))",
  delayed: "hsl(var(--status-delayed))",
};

const statusBg: Record<string, string> = {
  default: "bg-primary/10",
  "on-track": "bg-status-on-track/10",
  "at-risk": "bg-status-at-risk/10",
  delayed: "bg-status-delayed/10",
};

export function TNAKpiCards() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {kpis.map((kpi, i) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.08 }}
          whileHover={{ y: -2, boxShadow: "0 8px 24px hsl(0 0% 0% / 0.10)" }}
        >
          <Card className="relative overflow-hidden border-border/50 bg-background/60 backdrop-blur-12px">
            <motion.div
              className="absolute top-0 left-0 h-full w-[3px]"
              style={{ background: statusColors[kpi.status] }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            />
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium text-[11px] text-muted-foreground uppercase tracking-widest">
                  {kpi.label}
                </span>
                <div className={`rounded-md p-1.5 ${statusBg[kpi.status]}`}>
                  <kpi.icon className="size-3.5 text-muted-foreground" />
                </div>
              </div>
              <div className="flex items-end gap-2">
                <span className="font-semibold text-2xl tabular-nums tracking-tight">{kpi.value}</span>
                {kpi.delta && (
                  <Badge variant="secondary" className="mb-0.5 text-[10px]">
                    {kpi.delta.direction === "up" ? "↑" : "↓"} {kpi.delta.value}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
