"use client";

import { useState } from "react";

import { formatDistanceToNow, subDays, subHours } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { AlertTriangle, ChevronRight, Clock, Eye, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type AlertType = "missed-deadline" | "vendor-inactive" | "delay-cascade" | "approval-pending";

interface Alert {
  id: string;
  type: AlertType;
  orderId: string;
  buyer: string;
  stage: string;
  message: string;
  createdAt: Date;
}

const now = new Date();

const alertConfig: Record<AlertType, { icon: LucideIcon; dotColor: string }> = {
  "missed-deadline": { icon: XCircle, dotColor: "bg-status-delayed" },
  "vendor-inactive": { icon: Eye, dotColor: "bg-status-at-risk" },
  "delay-cascade": { icon: AlertTriangle, dotColor: "bg-status-at-risk" },
  "approval-pending": { icon: Clock, dotColor: "bg-status-on-track" },
};

const initialAlerts: Alert[] = [
  {
    id: "a1",
    type: "missed-deadline",
    orderId: "ORD-2847",
    buyer: "Zara UK",
    stage: "Sampling",
    message: "Sample submission overdue by 4 days",
    createdAt: subHours(now, 5),
  },
  {
    id: "a2",
    type: "vendor-inactive",
    orderId: "ORD-2901",
    buyer: "H&M EU",
    stage: "Production",
    message: "Vendor Apex Fabrics — 72h no update",
    createdAt: subHours(now, 12),
  },
  {
    id: "a3",
    type: "delay-cascade",
    orderId: "ORD-2799",
    buyer: "ASOS",
    stage: "Approval",
    message: "Approval delay pushing shipment by 6 days",
    createdAt: subDays(now, 1),
  },
  {
    id: "a4",
    type: "approval-pending",
    orderId: "ORD-2834",
    buyer: "Marks & Spencer",
    stage: "Approval",
    message: "Tech pack pending buyer review for 3 days",
    createdAt: subDays(now, 1.5),
  },
  {
    id: "a5",
    type: "missed-deadline",
    orderId: "ORD-2766",
    buyer: "Next PLC",
    stage: "Shipment",
    message: "ETA missed — vessel departed without cargo",
    createdAt: subDays(now, 2),
  },
];

export function AlertsPanel() {
  const [alerts, setAlerts] = useState(initialAlerts);

  const dismiss = (id: string) => setAlerts((prev) => prev.filter((a) => a.id !== id));

  return (
    <Card className="h-full border-border/50 bg-surface-1/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-medium text-base">Alerts</CardTitle>
          <div className="flex items-center gap-2 rounded-full border border-border/40 bg-surface-2 px-2 py-0.5">
            <span className="size-1.5 animate-pulse rounded-full bg-status-delayed" />
            <span className="font-medium text-[10px] text-muted-foreground tabular-nums">{alerts.length} Active</span>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <ScrollArea className="h-[340px]">
          <AnimatePresence mode="popLayout">
            {alerts.map((alert) => {
              const config = alertConfig[alert.type];
              const Icon = config.icon;
              return (
                <motion.div
                  key={alert.id}
                  layout
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, x: 60, height: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] as const }}
                  className="group"
                >
                  <div className="flex cursor-pointer gap-3 p-3 px-4 transition-colors duration-150 hover:bg-surface-2/60">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border/40 bg-surface-2">
                      <Icon className={`size-4 text-muted-foreground/60`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-sm leading-tight">{alert.message}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="font-mono text-[11px] text-muted-foreground">{alert.orderId}</span>
                        <span className="text-[11px] text-muted-foreground">·</span>
                        <span className="text-[11px] text-muted-foreground">{alert.buyer}</span>
                        <span className="text-[11px] text-muted-foreground">·</span>
                        <span className="text-[11px] text-muted-foreground">
                          {formatDistanceToNow(alert.createdAt, { addSuffix: true })}
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <div className={`size-1 rounded-full ${config.dotColor}`} />
                        <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
                          {alert.stage}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6 shrink-0 self-center opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        dismiss(alert.id);
                      }}
                    >
                      <ChevronRight className="size-3.5" />
                    </Button>
                  </div>
                  <Separator className="opacity-50" />
                </motion.div>
              );
            })}
          </AnimatePresence>
          {alerts.length === 0 && (
            <div className="flex h-32 items-center justify-center text-muted-foreground text-sm">
              All clear — no active alerts
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
