"use client";

import { useState } from "react";

import { addDays, differenceInDays, format, subDays } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  Clock,
  FileText,
  MessageSquare,
  Package,
  Scissors,
  Ship,
  Square,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { DerivedSignals, Order } from "@/types/erp";

import { StageProgressRing } from "./stage-progress-ring";

// ─── Types ────────────────────────────────────────────────────────────────────
type StageStatus = "completed" | "active" | "at-risk" | "delayed" | "pending";

interface Subtask {
  id: string;
  label: string;
  done: boolean;
}

interface TNAStage {
  id: string;
  name: string;
  icon: LucideIcon;
  status: StageStatus;
  deadline: Date;
  completionPct: number;
  responsible: string;
  notes?: string;
  subtasks: Subtask[];
}

// ─── Style maps ───────────────────────────────────────────────────────────────
const nodeStyles: Record<StageStatus, string> = {
  completed: "bg-surface-1 text-muted-foreground border border-border/40 shadow-sm",
  active: "bg-surface-1 text-primary border border-border/80 shadow-[0_0_12px_rgba(var(--primary),0.1)]",
  "at-risk": "bg-surface-1 text-status-at-risk border border-border/40 shadow-sm",
  delayed: "bg-surface-1 text-status-delayed border border-border/40 shadow-sm",
  pending: "bg-surface-1 text-muted-foreground/50 border border-border/30",
};

const cardStyles: Record<StageStatus, string> = {
  completed: "border-border/30 bg-surface-1/40",
  active: "border-border/60 bg-surface-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]",
  "at-risk": "border-border/30 bg-surface-1/40",
  delayed: "border-border/30 bg-surface-1/40",
  pending: "border-border/20 bg-transparent opacity-60",
};

const statusColors: Record<StageStatus, { dot: string; text: string }> = {
  completed: { dot: "bg-status-on-track", text: "text-muted-foreground" },
  active: { dot: "bg-primary", text: "text-primary" },
  "at-risk": { dot: "bg-status-at-risk", text: "text-status-at-risk" },
  delayed: { dot: "bg-status-delayed", text: "text-status-delayed" },
  pending: { dot: "bg-surface-3", text: "text-muted-foreground" },
};

// ─── ConnectorTrack ────────────────────────────────────────────────────────────
function ConnectorTrack({ progress, isCascadeRisk }: { progress: number; isCascadeRisk?: boolean }) {
  return (
    <div className="absolute top-10 left-5 z-0 h-[calc(100%-8px)] w-[2px] -translate-x-1/2">
      {/* Track background */}
      <div
        className={`relative h-full w-full overflow-hidden rounded-full ${isCascadeRisk ? "bg-status-at-risk/20" : "bg-border/50"}`}
      >
        {/* Filled portion */}
        <motion.div
          className={`absolute inset-x-0 top-0 rounded-full ${isCascadeRisk ? "bg-status-at-risk" : "bg-primary"}`}
          style={
            isCascadeRisk
              ? {
                  backgroundImage:
                    "repeating-linear-gradient(180deg, hsl(var(--status-at-risk)) 0px, hsl(var(--status-at-risk)) 6px, transparent 6px, transparent 12px)",
                }
              : {}
          }
          initial={{ height: "0%" }}
          animate={{ height: `${progress}%` }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const, delay: 0.4 }}
        />
      </div>
    </div>
  );
}

// ─── NodeCircle ────────────────────────────────────────────────────────────────
function NodeCircle({ stage, index }: { stage: TNAStage; index: number }) {
  const Icon =
    stage.status === "completed"
      ? CheckCircle2
      : stage.status === "delayed"
        ? AlertTriangle
        : stage.status === "at-risk"
          ? Clock
          : stage.icon;

  return (
    <motion.div
      className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full shadow-sm ${nodeStyles[stage.status]}`}
      initial={{ scale: 0.4, opacity: 0 }}
      animate={
        stage.status === "delayed" ? { scale: 1, opacity: 1, x: [0, -3, 3, -3, 3, 0] } : { scale: 1, opacity: 1 }
      }
      transition={
        stage.status === "delayed"
          ? {
              x: { duration: 0.4, delay: 0.6 + index * 0.15 },
              scale: { type: "spring", stiffness: 300, damping: 22, delay: index * 0.15 },
            }
          : { type: "spring", stiffness: 300, damping: 22, delay: index * 0.15 }
      }
    >
      <Icon className="size-4" />
      {/* Pulsing ring for active */}
      {stage.status === "active" && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      )}
    </motion.div>
  );
}

// ─── MetaCell ─────────────────────────────────────────────────────────────────
function MetaCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-[0.07em]">{label}</span>
      <div className="font-medium text-sm">{children}</div>
    </div>
  );
}

// ─── DaysLeftChip ──────────────────────────────────────────────────────────────
function DaysLeftChip({ deadline, status }: { deadline: Date; status: StageStatus }) {
  const now = new Date();
  const days = differenceInDays(deadline, now);
  const isOverdue = days < 0;
  const isUrgent = !isOverdue && days <= 3;
  const style = isOverdue ? statusColors.delayed : isUrgent ? statusColors["at-risk"] : statusColors.completed;

  return (
    <span className={`inline-flex w-full items-center justify-start gap-1.5 font-medium text-xs ${style.text}`}>
      {isOverdue || isUrgent ? (
        <span className="relative flex size-1.5 shrink-0">
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${style.dot}`} />
          <span className={`relative inline-flex size-1.5 rounded-full ${style.dot}`} />
        </span>
      ) : (
        <span className={`relative inline-flex size-1.5 shrink-0 rounded-full ${style.dot}`} />
      )}
      <span>{isOverdue ? `${Math.abs(days)}d overdue` : `${days}d left`}</span>
    </span>
  );
}

// ─── StageCard ─────────────────────────────────────────────────────────────────
function StageCard({ stage, index, isCascadeRisk }: { stage: TNAStage; index: number; isCascadeRisk?: boolean }) {
  const [subtaskOpen, setSubtaskOpen] = useState(false);
  const doneTasks = stage.subtasks.filter((t) => t.done).length;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className={`mb-6 flex-1 overflow-hidden rounded-xl border bg-card shadow-xs ${cardStyles[stage.status]}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.12, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ y: -2, boxShadow: "0 8px 24px hsl(0 0% 0% / 0.08)" }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 p-4 pb-3">
              <div>
                <span className="font-semibold text-[10px] text-muted-foreground uppercase tracking-[0.1em]">
                  Stage 0{index + 1}
                </span>
                <h3 className="mt-0.5 font-semibold text-base">{stage.name}</h3>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className={`size-1.5 rounded-full ${statusColors[stage.status].dot}`} />
                  <span className={`font-medium text-[11px] capitalize ${statusColors[stage.status].text}`}>
                    {stage.status === "at-risk" ? "At Risk" : stage.status}
                  </span>
                </div>
                <StageProgressRing progress={stage.completionPct} status={stage.status} />
              </div>
            </div>

            <Separator />

            {/* Body: 2-col grid of meta cells */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 p-4">
              <MetaCell label="Deadline">{format(stage.deadline, "dd MMM yyyy")}</MetaCell>
              <MetaCell label="Completion">{stage.completionPct}%</MetaCell>
              <MetaCell label="Responsible">
                <span className="text-muted-foreground text-xs">{stage.responsible}</span>
              </MetaCell>
              <MetaCell label="Days Left">
                <DaysLeftChip deadline={stage.deadline} status={stage.status} />
              </MetaCell>
            </div>

            {/* Delay Banner */}
            {stage.status === "delayed" && stage.notes && (
              <div className="mx-4 mb-3 flex items-start gap-2 rounded-lg border border-status-delayed/20 bg-status-delayed/5 p-3">
                <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-status-delayed" />
                <p className="text-status-delayed text-xs leading-relaxed">{stage.notes}</p>
              </div>
            )}

            {/* At-Risk cascade note */}
            {stage.status === "at-risk" && isCascadeRisk && (
              <div className="mx-4 mb-3 flex items-start gap-2 rounded-lg border border-status-at-risk/20 bg-status-at-risk/5 p-3">
                <Clock className="mt-0.5 size-3.5 shrink-0 text-status-at-risk" />
                <p className="text-status-at-risk text-xs leading-relaxed">
                  Upstream delay from Sampling may push this deadline by 4+ days.
                </p>
              </div>
            )}

            {/* Active progress bar */}
            {(stage.status === "active" || stage.status === "delayed") && (
              <div className="px-4 pb-3">
                <div className="mb-1 flex justify-between text-muted-foreground text-xs">
                  <span>Progress</span>
                  <span className="tabular-nums">{stage.completionPct}%</span>
                </div>
                <Progress value={stage.completionPct} className="h-1.5 bg-surface-2" />
              </div>
            )}

            {/* Subtask list */}
            <Collapsible open={subtaskOpen} onOpenChange={setSubtaskOpen}>
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="flex w-full items-center justify-between border-border/50 border-t px-4 py-2.5 text-muted-foreground text-xs transition-colors hover:bg-surface-2/40"
                >
                  <span className="font-medium">
                    Subtasks{" "}
                    <span className="text-foreground tabular-nums">
                      {doneTasks}/{stage.subtasks.length}
                    </span>
                  </span>
                  <motion.div animate={{ rotate: subtaskOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="size-3.5" />
                  </motion.div>
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2 border-border/30 border-t px-4 py-2"
                  >
                    {stage.subtasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-2.5">
                        {task.done ? (
                          <CheckSquare className="size-3.5 shrink-0 text-status-on-track" />
                        ) : (
                          <Square className="size-3.5 shrink-0 text-muted-foreground" />
                        )}
                        <span
                          className={`text-xs leading-relaxed ${task.done ? "text-muted-foreground line-through" : ""}`}
                        >
                          {task.label}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </CollapsibleContent>
            </Collapsible>

            {/* Footer actions */}
            <div className="flex gap-2 border-border/40 border-t px-4 py-3">
              <Button size="sm" variant="outline" className="h-7 text-xs">
                <FileText className="mr-1 size-3" />
                View Documents
              </Button>
              <Button size="sm" variant="ghost" className="h-7 text-xs">
                <MessageSquare className="mr-1 size-3" />
                Add Comment
              </Button>
            </div>
          </motion.div>
        </TooltipTrigger>
        {isCascadeRisk && (
          <TooltipContent side="right" className="max-w-[220px] text-xs">
            At risk: upstream delay of 4 days from Sampling may push {stage.name} deadline to{" "}
            {format(addDays(stage.deadline, 4), "dd MMM")}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

// ─── TNAStagePipeline — the main export ───────────────────────────────────────
export function TNAStagePipeline({ order }: { order: Order & { derivedSignals?: DerivedSignals } }) {
  const now = new Date();

  // Construct dynamic stages based on the order data and its derived signals
  const tnaStages: TNAStage[] = [
    {
      id: "s1",
      name: "Sampling",
      icon: Scissors,
      status: order.derivedSignals?.isDelayed ? "delayed" : order.pfhStatus === "approved" ? "completed" : "active",
      deadline: subDays(new Date(order.deliveryDate), 45), // Mocked deadline based on delivery
      completionPct: order.pfhStatus === "approved" ? 100 : 65,
      responsible: "Apex Fabrics Ltd",
      notes: order.derivedSignals?.blockedReason || "Pending fit sample feedback.",
      subtasks: [
        { id: "st1", label: "Fabric sourcing confirmed", done: true },
        { id: "st2", label: "Proto sample dispatched", done: true },
        { id: "st3", label: "Fit sample — buyer feedback", done: order.pfhStatus === "approved" },
      ],
    },
    {
      id: "s2",
      name: "Approval",
      icon: FileText,
      status: order.derivedSignals?.cascadeRisk
        ? "at-risk"
        : order.approvalPending
          ? "active"
          : order.pfhStatus === "approved"
            ? "completed"
            : "pending",
      deadline: subDays(new Date(order.deliveryDate), 35),
      completionPct: order.approvalPending ? 50 : order.pfhStatus === "approved" ? 100 : 0,
      responsible: `${order.buyer} Buying Team`,
      notes: order.derivedSignals?.cascadeReason || "Awaiting approvals",
      subtasks: [
        {
          id: "st6",
          label: "Tech pack submitted to buyer",
          done: order.approvalPending === true || order.pfhStatus === "approved",
        },
        { id: "st8", label: "Buyer sign-off received", done: order.pfhStatus === "approved" },
      ],
    },
    {
      id: "s3",
      name: "Production",
      icon: Package,
      status: order.sopStatus === "completed" ? "completed" : order.sopStatus === "in_progress" ? "active" : "pending",
      deadline: subDays(new Date(order.deliveryDate), 10),
      completionPct: order.sopStatus === "completed" ? 100 : order.sopStatus === "in_progress" ? 45 : 0,
      responsible: "Apex Fabrics Ltd",
      subtasks: [
        {
          id: "st9",
          label: "Bulk fabric cutting",
          done: order.sopStatus === "in_progress" || order.sopStatus === "completed",
        },
        { id: "st11", label: "In-line QC inspection", done: order.sopStatus === "completed" },
      ],
    },
    {
      id: "s4",
      name: "Shipment",
      icon: Ship,
      status: order.ppmStatus === "completed" ? "completed" : order.ppmStatus === "in_progress" ? "active" : "pending",
      deadline: new Date(order.deliveryDate),
      completionPct: order.ppmStatus === "completed" ? 100 : 0,
      responsible: "Logistics Team",
      subtasks: [
        {
          id: "st13",
          label: "Booking confirmed with forwarder",
          done: order.ppmStatus === "in_progress" || order.ppmStatus === "completed",
        },
        { id: "st15", label: "Goods loaded — vessel ETD", done: order.ppmStatus === "completed" },
      ],
    },
  ];

  const overallPct = Math.round(tnaStages.reduce((s, st) => s + st.completionPct, 0) / tnaStages.length);
  const daysToShipment = differenceInDays(tnaStages[3].deadline, now);

  return (
    <div>
      {/* Timeline header */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium text-sm">Overall TNA Progress</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm tabular-nums">{overallPct}%</span>
            <div className="flex items-center gap-1.5 rounded-full border border-border/40 bg-surface-2 px-2 py-1 font-medium text-status-at-risk text-xs">
              <span className="relative flex size-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-at-risk opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-status-at-risk" />
              </span>
              <span>Ship in {daysToShipment}d</span>
            </div>
          </div>
        </div>
        <Progress value={overallPct} className="h-2 bg-surface-2" />
      </div>

      {/* Stage nodes */}
      <div className="flex flex-col">
        {tnaStages.map((stage, i) => {
          const isLast = i === tnaStages.length - 1;
          const isCascadeRisk = i > 0 && tnaStages[i - 1].status === "delayed" && stage.status === "at-risk";
          const prevProgress = i > 0 ? tnaStages[i - 1].completionPct : 100;

          return (
            <div key={stage.id} className="relative flex gap-5">
              {/* Left column: node + connector */}
              <div className="relative flex flex-col items-center">
                <NodeCircle stage={stage} index={i} />
                {!isLast && <ConnectorTrack progress={prevProgress} isCascadeRisk={isCascadeRisk} />}
              </div>

              {/* Right column: card */}
              <StageCard stage={stage} index={i} isCascadeRisk={isCascadeRisk} />
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-2 flex flex-wrap gap-4 border-border/40 border-t pt-4">
        {[
          { color: "bg-status-on-track", label: "Completed" },
          { color: "bg-primary", label: "Active" },
          { color: "bg-status-at-risk", label: "At Risk" },
          { color: "bg-status-delayed", label: "Delayed" },
          { color: "bg-surface-2 border border-border", label: "Pending" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <div className={`size-2.5 rounded-full ${item.color}`} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
