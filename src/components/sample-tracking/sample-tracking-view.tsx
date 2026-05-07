"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Loader2,
  Package,
  Play,
  Plus,
  Route,
  Scissors,
  Sparkles,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { ExportButton } from "@/components/dashboard/export-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DataTableSkeleton } from "@/components/ui/skeletons/data-table-skeleton";
import { cn } from "@/lib/utils";

type StageStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "ON_HOLD";

type SampleStage = {
  id: string;
  stage: "CUTTING" | "SWING_LINE" | "FINISHING" | "PACKED_FOR_SHIPMENT";
  status: StageStatus;
  startedAt: string | null;
  completedAt: string | null;
  assignedTo: string | null;
  remarks: string | null;
};

type SampleRequest = {
  id: string;
  ourRef: string;
  merchant: string | null;
  preparedBy: string | null;
  deptFrom: string;
  itemType: string;
  buyer: string | null;
  season: string | null;
  createdAt: string;
  stages: SampleStage[];
};

const stageMeta = {
  CUTTING: { label: "Cutting", icon: Scissors },
  SWING_LINE: { label: "Swing Line", icon: Play },
  FINISHING: { label: "Finishing", icon: Sparkles },
  PACKED_FOR_SHIPMENT: { label: "Packed for Shipment", icon: Package },
} as const;

const statusTone: Record<StageStatus, string> = {
  PENDING: "border-zinc-200 bg-zinc-50 text-zinc-600",
  IN_PROGRESS: "border-orange-200 bg-orange-50 text-orange-700",
  COMPLETED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  ON_HOLD: "border-red-200 bg-red-50 text-red-700",
};

const emptyForm = {
  deptFrom: "Merchandising",
  itemType: "FABRIC",
  buyer: "",
  season: "",
  merchant: "",
  preparedBy: "",
};

type SampleModuleMode = "create" | "assign" | "status" | "tracking";

const workflowSteps = [
  { key: "create", label: "Sample Create", icon: Plus },
  { key: "assign", label: "Sample Assign", icon: Users },
  { key: "tracking", label: "Sampling Status / Sample Tracking", icon: ClipboardCheck },
] as const;

const modeCopy: Record<SampleModuleMode, { title: string; description: string }> = {
  create: {
    title: "Sample Create",
    description: "Create sample requests and seed the lifecycle stages in Neon.",
  },
  assign: {
    title: "Sample Assign",
    description: "Assign owners to active sample stages before execution starts.",
  },
  status: {
    title: "Sampling Status",
    description: "Review pending, in-progress, on-hold, and completed sample stages.",
  },
  tracking: {
    title: "Sample Tracking",
    description: "Track cutting, sewing, finishing, and shipment readiness.",
  },
};

export function SampleTrackingView({ mode = "tracking" }: { mode?: SampleModuleMode }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [stageOpen, setStageOpen] = useState(false);
  const [selectedSample, setSelectedSample] = useState<SampleRequest | null>(null);
  const [selectedStage, setSelectedStage] = useState<SampleStage | null>(null);
  const [remarks, setRemarks] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [form, setForm] = useState(emptyForm);

  const { data, isLoading, error } = useQuery({
    queryKey: ["sample-tracking"],
    queryFn: async () => {
      const res = await fetch("/api/sample-tracking");
      if (!res.ok) throw new Error("Failed to fetch sample tracking");
      return res.json() as Promise<{ data: SampleRequest[]; samples: SampleRequest[] }>;
    },
    retry: 2,
    staleTime: 60_000,
  });

  const samples = data?.data ?? data?.samples ?? [];
  const pendingAssignments = samples.reduce(
    (count, sample) => count + sample.stages.filter((stage) => !stage.assignedTo && stage.status !== "COMPLETED").length,
    0,
  );
  const inProgressCount = samples.reduce(
    (count, sample) => count + sample.stages.filter((stage) => stage.status === "IN_PROGRESS").length,
    0,
  );
  const completedCount = samples.reduce(
    (count, sample) => count + sample.stages.filter((stage) => stage.status === "COMPLETED").length,
    0,
  );
  const exportRows = samples.map((sample) => ({
    "Our Ref": sample.ourRef,
    Buyer: sample.buyer ?? "",
    Season: sample.season ?? "",
    Merchant: sample.merchant ?? "",
    Department: sample.deptFrom,
    Progress: `${sample.stages.filter((stage) => stage.status === "COMPLETED").length}/${sample.stages.length}`,
  }));

  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/sample-tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          buyer: form.buyer || null,
          season: form.season || null,
          merchant: form.merchant || null,
          preparedBy: form.preparedBy || null,
        }),
      });
      if (!res.ok) throw new Error("Failed to create sample request");
    },
    onSuccess: async () => {
      toast.success("Sample request created");
      setOpen(false);
      setForm(emptyForm);
      await queryClient.invalidateQueries({ queryKey: ["sample-tracking"] });
    },
    onError: (err) => toast.error((err as Error).message),
  });

  const stageMutation = useMutation({
    mutationFn: async (status: StageStatus) => {
      if (!selectedSample || !selectedStage) throw new Error("No stage selected");
      const res = await fetch(`/api/sample-tracking/${selectedSample.id}/stages`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stageId: selectedStage.id, status, remarks, assignedTo }),
      });
      if (!res.ok) throw new Error("Failed to update sample stage");
    },
    onSuccess: async () => {
      toast.success("Stage updated");
      setStageOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["sample-tracking"] });
    },
    onError: (err) => toast.error((err as Error).message),
  });

  if (isLoading) return <DataTableSkeleton cols={4} rows={8} />;

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Sample Tracking Error</AlertTitle>
        <AlertDescription>Unable to load sample lifecycle data from Neon.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="mr-auto">
          <h1 className="font-semibold text-2xl">{modeCopy[mode].title}</h1>
          <p className="text-muted-foreground text-sm">{modeCopy[mode].description}</p>
        </div>
        <ExportButton data={exportRows} filename="sample-tracking" />
        {(mode === "create" || mode === "tracking") && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Sample
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Sample Request</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Dept From"><Input value={form.deptFrom} onChange={(e) => setForm({ ...form, deptFrom: e.target.value })} /></Field>
                <Field label="Item Type"><Input value={form.itemType} onChange={(e) => setForm({ ...form, itemType: e.target.value })} /></Field>
                <Field label="Buyer"><Input value={form.buyer} onChange={(e) => setForm({ ...form, buyer: e.target.value })} /></Field>
                <Field label="Season"><Input value={form.season} onChange={(e) => setForm({ ...form, season: e.target.value })} /></Field>
                <Field label="Merchant"><Input value={form.merchant} onChange={(e) => setForm({ ...form, merchant: e.target.value })} /></Field>
                <Field label="Prepared By"><Input value={form.preparedBy} onChange={(e) => setForm({ ...form, preparedBy: e.target.value })} /></Field>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button disabled={createMutation.isPending || !form.deptFrom} onClick={() => createMutation.mutate()}>
                  {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {workflowSteps.map((step) => {
          const Icon = step.icon;
          const active =
            step.key === mode || (step.key === "tracking" && mode === "status");
          return (
            <Card key={step.key} className={cn("border-muted bg-muted/20", active && "border-primary bg-primary/5")}>
              <CardContent className="flex items-center gap-3 p-4">
                <Icon className={cn("h-5 w-5 text-muted-foreground", active && "text-primary")} />
                <div>
                  <div className="font-medium text-sm">{step.label}</div>
                  <div className="text-muted-foreground text-xs">
                    {step.key === "create" && `${samples.length} requests`}
                    {step.key === "assign" && `${pendingAssignments} unassigned stages`}
                    {step.key === "tracking" && `${inProgressCount} active · ${completedCount} complete`}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {samples.map((sample) => (
          <Card key={sample.id}>
            <CardHeader className="pb-3">
              <CardTitle className="flex flex-wrap items-center justify-between gap-2 text-base">
                <span>{sample.ourRef}</span>
                <Badge variant="outline">{sample.buyer ?? "No Buyer"}</Badge>
              </CardTitle>
              <p className="text-muted-foreground text-sm">{sample.merchant ?? "Unassigned"} · {sample.deptFrom}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex overflow-x-auto pb-1">
                {sample.stages.map((stage, index) => {
                  const Icon = stageMeta[stage.stage].icon;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => {
                        setSelectedSample(sample);
                        setSelectedStage(stage);
                        setRemarks(stage.remarks ?? "");
                        setAssignedTo(stage.assignedTo ?? "");
                        setStageOpen(true);
                      }}
                      className={cn("group flex min-w-36 flex-1 items-center gap-2 rounded-md border px-3 py-3 text-left transition hover:bg-muted", index > 0 && "ml-2", statusTone[stage.status])}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-xs">{stageMeta[stage.stage].label}</span>
                        <span className="block truncate text-[11px]">{stage.status.replaceAll("_", " ")}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{sample.stages.filter((stage) => stage.status === "COMPLETED").length}/{sample.stages.length} complete</span>
              </div>
              {mode === "assign" && (
                <Button
                  variant="outline"
                  className="w-full justify-center gap-2"
                  onClick={() => {
                    const nextStage = sample.stages.find((stage) => !stage.assignedTo && stage.status !== "COMPLETED") ?? sample.stages[0];
                    setSelectedSample(sample);
                    setSelectedStage(nextStage);
                    setRemarks(nextStage.remarks ?? "");
                    setAssignedTo(nextStage.assignedTo ?? "");
                    setStageOpen(true);
                  }}
                >
                  <Users className="h-4 w-4" />
                  Assign Next Stage
                </Button>
              )}
              {mode === "status" && (
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {(["PENDING", "IN_PROGRESS", "ON_HOLD", "COMPLETED"] as const).map((status) => (
                    <div key={status} className={cn("rounded-md border px-2 py-2", statusTone[status])}>
                      <div className="font-semibold">{sample.stages.filter((stage) => stage.status === status).length}</div>
                      <div>{status.replaceAll("_", " ")}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {samples.length === 0 && <div className="rounded-lg border py-16 text-center text-muted-foreground xl:col-span-2">No sample requests yet.</div>}
      </div>

      <Dialog open={stageOpen} onOpenChange={setStageOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedStage ? stageMeta[selectedStage.stage].label : "Stage"}</DialogTitle>
          </DialogHeader>
          {selectedStage && (
            <div className="space-y-4">
              <Badge variant="outline" className={statusTone[selectedStage.status]}>{selectedStage.status.replaceAll("_", " ")}</Badge>
              <Field label="Assigned To"><Input value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} /></Field>
              <Field label="Remarks"><Textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} /></Field>
              <div className="flex flex-wrap justify-end gap-2">
                <Button variant="outline" onClick={() => stageMutation.mutate("PENDING")} disabled={stageMutation.isPending}><Route className="mr-2 h-4 w-4" />Reset</Button>
                <Button variant="outline" onClick={() => stageMutation.mutate("IN_PROGRESS")} disabled={stageMutation.isPending}><Clock className="mr-2 h-4 w-4" />Start</Button>
                <Button variant="outline" onClick={() => stageMutation.mutate("ON_HOLD")} disabled={stageMutation.isPending}>Hold</Button>
                <Button onClick={() => stageMutation.mutate("COMPLETED")} disabled={stageMutation.isPending}><CheckCircle2 className="mr-2 h-4 w-4" />Complete</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="font-medium text-muted-foreground text-xs">{label}</Label>
      {children}
    </div>
  );
}
