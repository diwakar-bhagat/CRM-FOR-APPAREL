"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, PackageCheck, Plus, Send } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTableSkeleton } from "@/components/ui/skeletons/data-table-skeleton";

type DispatchChallan = {
  id: string;
  challanNo: string;
  orderNo: string | null;
  dispatchDate: string;
  fromLocation: string;
  toLocation: string;
  preparedBy: string | null;
  status: "DRAFT" | "SENT" | "DELIVERED";
  items: Array<{
    id: string;
    description: string;
    qty: number;
    unit: string;
    remark: string | null;
  }>;
};

const emptyForm = {
  challanNo: "",
  dispatchDate: new Date().toISOString().slice(0, 10),
  fromLocation: "CTA APPARELS PVT. LTD.",
  toLocation: "",
  preparedBy: "",
  description: "",
  qty: "",
  unit: "PCS",
  remark: "",
};

const statusTone: Record<DispatchChallan["status"], string> = {
  DRAFT: "border-blue-200 bg-blue-50 text-blue-700",
  SENT: "border-orange-200 bg-orange-50 text-orange-700",
  DELIVERED: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

export function DispatchChallanView() {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["dispatch-challan"],
    queryFn: async () => {
      const res = await fetch("/api/dispatch-challan?page=1&limit=50");
      if (!res.ok) throw new Error("Failed to fetch dispatch challans");
      return res.json() as Promise<{ challans: DispatchChallan[]; total: number }>;
    },
    retry: 2,
    staleTime: 60_000,
  });

  const updateField = (key: keyof typeof emptyForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/dispatch-challan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challanNo: form.challanNo || undefined,
          dispatchDate: form.dispatchDate,
          fromLocation: form.fromLocation,
          toLocation: form.toLocation,
          preparedBy: form.preparedBy || undefined,
          status: "DRAFT",
          items: [
            {
              description: form.description,
              qty: form.qty ? Number(form.qty) : 0,
              unit: form.unit,
              remark: form.remark || undefined,
            },
          ],
        }),
      });
      if (!res.ok) throw new Error("Failed to create dispatch challan");
      setForm(emptyForm);
      setOpen(false);
      await refetch();
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <DataTableSkeleton cols={8} rows={10} />;

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Dispatch Challan Error</AlertTitle>
        <AlertDescription>Unable to load dispatch challans from Neon.</AlertDescription>
      </Alert>
    );
  }

  const challans = data?.challans ?? [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="flex items-center gap-2">
            <PackageCheck className="h-5 w-5 text-emerald-600" />
            VG Dispatch Challan
          </CardTitle>
          <p className="mt-1 text-muted-foreground text-sm">Dispatch document register linked to live Neon records.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Challan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>New Dispatch Challan</DialogTitle>
            </DialogHeader>
            <form onSubmit={submit} className="grid gap-4">
              <div className="grid gap-3 md:grid-cols-3">
                <Field label="Challan No.">
                  <Input value={form.challanNo} onChange={(e) => updateField("challanNo", e.target.value)} placeholder="DC-0001" />
                </Field>
                <Field label="Dispatch Date">
                  <Input required type="date" value={form.dispatchDate} onChange={(e) => updateField("dispatchDate", e.target.value)} />
                </Field>
                <Field label="Prepared By">
                  <Input value={form.preparedBy} onChange={(e) => updateField("preparedBy", e.target.value)} />
                </Field>
                <Field label="From Location">
                  <Input required value={form.fromLocation} onChange={(e) => updateField("fromLocation", e.target.value)} />
                </Field>
                <Field label="To Location">
                  <Input required value={form.toLocation} onChange={(e) => updateField("toLocation", e.target.value)} />
                </Field>
              </div>

              <div className="rounded-md border p-4">
                <div className="mb-3 font-medium text-sm">Dispatch Item</div>
                <div className="grid gap-3 md:grid-cols-4">
                  <Field label="Description">
                    <Input required value={form.description} onChange={(e) => updateField("description", e.target.value)} />
                  </Field>
                  <Field label="Qty">
                    <Input required type="number" min="0" step="0.01" value={form.qty} onChange={(e) => updateField("qty", e.target.value)} />
                  </Field>
                  <Field label="Unit">
                    <Input required value={form.unit} onChange={(e) => updateField("unit", e.target.value)} />
                  </Field>
                  <Field label="Remark">
                    <Input value={form.remark} onChange={(e) => updateField("remark", e.target.value)} />
                  </Field>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  <Send className="mr-2 h-4 w-4" />
                  {saving ? "Saving..." : "Save Challan"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Challan No.</TableHead>
                <TableHead>Dispatch Date</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Prepared By</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {challans.map((challan) => (
                <TableRow key={challan.id}>
                  <TableCell className="font-medium">{challan.challanNo}</TableCell>
                  <TableCell>{formatDate(challan.dispatchDate)}</TableCell>
                  <TableCell>{challan.fromLocation}</TableCell>
                  <TableCell>{challan.toLocation}</TableCell>
                  <TableCell>{challan.items.length}</TableCell>
                  <TableCell>{challan.preparedBy ?? "-"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusTone[challan.status]}>
                      {challan.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {challans.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                    No dispatch challans yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
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

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}
