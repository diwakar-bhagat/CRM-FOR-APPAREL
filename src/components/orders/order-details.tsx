"use client";

import Link from "next/link";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, CheckCircle2, Clock, Package } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Order } from "@/types/erp";

export function OrderDetails({ orderId }: { orderId: string }) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<{ order: Order }>({
    queryKey: ["orders", orderId],
    queryFn: async () => {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) throw new Error("Failed to fetch order");
      return res.json();
    },
    staleTime: 25000,
  });

  const mutation = useMutation({
    mutationFn: async (updates: Partial<Order>) => {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update order");
      return res.json();
    },
    onMutate: async (newOrderData) => {
      await queryClient.cancelQueries({ queryKey: ["orders", orderId] });
      const previousOrder = queryClient.getQueryData<{ order: Order }>(["orders", orderId]);

      if (previousOrder) {
        queryClient.setQueryData(["orders", orderId], {
          order: { ...previousOrder.order, ...newOrderData },
        });
      }
      return { previousOrder };
    },
    onError: (err, newOrderData, context) => {
      if (context?.previousOrder) {
        queryClient.setQueryData(["orders", orderId], context.previousOrder);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", orderId] });
      queryClient.invalidateQueries({ queryKey: ["priorities"] });
    },
  });

  if (isLoading) {
    return <div className="animate-pulse h-96 bg-muted/20 rounded-xl" />;
  }

  const order = data?.order;
  if (!order) return <div>Order not found</div>;

  return (
    <motion.div layoutId={`order-row-${order.id}`} className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/command-center">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{order.refNo}</h1>
          <p className="text-sm text-muted-foreground">
            {order.styleName || "No Style Name"} ({order.styleId})
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* InfoPanel (Sticky) */}
        <div className="lg:col-span-3 lg:sticky lg:top-20 h-fit space-y-6">
          <Card className="bg-background/50 backdrop-blur-[12px] saturate-[1.4] border-border/30 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground uppercase">Buyer</Label>
                <div className="font-medium">{order.buyer}</div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground uppercase">Quantity</Label>
                <div className="font-medium">{order.orderQty.toLocaleString()} pcs</div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground uppercase">Delivery Date</Label>
                <div className="font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  {format(new Date(order.deliveryDate), "MMM dd, yyyy")}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* TimelinePanel (Scroll) */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="bg-background/50 backdrop-blur-[12px] saturate-[1.4] border-border/30">
            <CardHeader>
              <CardTitle className="text-lg">Production Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <StatusUpdateRow
                label="PFH Status"
                value={order.pfhStatus}
                onChange={(v) => mutation.mutate({ pfhStatus: v })}
              />
              <StatusUpdateRow
                label="SOP Status"
                value={order.sopStatus}
                onChange={(v) => mutation.mutate({ sopStatus: v })}
              />
              <StatusUpdateRow
                label="PPM Status"
                value={order.ppmStatus}
                onChange={(v) => mutation.mutate({ ppmStatus: v })}
              />
            </CardContent>
          </Card>
        </div>

        {/* ActivityPanel (Feed) */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="bg-background/50 backdrop-blur-[12px] saturate-[1.4] border-border/30">
            <CardHeader>
              <CardTitle className="text-lg">Activity Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground text-center py-8">No recent activity.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

function StatusUpdateRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  // Determine if it's delayed or blocked to apply specific styling
  const isDelayed = value.toLowerCase().includes("delayed") || value.toLowerCase().includes("pending");
  const isBlocked = value.toLowerCase().includes("blocked") || value.toLowerCase().includes("failed");

  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-muted/20 border border-border/50">
      <div className="space-y-1">
        <Label className="text-sm font-semibold">{label}</Label>
        <div className="flex items-center gap-2">
          {isBlocked ? (
            <Badge className="bg-red-500/20 text-red-600 border-red-500 hover:bg-red-500/30">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Blocked
            </Badge>
          ) : isDelayed ? (
            <Badge
              variant="outline"
              className="text-orange-600 border-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.5)]"
            >
              <Clock className="w-3 h-3 mr-1" />
              Delayed
            </Badge>
          ) : (
            <Badge className="bg-green-500/20 text-green-600 border-green-500 hover:bg-green-500/30">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              On Track
            </Badge>
          )}
        </div>
      </div>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px] bg-background/50 backdrop-blur-sm">
          <SelectValue placeholder="Update Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
          <SelectItem value="Delayed">Delayed</SelectItem>
          <SelectItem value="Blocked">Blocked</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
