"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const alerts = [
  {
    id: 1,
    title: "Fabric Approval Delayed",
    order: "PO-2023-089",
    status: "delayed",
    time: "2 hours ago",
    icon: AlertCircle,
  },
  {
    id: 2,
    title: "Lab Dip Submitted",
    order: "PO-2023-092",
    status: "on-track",
    time: "5 hours ago",
    icon: CheckCircle2,
  },
  {
    id: 3,
    title: "Fit Sample pending buyer review",
    order: "PO-2023-085",
    status: "at-risk",
    time: "1 day ago",
    icon: Clock,
  },
  {
    id: 4,
    title: "Bulk Fabric In-house",
    order: "PO-2023-078",
    status: "completed",
    time: "2 days ago",
    icon: CheckCircle2,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "delayed":
      return "bg-status-delayed/10 text-status-delayed border-status-delayed/20";
    case "at-risk":
      return "bg-status-at-risk/10 text-status-at-risk border-status-at-risk/20";
    case "completed":
      return "bg-status-completed/10 text-status-completed border-status-completed/20";
    case "on-track":
      return "bg-status-on-track/10 text-status-on-track border-status-on-track/20";
    default:
      return "bg-surface-2 text-foreground-subtle border-border";
  }
};

export function AlertsPanel() {
  return (
    <Card className="h-full border-border/50 bg-surface-1/50 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="font-medium text-foreground text-lg">Action Needed</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-6 pb-6">
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 24 }}
                className="flex cursor-pointer flex-col space-y-2 rounded-lg border border-border/50 bg-background/50 p-3 transition-colors hover:bg-surface-2/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium text-foreground text-sm leading-tight">{alert.title}</span>
                  <Badge
                    variant="outline"
                    className={`rounded-sm px-1.5 py-0 font-semibold text-[10px] uppercase tracking-wider ${getStatusColor(alert.status)}`}
                  >
                    {alert.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-foreground-subtle text-xs">
                  <span className="font-mono">{alert.order}</span>
                  <span>{alert.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
