"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import {
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  Columns3,
  Download,
  ExternalLink,
  FileText,
  Filter,
  ImageIcon,
  Info,
  Plus,
  Save,
  Search,
  Table2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Order } from "@/types/erp";

type OperationsMode =
  | "merchant"
  | "task-manager"
  | "material-requisition"
  | "fabric-working"
  | "design-gallery"
  | "notifications"
  | "sample-create"
  | "sample-assign"
  | "sampling-status"
  | "sample-tracking"
  | "style-repository"
  | "style-databank"
  | "inventory"
  | "production"
  | "suppliers"
  | "costing"
  | "generic";

type OperationsScreenProps = {
  mode: OperationsMode;
  title?: string;
  description?: string;
};

type OrdersResponse = {
  orders: Order[];
};

const buyerNames = ["ZARA", "H&M", "CECIL", "STREET ONE", "PULL&BEAR", "AMERICAN EAGLE"];
const designers = ["MANSI KAPOOR", "TAMANNA", "SIMRAN SAHU", "VIBHA KOCHAR", "PRIYA BHARTIYA"];
const departments = ["DESIGNING", "MERCHANDISING", "FABRIC SOURCING", "FABRIC STORE", "TEXTILE DESIGNING"];

const fetchOrders = async () => {
  const res = await fetch("/api/orders");
  if (!res.ok) throw new Error("Failed to fetch orders");
  const data = (await res.json()) as OrdersResponse;
  return data.orders ?? [];
};

const formatDate = (value?: Date | string | null) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(date);
};

const displayRef = (order: Order, index: number) => order.refNo ?? `CTA/${String(26030000 + index).padStart(8, "0")}`;
const displayVgRef = (index: number) => `CTA/${String(392 + index).padStart(6, "0")}`;
const displayBuyer = (order: Order, index: number) => order.buyer || buyerNames[index % buyerNames.length];
const displayBrand = (order: Order, index: number) => order.brand ?? displayBuyer(order, index);
const displayStyle = (order: Order, index: number) => order.styleName ?? order.styleId ?? `Style ${index + 1}`;

function RefBadge({
  children,
  tone = "green",
}: {
  children: React.ReactNode;
  tone?: "green" | "yellow" | "blue" | "red";
}) {
  const styles = {
    green: "border-emerald-300 bg-emerald-50 text-emerald-700",
    yellow: "border-amber-300 bg-amber-50 text-amber-700",
    blue: "border-blue-300 bg-blue-50 text-blue-700",
    red: "border-red-300 bg-red-50 text-red-700",
  };

  return <span className={cn("rounded-md border px-1.5 py-0.5 font-medium text-xs", styles[tone])}>{children}</span>;
}

function CountBadge({ value, tone }: { value: ReactNode; tone: "red" | "orange" | "green" | "blue" | "gray" }) {
  const styles = {
    red: "bg-red-500 text-white",
    orange: "bg-orange-500 text-white",
    green: "bg-green-600 text-white",
    blue: "bg-blue-700 text-white",
    gray: "bg-muted text-muted-foreground",
  };

  return (
    <span className={cn("inline-flex min-w-7 justify-center rounded-md px-2 py-1 font-semibold text-xs", styles[tone])}>
      {value}
    </span>
  );
}

function Toolbar({ task = false }: { task?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {task && (
        <>
          <Button variant="outline" className="gap-2 border-blue-100 bg-blue-50 text-blue-700">
            <Info className="size-4" />
            Status Info
          </Button>
          <Button variant="outline" className="gap-2 border-purple-100 bg-purple-50 text-purple-700">
            <CalendarDays className="size-4" />
            Bulk Flow
          </Button>
          <Button variant="outline" className="gap-2 border-sky-100 bg-sky-50 text-sky-700">
            <Filter className="size-4" />
            Sort By Delivery Date
          </Button>
          <Button variant="outline" className="gap-2 border-purple-100 bg-purple-50 text-purple-700">
            <Columns3 className="size-4" />
            Columns
          </Button>
        </>
      )}
      <div className="ml-auto flex min-w-0 flex-wrap items-center gap-3">
        <Button variant="outline" className="min-w-44 justify-between">
          Buyer
          <ChevronDown className="size-4" />
        </Button>
        <div className="relative">
          <Search className="-translate-y-1/2 absolute top-1/2 right-3 size-4 text-muted-foreground" />
          <Input className="w-60 pr-9" placeholder="Search / Filter" />
        </div>
        {task && (
          <Button variant="outline" className="min-w-40 justify-between">
            Delivery Date: All
            <CalendarDays className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

function HighlightTable({ title, rows, tone }: { title: string; rows: Order[]; tone: "green" | "yellow" | "blue" }) {
  return (
    <Card className="min-h-[300px] rounded-lg py-0">
      <CardHeader className="border-b bg-muted/30 py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-semibold text-xl">{title}</CardTitle>
          <ExternalLink className="size-4" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reff No.</TableHead>
              <TableHead>VG Reff No.</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Style No.</TableHead>
              <TableHead>Style Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((order, index) => (
              <TableRow key={`${order.id}-${title}`}>
                <TableCell>
                  <RefBadge tone={index % 4 === 0 ? "yellow" : tone}>{displayRef(order, index)}</RefBadge>
                </TableCell>
                <TableCell>{displayVgRef(index)}</TableCell>
                <TableCell>{displayBuyer(order, index)}</TableCell>
                <TableCell>{displayBrand(order, index)}</TableCell>
                <TableCell>{order.styleId}</TableCell>
                <TableCell>{displayStyle(order, index)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right text-sm text-muted-foreground">
          1-{Math.min(rows.length, 7)} of {rows.length}
        </div>
      </CardContent>
    </Card>
  );
}

function MerchantDashboard({ orders }: { orders: Order[] }) {
  const sample = orders.slice(0, 10);
  const risk = orders.filter((order) => order.approvalPending || order.pfhStatus !== "approved").slice(0, 5);
  const ppm = orders.filter((order) => order.ppmStatus).slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-10">
        <Button variant="ghost" className="gap-2 border-b-2 border-red-400 text-red-500">
          <Table2 className="size-5" />
          Dashboard
        </Button>
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => window.location.assign("/dashboard/merchant/task-manager")}
        >
          <Table2 className="size-5" />
          Task Manager
        </Button>
      </div>
      <section className="space-y-4">
        <Toolbar />
        <h2 className="font-semibold text-2xl tracking-tight">Overall Highlights</h2>
        <div className="grid gap-4 xl:grid-cols-3">
          <HighlightTable title="Production File Handover" rows={sample.slice(0, 7)} tone="green" />
          <HighlightTable title="Risk Analysis" rows={(risk.length ? risk : sample).slice(0, 3)} tone="yellow" />
          <HighlightTable title="PPM Report" rows={(ppm.length ? ppm : sample).slice(0, 4)} tone="blue" />
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="font-semibold text-2xl tracking-tight">Mill Highlights</h2>
        <div className="grid gap-4 xl:grid-cols-2">
          <ReportCard
            title="Lab Dip, Strike Off & Yardage Reports"
            orders={orders.slice(0, 7)}
            status="Sent"
            count={78}
          />
          <ReportCard title="Bulk Process FOB Approvals" orders={orders.slice(2, 6)} status="sent" count={4} />
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="font-semibold text-2xl tracking-tight">Production Highlights</h2>
        <div className="grid gap-4 xl:grid-cols-2">
          <ReportCard title="Initial / R&D SOP Report" orders={orders.slice(4, 10)} status="sent" count={8} />
          <ReportCard title="Bulk Embroidery Order" orders={orders.slice(8, 14)} status="All" count={orders.length} />
        </div>
      </section>
    </div>
  );
}

function ReportCard({
  title,
  orders,
  status,
  count,
}: {
  title: string;
  orders: Order[];
  status: string;
  count: number;
}) {
  return (
    <Card className="rounded-lg py-0">
      <CardHeader className="border-b bg-muted/30 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Filter className="size-4 text-purple-600" />
            <span className="font-semibold">Status:</span>
            <Button variant="outline" className="min-w-28 justify-between">
              {status}
              <ChevronDown className="size-4" />
            </Button>
          </div>
          <Badge className="bg-blue-500">{count} items</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-xl">{title}</h3>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-2 border-green-200 text-green-700">
              <Download className="size-4" />
              Export
            </Button>
            <ExternalLink className="size-4" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>Reff No.</TableHead>
              <TableHead>VG Reff No.</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Deadline Margin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => {
              const overdue = index % 3 === 0;
              return (
                <TableRow key={`${order.id}-${title}`}>
                  <TableCell>
                    <Check className="size-5 text-green-600" />
                  </TableCell>
                  <TableCell>
                    <RefBadge tone={index % 2 ? "blue" : "yellow"}>{displayRef(order, index)}</RefBadge>
                  </TableCell>
                  <TableCell>{displayVgRef(index)}</TableCell>
                  <TableCell>{displayBuyer(order, index)}</TableCell>
                  <TableCell>{displayBrand(order, index)}</TableCell>
                  <TableCell>
                    <CountBadge
                      value={overdue ? `-${index + 1}d` : `+${index + 2}d`}
                      tone={overdue ? "red" : "green"}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function TaskManager({ orders }: { orders: Order[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-10">
        <Button variant="ghost" className="gap-2" onClick={() => window.location.assign("/dashboard/merchant")}>
          <Table2 className="size-5" />
          Dashboard
        </Button>
        <Button variant="ghost" className="gap-2 border-b-2 border-blue-700 text-blue-700">
          <Table2 className="size-5" />
          Task Manager
        </Button>
      </div>
      <Toolbar task />
      <Card className="overflow-hidden rounded-lg py-0">
        <div className="overflow-auto">
          <Table className="min-w-[1500px]">
            <TableHeader className="bg-purple-100">
              <TableRow>
                <TableHead>Style Name</TableHead>
                <TableHead>Order Qty</TableHead>
                <TableHead>VG Linked</TableHead>
                <TableHead>RA</TableHead>
                <TableHead>Fabrics</TableHead>
                <TableHead>Trims</TableHead>
                <TableHead>Bulk Process</TableHead>
                <TableHead>FOB</TableHead>
                <TableHead>Bulk Emb.</TableHead>
                <TableHead>R&D Graded Pattern</TableHead>
                <TableHead>PFH</TableHead>
                <TableHead>R&D</TableHead>
                <TableHead>SOP</TableHead>
                <TableHead>PPM</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.slice(0, 41).map((order, index) => {
                const overdue = index % 5 === 0;
                return (
                  <TableRow key={order.id} className={index % 2 ? "bg-muted/20" : undefined}>
                    <TableCell className="bg-purple-50 font-medium">{displayStyle(order, index)}</TableCell>
                    <TableCell className="bg-purple-50 font-semibold">
                      {Number(order.orderQty || 0).toFixed(1)}
                    </TableCell>
                    <TableCell>
                      <CountBadge value={<Check className="size-3" />} tone="green" />
                    </TableCell>
                    <TableCell>
                      <CountBadge
                        value={overdue ? `-${index + 2}` : <Check className="size-3" />}
                        tone={overdue ? "red" : "green"}
                      />
                    </TableCell>
                    <TableCell>
                      <StageCounts index={index} />
                    </TableCell>
                    <TableCell>
                      <StageCounts index={index + 3} />
                    </TableCell>
                    <TableCell>{index % 3 === 0 ? <CountBadge value={index % 7} tone="green" /> : "-"}</TableCell>
                    <TableCell>{index % 4 === 0 ? <CountBadge value={1} tone="orange" /> : "-"}</TableCell>
                    <TableCell>{overdue ? <CountBadge value={`-${index + 7}`} tone="red" /> : "-"}</TableCell>
                    <TableCell>
                      {index % 2 === 0 ? <CountBadge value={<Check className="size-3" />} tone="green" /> : "-"}
                    </TableCell>
                    <TableCell>
                      {overdue ? <CountBadge value="-18" tone="red" /> : <CountBadge value="+15" tone="orange" />}
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>{index % 6 === 0 ? <CountBadge value="+46" tone="orange" /> : "-"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-muted-foreground">
          <span>Records per page: 100</span>
          <span>
            1 - {Math.min(orders.length, 41)} of {Math.min(orders.length, 41)}
          </span>
        </div>
      </Card>
    </div>
  );
}

function StageCounts({ index }: { index: number }) {
  return (
    <div className="flex items-center gap-2">
      <CountBadge value={index % 4} tone="red" />
      <CountBadge value={(index + 2) % 8} tone="orange" />
      <CountBadge value={(index + 1) % 5} tone="green" />
      <CountBadge value={index % 3} tone="blue" />
      <ChevronDown className="size-4" />
    </div>
  );
}

function MaterialRequisition({ orders }: { orders: Order[] }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2 border-purple-400 text-purple-700">
              <Plus className="size-4" />
              Create New
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-6xl overflow-auto">
            <DialogHeader className="bg-cyan-400 px-4 py-3 text-white">
              <DialogTitle>Add New - FABRIC</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 p-2 md:grid-cols-3">
              {[
                "Requisition No.",
                "Item: Fabric",
                "Reqn Type: Local",
                "Requisition Date",
                "Company",
                "Merchandiser",
                "Requisition For",
                "Buyer",
                "Season",
                "For Location",
                "Prepared By",
                "Dept From",
                "Dept To",
              ].map((field) => (
                <Input
                  key={field}
                  placeholder={field}
                  defaultValue={field.includes(":") ? field.split(": ")[1] : undefined}
                />
              ))}
            </div>
            <div className="mt-4 border">
              <div className="bg-green-600 px-4 py-3 font-semibold text-white">Details</div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button size="icon" variant="outline">
                        <Plus className="size-4" />
                      </Button>
                    </TableHead>
                    {[
                      "Item Category",
                      "Item Desc",
                      "Color",
                      "Width",
                      "Unit",
                      "Reqn Qty",
                      "Rate",
                      "Reqd On",
                      "Remark",
                    ].map((head) => (
                      <TableHead key={head}>{head}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
              </Table>
            </div>
            <Button className="mt-6 w-fit gap-2">
              <Save className="size-4" />
              Save
            </Button>
          </DialogContent>
        </Dialog>
        <Button variant="outline" className="ml-auto min-w-44 justify-between">
          Type: Fabric <ChevronDown className="size-4" />
        </Button>
        <Input className="w-60" placeholder="Search / Filter" />
      </div>
      <DataTable
        title="Material Requisition"
        orders={orders}
        columns={["Created Date", "Merchant", "Prepared By", "Department From", "Item Type"]}
      />
    </div>
  );
}

function DataTable({ title, orders, columns }: { title: string; orders: Order[]; columns: string[] }) {
  return (
    <Card className="rounded-lg py-0">
      <CardHeader className="border-b py-4">
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Our Ref</TableHead>
              {columns.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.slice(0, 20).map((order, index) => (
              <TableRow key={`${title}-${order.id}`}>
                <TableCell>{displayVgRef(index)}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>{designers[index % designers.length]}</TableCell>
                <TableCell>{designers[(index + 2) % designers.length]}</TableCell>
                <TableCell>{departments[index % departments.length]}</TableCell>
                <TableCell>Fabric</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function FabricWorking({ orders }: { orders: Order[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="font-semibold text-2xl">Fabric Reports</h2>
        <Input className="w-60" placeholder="Filter / Search" />
      </div>
      <Card className="rounded-lg py-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                {[
                  "Action",
                  "Created At",
                  "Our Ref",
                  "Order No",
                  "PO No",
                  "User Created",
                  "Order Qty",
                  "Qty Unit",
                  "Style No",
                  "Order Date",
                  "Status",
                ].map((head) => (
                  <TableHead key={head}>{head}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.slice(0, 22).map((order, index) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Button size="icon" variant="outline">
                      <FileText className="size-4" />
                    </Button>
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{displayVgRef(index)}</TableCell>
                  <TableCell>{displayVgRef(index)}</TableCell>
                  <TableCell>{String(55713 + index)}...</TableCell>
                  <TableCell>{designers[index % designers.length]}</TableCell>
                  <TableCell>{Number(order.orderQty || 0).toFixed(1)}</TableCell>
                  <TableCell>PCS</TableCell>
                  <TableCell>{order.styleId}</TableCell>
                  <TableCell>{formatDate(order.deliveryDate)}</TableCell>
                  <TableCell
                    className={index % 6 === 0 ? "font-semibold text-orange-600" : "font-semibold text-green-700"}
                  >
                    {index % 6 === 0 ? "Revised" : "Approved"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function DesignGallery({ orders }: { orders: Order[] }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <h2 className="font-semibold text-2xl">Design Gallery</h2>
        <div className="ml-auto flex flex-wrap gap-3">
          <Input className="w-60" placeholder="Filter" />
          <Button variant="outline" className="min-w-40 justify-between">
            Buyer <ChevronDown className="size-4" />
          </Button>
          <Button className="bg-emerald-500">Apply</Button>
          <Button variant="secondary">Clear</Button>
          <Button>Gallery List</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {orders.slice(0, 12).map((order, index) => (
          <Card key={order.id} className="overflow-hidden rounded-lg py-0">
            <div className="relative flex aspect-[4/2.5] items-center justify-center bg-muted">
              <ImageIcon className="size-12 text-muted-foreground" />
              <Badge className="absolute top-0 right-0 rounded-none bg-emerald-400">Id: {21900 + index}</Badge>
            </div>
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center gap-3 text-xl">
                <span className="size-5 rounded border" />
                {displayStyle(order, index)}
              </div>
              <div className="grid grid-cols-[7rem_1fr] overflow-hidden rounded-md border text-sm">
                <div className="border-r px-3 py-2 text-muted-foreground">Buyer</div>
                <div className="px-3 py-2">{displayBuyer(order, index)}</div>
                <div className="border-r border-t px-3 py-2 text-muted-foreground">Designer</div>
                <div className="border-t px-3 py-2">{designers[index % designers.length]}</div>
                <div className="border-r border-t px-3 py-2 text-muted-foreground">Season</div>
                <div className="border-t px-3 py-2">{index % 2 ? "SS26" : "FW26"}</div>
                <div className="border-r border-t px-3 py-2 text-muted-foreground">Status</div>
                <div className="border-t px-3 py-2">
                  <Badge variant="outline" className="text-emerald-700">
                    Production
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Notifications({ orders }: { orders: Order[] }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="font-semibold text-3xl">Unread Notifications</h2>
        <Input className="w-72" placeholder="Search / Filter" />
      </div>
      {orders.slice(0, 12).map((order, index) => (
        <Card key={order.id} className="rounded-lg border-purple-500 py-0">
          <CardContent className="flex items-center gap-4 p-4">
            <Bell className="size-5 text-purple-600" />
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-purple-700">
                Ref No: {displayRef(order, index)}, Style Name: {displayStyle(order, index)}
              </div>
              <p className="text-muted-foreground">
                Reference number {displayRef(order, index)} has been created sampling request by{" "}
                {designers[index % designers.length]}.
              </p>
            </div>
            <Badge className="bg-purple-500">New</Badge>
            <span className="text-sm text-muted-foreground">{index + 1} hr ago</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function GenericModule({
  title,
  description,
  orders,
  mode,
}: {
  title: string;
  description?: string;
  orders: Order[];
  mode: OperationsMode;
}) {
  if (mode === "material-requisition") return <MaterialRequisition orders={orders} />;
  if (mode === "fabric-working") return <FabricWorking orders={orders} />;
  if (mode === "design-gallery") return <DesignGallery orders={orders} />;
  if (mode === "notifications") return <Notifications orders={orders} />;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-2xl">{title}</h2>
        {description && <p className="mt-1 text-muted-foreground">{description}</p>}
      </div>
      <Toolbar task={mode === "production"} />
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{orders.length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Buyers</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{new Set(orders.map((o) => o.buyer)).size}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Open Actions</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{orders.filter((o) => o.approvalPending).length}</CardContent>
        </Card>
      </div>
      <DataTable
        title={title}
        orders={orders}
        columns={["Created Date", "Merchant", "Prepared By", "Department From", "Item Type"]}
      />
    </div>
  );
}

export function OperationsScreen({ mode, title, description }: OperationsScreenProps) {
  const { data, isLoading, error } = useQuery({ queryKey: ["cta-operations-orders"], queryFn: fetchOrders });
  const orders = useMemo(() => data ?? [], [data]);

  if (isLoading) {
    return <div className="p-10 text-muted-foreground">Loading CTA operational data...</div>;
  }

  if (error) {
    return (
      <div className="p-10 text-red-600">
        Unable to load orders. Check the Neon database connection and /api/orders.
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-10 text-muted-foreground">
        No order data found. Run the setup and seed endpoints before using this module.
      </div>
    );
  }

  if (mode === "merchant") return <MerchantDashboard orders={orders} />;
  if (mode === "task-manager") return <TaskManager orders={orders} />;

  return <GenericModule title={title ?? "CTA Operations"} description={description} orders={orders} mode={mode} />;
}
