'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, Plus } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataTableSkeleton } from '@/components/ui/skeletons/data-table-skeleton';
import { columns } from './material-requisition-columns';

interface MaterialRequisition {
  id: string;
  requisitionNo: string | null;
  requisitionDate: string;
  company: string;
  reqnType: string;
  requisitionFor: string;
  buyer: string | null;
  season: string | null;
  forLocation: string | null;
  preparedBy: string | null;
  deptFrom: string | null;
  deptTo: string | null;
  items: Array<{
    id: string;
    itemCategory: string;
    itemDesc: string;
    color: string | null;
    width: string | null;
    unit: string | null;
    reqnQty: number | null;
    rate: number | null;
    reqOn: string | null;
    remark: string | null;
  }>;
}

const emptyForm = {
  requisitionNo: '',
  requisitionDate: new Date().toISOString().slice(0, 10),
  reqnType: 'Fabric',
  requisitionFor: 'Production',
  buyer: '',
  season: '',
  forLocation: 'CTA Factory',
  preparedBy: '',
  deptFrom: 'Merchandising',
  deptTo: 'Store',
  itemCategory: 'Fabric',
  itemDesc: '',
  color: '',
  width: '',
  unit: 'MTRS',
  reqnQty: '',
  rate: '',
  reqOn: '',
  remark: '',
};

export function MaterialRequisitionView() {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['material-requisition'],
    queryFn: async () => {
      const res = await fetch('/api/procurement/material-requisition?page=1&limit=50');
      if (!res.ok) throw new Error('Failed to fetch material requisitions');
      return res.json() as Promise<{ requisitions: MaterialRequisition[]; total: number }>;
    },
    retry: 2,
    staleTime: 60 * 1000,
  });

  if (isLoading) {
    return <DataTableSkeleton cols={10} rows={10} />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load material requisitions. Please try again.</AlertDescription>
      </Alert>
    );
  }

  const updateField = (key: keyof typeof emptyForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/procurement/material-requisition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requisitionNo: form.requisitionNo || undefined,
          requisitionDate: form.requisitionDate,
          reqnType: form.reqnType,
          requisitionFor: form.requisitionFor,
          buyer: form.buyer || undefined,
          season: form.season || undefined,
          forLocation: form.forLocation || undefined,
          preparedBy: form.preparedBy || undefined,
          deptFrom: form.deptFrom || undefined,
          deptTo: form.deptTo || undefined,
          items: [
            {
              itemCategory: form.itemCategory,
              itemDesc: form.itemDesc,
              color: form.color || undefined,
              width: form.width || undefined,
              unit: form.unit || undefined,
              reqnQty: form.reqnQty ? Number(form.reqnQty) : undefined,
              rate: form.rate ? Number(form.rate) : undefined,
              reqOn: form.reqOn || undefined,
              remark: form.remark || undefined,
            },
          ],
        }),
      });
      if (!res.ok) throw new Error('Failed to create requisition');
      setForm(emptyForm);
      setOpen(false);
      await refetch();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle>Material Requisitions</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Requisition
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>New Material Requisition</DialogTitle>
            </DialogHeader>
            <form onSubmit={submit} className="grid gap-4">
              <div className="grid gap-3 md:grid-cols-3">
                <Field label="Req. No."><Input value={form.requisitionNo} onChange={(e) => updateField('requisitionNo', e.target.value)} placeholder="MR-0001" /></Field>
                <Field label="Date"><Input required type="date" value={form.requisitionDate} onChange={(e) => updateField('requisitionDate', e.target.value)} /></Field>
                <Field label="Type"><Input required value={form.reqnType} onChange={(e) => updateField('reqnType', e.target.value)} /></Field>
                <Field label="For"><Input required value={form.requisitionFor} onChange={(e) => updateField('requisitionFor', e.target.value)} /></Field>
                <Field label="Buyer"><Input value={form.buyer} onChange={(e) => updateField('buyer', e.target.value)} /></Field>
                <Field label="Season"><Input value={form.season} onChange={(e) => updateField('season', e.target.value)} /></Field>
                <Field label="Location"><Input value={form.forLocation} onChange={(e) => updateField('forLocation', e.target.value)} /></Field>
                <Field label="Prepared By"><Input value={form.preparedBy} onChange={(e) => updateField('preparedBy', e.target.value)} /></Field>
                <Field label="Dept From"><Input value={form.deptFrom} onChange={(e) => updateField('deptFrom', e.target.value)} /></Field>
                <Field label="Dept To"><Input value={form.deptTo} onChange={(e) => updateField('deptTo', e.target.value)} /></Field>
              </div>
              <div className="rounded-md border p-4">
                <div className="mb-3 text-sm font-medium">Item</div>
                <div className="grid gap-3 md:grid-cols-4">
                  <Field label="Category"><Input required value={form.itemCategory} onChange={(e) => updateField('itemCategory', e.target.value)} /></Field>
                  <Field label="Description"><Input required value={form.itemDesc} onChange={(e) => updateField('itemDesc', e.target.value)} placeholder="Cotton fabric 40s" /></Field>
                  <Field label="Color"><Input value={form.color} onChange={(e) => updateField('color', e.target.value)} /></Field>
                  <Field label="Width"><Input value={form.width} onChange={(e) => updateField('width', e.target.value)} /></Field>
                  <Field label="Unit"><Input value={form.unit} onChange={(e) => updateField('unit', e.target.value)} /></Field>
                  <Field label="Qty"><Input type="number" min="0" step="0.01" value={form.reqnQty} onChange={(e) => updateField('reqnQty', e.target.value)} /></Field>
                  <Field label="Rate"><Input type="number" min="0" step="0.01" value={form.rate} onChange={(e) => updateField('rate', e.target.value)} /></Field>
                  <Field label="Required On"><Input type="date" value={form.reqOn} onChange={(e) => updateField('reqOn', e.target.value)} /></Field>
                  <Field label="Remark"><Input value={form.remark} onChange={(e) => updateField('remark', e.target.value)} /></Field>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Requisition'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={data?.requisitions ?? []} />
        </div>
      </CardContent>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
