"use client";

import { Activity, AlertTriangle, BarChart, CheckCircle2, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface VendorPerformanceModalProps {
  vendorName: string;
  children: React.ReactNode;
}

export function VendorPerformanceModal({ vendorName, children }: VendorPerformanceModalProps) {
  // Mock data for the modal
  const metrics = [
    { label: "On-Time Delivery", value: "94%", icon: CheckCircle2, dotColor: "bg-status-on-track" },
    { label: "Active Orders", value: "12", icon: Package, dotColor: "bg-primary" },
    { label: "Defect Rate", value: "1.2%", icon: AlertTriangle, dotColor: "bg-status-at-risk" },
    { label: "Avg. Delay", value: "1.4 days", icon: Activity, dotColor: "bg-status-delayed" },
  ];

  const stagePerformance = [
    { stage: "Sampling", score: 98 },
    { stage: "Approval", score: 85 },
    { stage: "Production", score: 92 },
    { stage: "Shipment", score: 95 },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="border-border/50 bg-background/95 backdrop-blur-xl sm:max-w-[500px]">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="font-semibold text-xl tracking-tight">{vendorName}</DialogTitle>
              <DialogDescription className="mt-1.5 text-sm">
                Vendor Performance Analytics & Reliability Index
              </DialogDescription>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-white/5 px-2.5 py-1 font-medium text-muted-foreground text-xs">
              <div className="size-1.5 rounded-full bg-primary" />
              Tier 1 Vendor
            </div>
          </div>
        </DialogHeader>

        <Separator className="-mx-6 w-[calc(100%+48px)] opacity-50" />

        <div className="space-y-6 py-4">
          {/* Top KPIs */}
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="flex flex-col gap-2 rounded-xl border border-white/5 bg-surface-1 p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
                    <m.icon className="size-3.5 opacity-70" />
                    {m.label}
                  </div>
                  <div className={`size-1.5 rounded-full ${m.dotColor}`} />
                </div>
                <p className="font-semibold text-xl tracking-tight">{m.value}</p>
              </div>
            ))}
          </div>

          {/* Stage Reliability */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 font-medium text-sm">
              <BarChart className="size-4 text-muted-foreground" />
              Stage Reliability Scores
            </h4>
            <div className="space-y-3">
              {stagePerformance.map((stage) => (
                <div key={stage.stage} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-muted-foreground">{stage.stage}</span>
                    <span className="font-medium tabular-nums">{stage.score}%</span>
                  </div>
                  <Progress
                    value={stage.score}
                    className="h-2 bg-surface-2"
                    indicatorClassName={stage.score > 90 ? "bg-status-on-track" : "bg-status-at-risk"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="-mx-6 mb-4 w-[calc(100%+48px)] opacity-50" />

        <div className="flex justify-end gap-2">
          <Button variant="outline">Message Vendor</Button>
          <Button>Full Profile</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
