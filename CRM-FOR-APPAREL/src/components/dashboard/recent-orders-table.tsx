"use client";

import { ExportButton } from "@/components/dashboard/export-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const recentOrders = [
  {
    id: "PO-2023-089",
    buyer: "H&M",
    style: "AW23-JK-01",
    quantity: "15,000",
    shipDate: "Oct 15, 2023",
    status: "delayed",
    progress: 35,
  },
  {
    id: "PO-2023-092",
    buyer: "Zara",
    style: "SS24-DR-12",
    quantity: "8,500",
    shipDate: "Nov 01, 2023",
    status: "on-track",
    progress: 72,
  },
  {
    id: "PO-2023-085",
    buyer: "Uniqlo",
    style: "AW23-SW-05",
    quantity: "22,000",
    shipDate: "Sep 30, 2023",
    status: "at-risk",
    progress: 88,
  },
  {
    id: "PO-2023-078",
    buyer: "Mango",
    style: "AW23-PT-08",
    quantity: "5,000",
    shipDate: "Sep 20, 2023",
    status: "completed",
    progress: 100,
  },
  {
    id: "PO-2023-094",
    buyer: "Primark",
    style: "AW23-TS-02",
    quantity: "45,000",
    shipDate: "Dec 10, 2023",
    status: "on-track",
    progress: 15,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "delayed":
      return (
        <Badge variant="outline" className="border-status-delayed/20 bg-status-delayed/10 text-status-delayed">
          Delayed
        </Badge>
      );
    case "at-risk":
      return (
        <Badge variant="outline" className="border-status-at-risk/20 bg-status-at-risk/10 text-status-at-risk">
          At Risk
        </Badge>
      );
    case "completed":
      return (
        <Badge variant="outline" className="border-status-completed/20 bg-status-completed/10 text-status-completed">
          Completed
        </Badge>
      );
    case "on-track":
      return (
        <Badge variant="outline" className="border-status-on-track/20 bg-status-on-track/10 text-status-on-track">
          On Track
        </Badge>
      );
    default:
      return null;
  }
};

const getProgressColor = (status: string) => {
  switch (status) {
    case "delayed":
      return "bg-status-delayed";
    case "at-risk":
      return "bg-status-at-risk";
    case "completed":
      return "bg-status-completed";
    case "on-track":
      return "bg-status-on-track";
    default:
      return "bg-primary";
  }
};

export function RecentOrdersTable() {
  return (
    <Card className="h-full border-border/50 bg-surface-1/50 backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="font-medium text-foreground text-lg">Active Production Orders</CardTitle>
        <ExportButton data={recentOrders} filename="production-orders" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="border-border/50 border-b bg-surface-2/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-medium text-foreground-subtle">PO Number</TableHead>
              <TableHead className="font-medium text-foreground-subtle">Buyer/Style</TableHead>
              <TableHead className="font-medium text-foreground-subtle">Quantity</TableHead>
              <TableHead className="font-medium text-foreground-subtle">Ship Date</TableHead>
              <TableHead className="font-medium text-foreground-subtle">Status</TableHead>
              <TableHead className="w-[150px] font-medium text-foreground-subtle">Timeline</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order, _index) => (
              <TableRow
                key={order.id}
                className="cursor-pointer border-border/20 border-b transition-colors hover:bg-surface-2/50"
              >
                <TableCell className="font-mono text-foreground text-sm">{order.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{order.buyer}</span>
                    <span className="text-foreground-subtle text-xs">{order.style}</span>
                  </div>
                </TableCell>
                <TableCell className="text-foreground">{order.quantity}</TableCell>
                <TableCell className="text-foreground-subtle text-sm">{order.shipDate}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={order.progress}
                      className="h-1.5 bg-surface-3"
                      indicatorClassName={getProgressColor(order.status)}
                    />
                    <span className="w-8 text-right text-foreground-subtle text-xs">{order.progress}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
