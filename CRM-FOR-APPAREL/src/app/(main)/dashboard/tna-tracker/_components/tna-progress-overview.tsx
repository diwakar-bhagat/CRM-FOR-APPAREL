"use client";

import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stages = [
  { name: "Initiation", progress: 100, status: "completed" },
  { name: "Planning", progress: 75, status: "on-track" },
  { name: "Execution", progress: 40, status: "at-risk" },
  { name: "Evaluation", progress: 0, status: "pending" },
];

const statusColors: Record<string, string> = {
  completed: "hsl(var(--status-completed))",
  "on-track": "hsl(var(--status-on-track))",
  "at-risk": "hsl(var(--status-at-risk))",
  delayed: "hsl(var(--status-delayed))",
  pending: "hsl(var(--foreground-subtle))",
};

const statusStyles: Record<string, { dot: string; text: string }> = {
  completed: { dot: "bg-status-on-track", text: "text-muted-foreground" },
  "on-track": { dot: "bg-status-on-track", text: "text-status-on-track" },
  "at-risk": { dot: "bg-status-at-risk", text: "text-status-at-risk" },
  delayed: { dot: "bg-status-delayed", text: "text-status-delayed" },
  pending: { dot: "bg-surface-3", text: "text-muted-foreground" },
};

export function TNAProgressOverview() {
  const overall = Math.round(stages.reduce((s, st) => s + st.progress, 0) / stages.length);

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium text-sm">Overall Progress</CardTitle>
        <span className="font-semibold text-xl tabular-nums">{overall}%</span>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Overall bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${overall}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        {/* Per-stage breakdown */}
        <div className="space-y-2.5 pt-1">
          {stages.map((stage, i) => (
            <div key={stage.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full" style={{ background: statusColors[stage.status] }} />
                  <span className="font-medium text-xs">{stage.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`size-1 rounded-full ${statusStyles[stage.status].dot}`} />
                    <span className={`font-medium text-[10px] ${statusStyles[stage.status].text}`}>
                      {stage.status === "on-track"
                        ? "On Track"
                        : stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
                    </span>
                  </div>
                  <span className="w-8 text-right text-muted-foreground text-xs tabular-nums">{stage.progress}%</span>
                </div>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: statusColors[stage.status] }}
                  initial={{ width: 0 }}
                  animate={{ width: `${stage.progress}%` }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
