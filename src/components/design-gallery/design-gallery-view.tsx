"use client";

import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Brain, CheckSquare, ExternalLink, ImagePlus, List, Loader2, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import { ExportButton } from "@/components/dashboard/export-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTableSkeleton } from "@/components/ui/skeletons/data-table-skeleton";
import { cn } from "@/lib/utils";

type DesignStatus = "DESIGNING" | "PRODUCTION" | "ARCHIVED";

type Design = {
  id: string;
  designId: number;
  styleNo: string;
  styleName: string | null;
  buyer: string;
  brand: string;
  designer: string;
  season: string;
  status: DesignStatus;
  imageUrl: string | null;
  additionalImages?: string[];
};

const emptyForm = {
  styleNo: "",
  styleName: "",
  buyer: "",
  brand: "",
  designer: "",
  season: "",
  status: "DESIGNING" as DesignStatus,
  imageUrl: "",
};

const statusTone: Record<DesignStatus, string> = {
  DESIGNING: "border-violet-200 bg-violet-50 text-violet-700",
  PRODUCTION: "border-emerald-200 bg-emerald-50 text-emerald-700",
  ARCHIVED: "border-zinc-200 bg-zinc-50 text-zinc-600",
};

export function DesignGalleryView() {
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [pfhStyle, setPfhStyle] = useState(false);
  const [listMode, setListMode] = useState(false);
  const [search, setSearch] = useState("");
  const [buyer, setBuyer] = useState("all");
  const [status, setStatus] = useState("all");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Design | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["design-vault", { search, buyer, status }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (buyer !== "all") params.set("buyer", buyer);
      if (status !== "all") params.set("status", status);
      const res = await fetch(`/api/design-vault?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch designs");
      return res.json() as Promise<{ data: Design[]; designs: Design[] }>;
    },
    retry: 2,
    staleTime: 60_000,
  });

  const designs = data?.data ?? data?.designs ?? [];
  const buyers = useMemo(() => [...new Set(designs.map((design) => design.buyer).filter(Boolean))].sort(), [designs]);
  const visibleDesigns = pfhStyle ? designs.filter((design) => design.status === "PRODUCTION") : designs;
  const exportRows = visibleDesigns.map((design) => ({
    Id: design.designId,
    "Style No": design.styleNo,
    "Style Name": design.styleName ?? "",
    Buyer: design.buyer,
    Brand: design.brand,
    Designer: design.designer,
    Season: design.season,
    Status: design.status,
  }));

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        ...form,
        styleName: form.styleName || null,
        imageUrl: form.imageUrl || null,
        additionalImages: [] as string[],
      };
      const res = await fetch(editing ? `/api/design-vault/${editing.id}` : "/api/design-vault", {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Failed to save design");
      }
    },
    onSuccess: async () => {
      toast.success(editing ? "Design updated" : "Design added");
      setOpen(false);
      setEditing(null);
      setForm(emptyForm);
      await queryClient.invalidateQueries({ queryKey: ["design-vault"] });
    },
    onError: (err) => toast.error((err as Error).message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/design-vault/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete design");
    },
    onSuccess: async () => {
      toast.success("Design deleted");
      await queryClient.invalidateQueries({ queryKey: ["design-vault"] });
    },
    onError: (err) => toast.error((err as Error).message),
  });

  const startCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const startEdit = (design: Design) => {
    setEditing(design);
    setForm({
      styleNo: design.styleNo,
      styleName: design.styleName ?? "",
      buyer: design.buyer,
      brand: design.brand,
      designer: design.designer,
      season: design.season,
      status: design.status,
      imageUrl: design.imageUrl ?? "",
    });
    setOpen(true);
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const body = new FormData();
      body.set("file", file);
      const res = await fetch("/api/upload/imagekit", { method: "POST", body });
      const payload = (await res.json()) as { success?: boolean; url?: string; error?: string };
      if (!res.ok || !payload.url) throw new Error(payload.error ?? "Upload failed");
      setForm((current) => ({ ...current, imageUrl: payload.url ?? "" }));
      toast.success("Image uploaded");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) return <DataTableSkeleton cols={4} rows={12} />;

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Design Gallery Error</AlertTitle>
        <AlertDescription>Failed to load Design Vault records from Neon.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="mr-auto font-semibold text-2xl">Design Gallery</h2>
        <div className="flex items-center gap-2">
          <Switch checked={pfhStyle} onCheckedChange={setPfhStyle} />
          <span className="font-medium text-sm">PFH Style</span>
        </div>
        <div className="relative">
          <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(event) => setSearch(event.target.value)} className="w-72 pl-9" placeholder="Filter" />
        </div>
        <Select value={buyer} onValueChange={setBuyer}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Buyer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Buyer</SelectItem>
            {buyers.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Status</SelectItem>
            <SelectItem value="DESIGNING">Designing</SelectItem>
            <SelectItem value="PRODUCTION">Production</SelectItem>
            <SelectItem value="ARCHIVED">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Button className="bg-emerald-600 hover:bg-emerald-700">APPLY</Button>
        <Button variant="outline" onClick={() => { setSearch(""); setBuyer("all"); setStatus("all"); setPfhStyle(false); }}>
          <X className="mr-2 h-4 w-4" />
          CLEAR
        </Button>
        <Button variant="secondary" onClick={() => setListMode((current) => !current)}>
          <List className="mr-2 h-4 w-4" />
          GALLERY LIST
        </Button>
        <ExportButton data={exportRows} filename="design-gallery" />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={startCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Design
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Design" : "Add Design"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3 md:grid-cols-3">
                <Field label="Style No."><Input required value={form.styleNo} onChange={(e) => setForm({ ...form, styleNo: e.target.value })} /></Field>
                <Field label="Style Name"><Input value={form.styleName} onChange={(e) => setForm({ ...form, styleName: e.target.value })} /></Field>
                <Field label="Buyer"><Input required value={form.buyer} onChange={(e) => setForm({ ...form, buyer: e.target.value })} /></Field>
                <Field label="Brand"><Input required value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} /></Field>
                <Field label="Designer"><Input required value={form.designer} onChange={(e) => setForm({ ...form, designer: e.target.value })} /></Field>
                <Field label="Season"><Input required value={form.season} onChange={(e) => setForm({ ...form, season: e.target.value })} /></Field>
                <Field label="Status">
                  <Select value={form.status} onValueChange={(value: DesignStatus) => setForm({ ...form, status: value })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DESIGNING">Designing</SelectItem>
                      <SelectItem value="PRODUCTION">Production</SelectItem>
                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <div className="grid gap-3 md:grid-cols-[220px_1fr]">
                <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
                  {form.imageUrl ? <img src={form.imageUrl} alt="Design preview" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-muted-foreground text-sm">No image</div>}
                  {uploading && <div className="absolute inset-0 flex items-center justify-center bg-black/40"><Loader2 className="h-6 w-6 animate-spin text-white" /></div>}
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <Input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="Image URL" />
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} />
                  <Button type="button" variant="outline" onClick={() => fileRef.current?.click()} disabled={uploading}>
                    <ImagePlus className="mr-2 h-4 w-4" />
                    {uploading ? "Uploading..." : "Upload ImageKit Photo"}
                  </Button>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button disabled={saveMutation.isPending || uploading} onClick={() => saveMutation.mutate()}>
                  {saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Design
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {listMode ? (
        <DesignList designs={visibleDesigns} onEdit={startEdit} onDelete={(id) => deleteMutation.mutate(id)} />
      ) : (
        <DesignGrid designs={visibleDesigns} onEdit={startEdit} onDelete={(id) => deleteMutation.mutate(id)} />
      )}
    </div>
  );
}

function DesignGrid({ designs, onEdit, onDelete }: { designs: Design[]; onEdit: (design: Design) => void; onDelete: (id: string) => void }) {
  if (designs.length === 0) return <EmptyGallery />;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {designs.map((design) => (
        <Card key={design.id} className="overflow-hidden rounded-lg p-0">
          <div className="relative aspect-[4/2.55] bg-muted">
            <span className="absolute top-0 right-0 z-10 rounded-bl-md bg-emerald-500 px-3 py-1 font-semibold text-white text-xs">Id: {design.designId}</span>
            <span className="absolute top-4 left-4 z-10 rounded-md bg-slate-950 p-2 text-white"><Brain className="h-4 w-4" /></span>
            {design.imageUrl ? <img src={design.imageUrl} alt={design.styleNo} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-muted-foreground">No image</div>}
          </div>
          <CardContent className="space-y-3 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <CheckSquare className="h-5 w-5 shrink-0 text-muted-foreground" />
              <h3 className="truncate font-medium text-lg">{design.styleNo}</h3>
            </div>
            <div className="overflow-hidden rounded-md border text-sm">
              <InfoRow label="Buyer" value={design.buyer} />
              <InfoRow label="Designer" value={design.designer} />
              <InfoRow label="Season" value={design.season} />
              <div className="grid grid-cols-[36%_1fr] border-b">
                <div className="bg-muted/40 px-3 py-2 text-muted-foreground">Status</div>
                <div className="px-3 py-2"><Badge variant="outline" className={statusTone[design.status]}>{titleCase(design.status)}</Badge></div>
              </div>
              <div className="grid grid-cols-[36%_1fr]">
                <div className="bg-muted/40 px-3 py-2 text-muted-foreground">Info</div>
                <div className="flex gap-2 px-3 py-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(design)}><ExternalLink className="mr-2 h-3.5 w-3.5" />View Details</Button>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button size="icon" variant="ghost" onClick={() => onEdit(design)}><Pencil className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" className="text-red-600" onClick={() => onDelete(design.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function DesignList({ designs, onEdit, onDelete }: { designs: Design[]; onEdit: (design: Design) => void; onDelete: (id: string) => void }) {
  if (designs.length === 0) return <EmptyGallery />;

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Style</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Designer</TableHead>
              <TableHead>Season</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {designs.map((design) => (
              <TableRow key={design.id}>
                <TableCell>{design.designId}</TableCell>
                <TableCell className="font-medium">{design.styleNo}</TableCell>
                <TableCell>{design.buyer}</TableCell>
                <TableCell>{design.designer}</TableCell>
                <TableCell>{design.season}</TableCell>
                <TableCell><Badge variant="outline" className={statusTone[design.status]}>{titleCase(design.status)}</Badge></TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" onClick={() => onEdit(design)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" className="text-red-600" onClick={() => onDelete(design.id)}><Trash2 className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[36%_1fr] border-b">
      <div className="bg-muted/40 px-3 py-2 text-muted-foreground">{label}</div>
      <div className="truncate px-3 py-2">{value}</div>
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

function EmptyGallery() {
  return <div className="rounded-lg border py-16 text-center text-muted-foreground">No designs found.</div>;
}

function titleCase(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}
