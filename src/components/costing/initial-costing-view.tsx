"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Calculator, Plus } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { toast } from "sonner";

import { ExportButton } from "@/components/dashboard/export-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type Costing = {
  id: string;
  buyer: string;
  styleNo: string;
  styleName: string | null;
  fabricCost: number;
  trimCost: number;
  processCost: number;
  embroideryCost: number;
  washingCost: number;
  overhead: number;
  margin: number;
  finalFob: number;
  status: string;
};

const emptyForm = {
  buyer: "",
  styleNo: "",
  styleName: "",
  orderQty: "0",
  yarnCostPerKg: "0",
  totalWeightKg: "0",
  yarnWastePct: 5,
  fabricPricePerMeter: "0",
  fabricQuantity: "0",
  fabricWastagePct: 7,
  sizingCost: "6",
  weavingCost: "18",
  inspectionCost: "2.5",
  dyeingCost: "0",
  printingCost: "0",
  treatmentCost: "0",
  fabricCost: "0",
  trimCost: "0",
  processCost: "0",
  embroideryCost: "0",
  washingCost: "0",
  overhead: "0",
  margin: 20,
};

const colors = ["#2563eb", "#16a34a", "#f97316", "#9333ea", "#06b6d4", "#64748b"];

export function InitialCostingView() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const { data, isLoading, error } = useQuery({
    queryKey: ["initial-costing"],
    queryFn: async () => {
      const res = await fetch("/api/initial-costing");
      if (!res.ok) throw new Error("Failed to load costing");
      return res.json() as Promise<{ data: Costing[] }>;
    },
  });

  const computed = useMemo(() => {
    const rawMaterialCost = Number(form.yarnCostPerKg) * Number(form.totalWeightKg) * (1 + form.yarnWastePct / 100);
    const formulaFabricCost =
      Number(form.fabricPricePerMeter) * Number(form.fabricQuantity) * (1 + form.fabricWastagePct / 100);
    const fabricCost = formulaFabricCost > 0 ? formulaFabricCost : rawMaterialCost > 0 ? rawMaterialCost : Number(form.fabricCost);
    const conversionCost =
      Number(form.fabricQuantity || form.orderQty) *
      (Number(form.sizingCost) + Number(form.weavingCost) + Number(form.inspectionCost));
    const processCost = conversionCost > 0 ? conversionCost : Number(form.processCost);
    const finishingCost = Number(form.dyeingCost) + Number(form.printingCost) + Number(form.treatmentCost);
    const washingCost = finishingCost > 0 ? finishingCost : Number(form.washingCost);
    const base =
      fabricCost + Number(form.trimCost) + processCost + Number(form.embroideryCost) + washingCost + Number(form.overhead);
    const finalFob = base * (1 + form.margin / 100);
    return { rawMaterialCost, formulaFabricCost, fabricCost, conversionCost, processCost, finishingCost, washingCost, base, finalFob };
  }, [form]);

  const breakdown = [
    { name: "Fabric", value: computed.fabricCost },
    { name: "Trim", value: Number(form.trimCost) },
    { name: "Conversion", value: computed.processCost },
    { name: "Embroidery", value: Number(form.embroideryCost) },
    { name: "Finishing", value: computed.washingCost },
    { name: "Overhead", value: Number(form.overhead) },
  ];

  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/initial-costing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, margin: form.margin }),
      });
      if (!res.ok) throw new Error("Failed to save costing");
    },
    onSuccess: async () => {
      toast.success("Costing saved");
      setOpen(false);
      setForm(emptyForm);
      await queryClient.invalidateQueries({ queryKey: ["initial-costing"] });
    },
    onError: (err) => toast.error((err as Error).message),
  });

  if (isLoading) return null;
  if (error) return <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Costing Error</AlertTitle><AlertDescription>Unable to load costing data.</AlertDescription></Alert>;

  const rows = data?.data ?? [];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="mr-auto">
          <h1 className="flex items-center gap-2 font-semibold text-2xl"><Calculator className="h-5 w-5" />Initial Costing</h1>
          <p className="text-muted-foreground text-sm">Interactive cost breakdown, margin, and FOB calculation.</p>
        </div>
        <ExportButton data={rows} filename="initial-costing" />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" />New Costing</Button></DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
            <DialogHeader><DialogTitle>New Initial Costing</DialogTitle></DialogHeader>
            <div className="grid gap-4 md:grid-cols-[1fr_280px]">
              <div className="space-y-4">
                <div className="grid gap-3 md:grid-cols-2">
                  {(["buyer", "styleNo", "styleName", "orderQty"] as const).map((key) => (
                    <Field key={key} label={key.replace(/([A-Z])/g, " $1")}>
                      <Input value={String(form[key])} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                    </Field>
                  ))}
                </div>
                <Card>
                  <CardHeader><CardTitle className="text-sm">Fabric Cost</CardTitle></CardHeader>
                  <CardContent className="grid gap-3 md:grid-cols-3">
                    <Field label="Yarn Cost / Kg"><Input type="number" value={form.yarnCostPerKg} onChange={(e) => setForm({ ...form, yarnCostPerKg: e.target.value })} /></Field>
                    <Field label="Total Weight Kg"><Input type="number" value={form.totalWeightKg} onChange={(e) => setForm({ ...form, totalWeightKg: e.target.value })} /></Field>
                    <div className="space-y-3">
                      <Label>Yarn Waste: {form.yarnWastePct}%</Label>
                      <Slider value={[form.yarnWastePct]} min={2} max={7} step={0.5} onValueChange={([value]) => setForm({ ...form, yarnWastePct: value ?? 5 })} />
                    </div>
                    <Field label="Fabric Price / Meter"><Input type="number" value={form.fabricPricePerMeter} onChange={(e) => setForm({ ...form, fabricPricePerMeter: e.target.value })} /></Field>
                    <Field label="Quantity Meter"><Input type="number" value={form.fabricQuantity} onChange={(e) => setForm({ ...form, fabricQuantity: e.target.value })} /></Field>
                    <div className="space-y-3">
                      <Label>Fabric Wastage: {form.fabricWastagePct}%</Label>
                      <Slider value={[form.fabricWastagePct]} min={5} max={10} step={0.5} onValueChange={([value]) => setForm({ ...form, fabricWastagePct: value ?? 7 })} />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-sm">Conversion and Finishing</CardTitle></CardHeader>
                  <CardContent className="grid gap-3 md:grid-cols-3">
                    <Field label="Sizing / Unit"><Input type="number" value={form.sizingCost} onChange={(e) => setForm({ ...form, sizingCost: e.target.value })} /></Field>
                    <Field label="Weaving / Unit"><Input type="number" value={form.weavingCost} onChange={(e) => setForm({ ...form, weavingCost: e.target.value })} /></Field>
                    <Field label="Inspection / Unit"><Input type="number" value={form.inspectionCost} onChange={(e) => setForm({ ...form, inspectionCost: e.target.value })} /></Field>
                    <Field label="Dyeing"><Input type="number" value={form.dyeingCost} onChange={(e) => setForm({ ...form, dyeingCost: e.target.value })} /></Field>
                    <Field label="Printing"><Input type="number" value={form.printingCost} onChange={(e) => setForm({ ...form, printingCost: e.target.value })} /></Field>
                    <Field label="Treatments"><Input type="number" value={form.treatmentCost} onChange={(e) => setForm({ ...form, treatmentCost: e.target.value })} /></Field>
                  </CardContent>
                </Card>
                <div className="grid gap-3 md:grid-cols-3">
                  {(["trimCost", "embroideryCost", "overhead"] as const).map((key) => (
                    <Field key={key} label={key.replace(/([A-Z])/g, " $1")}>
                      <Input type="number" value={String(form[key])} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                    </Field>
                  ))}
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label>Margin: {form.margin}%</Label>
                  <Slider value={[form.margin]} min={0} max={60} step={1} onValueChange={([value]) => setForm({ ...form, margin: value ?? 0 })} />
                  <Badge className={form.margin < 15 ? "bg-red-600" : "bg-emerald-600"}>FOB {computed.finalFob.toFixed(2)}</Badge>
                </div>
              </div>
              <Card>
                <CardContent className="space-y-3 p-4">
                  <div className="h-64"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={breakdown} dataKey="value" nameKey="name">{breakdown.map((entry, i) => <Cell key={entry.name} fill={colors[i % colors.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
                  <CostLine label="Raw Material" value={computed.rawMaterialCost} />
                  <CostLine label="Fabric Formula" value={computed.formulaFabricCost} />
                  <CostLine label="Conversion" value={computed.processCost} />
                  <CostLine label="Finishing" value={computed.washingCost} />
                  <CostLine label="Base Cost" value={computed.base} />
                  <CostLine label="FOB" value={computed.finalFob} strong />
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end"><Button onClick={() => createMutation.mutate()} disabled={createMutation.isPending || !form.buyer || !form.styleNo}>Save Costing</Button></div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {rows.map((row) => <Card key={row.id}><CardContent className="p-4"><div className="font-medium">{row.styleNo}</div><div className="text-muted-foreground text-sm">{row.buyer}</div><div className="mt-3 font-semibold text-xl">FOB {Number(row.finalFob).toFixed(2)}</div><Badge className={Number(row.margin) < 15 ? "bg-red-600" : "bg-emerald-600"}>{row.margin}% margin</Badge></CardContent></Card>)}
        {rows.length === 0 && <div className="rounded-lg border py-16 text-center text-muted-foreground md:col-span-3">No costing records yet.</div>}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label className="text-muted-foreground text-xs capitalize">{label}</Label>{children}</div>;
}

function CostLine({ label, value, strong = false }: { label: string; value: number; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={strong ? "font-semibold text-lg" : "font-medium"}>{value.toFixed(2)}</span>
    </div>
  );
}
