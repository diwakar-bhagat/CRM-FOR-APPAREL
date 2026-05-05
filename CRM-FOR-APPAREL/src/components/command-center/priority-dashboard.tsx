"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Activity, RefreshCcw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { CommandCenterResponse, PriorityItem, Severity } from "@/types/erp";

import { SeverityBadge } from "./severity-badge";

export function PriorityDashboard() {
  const [severityFilter, setSeverityFilter] = useState<Severity | null>(null);

  const { data, isLoading, isError, refetch, isFetching } = useQuery<CommandCenterResponse>({
    queryKey: ["priorities", { severity: severityFilter }],
    queryFn: async () => {
      const url = severityFilter ? `/api/command-center?severity=${severityFilter}` : "/api/command-center";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch priorities");
      return res.json();
    },
    refetchInterval: 30000, // auto refresh every 30s
    staleTime: 25000, // slightly less than interval to prevent redundant fetches
  });

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-red-500/20 bg-red-50/50">
        <div className="text-center">
          <p className="text-sm font-medium text-red-600">Failed to load priority data</p>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const { priorities = [], summary, meta } = data || {};

  return (
    <div className="flex flex-col gap-6">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2 text-foreground">
            <Activity className="w-6 h-6 text-primary" />
            Command Center
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time actionable insights driven by deterministic ERP constraints.
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm">
          {meta?.computedAt && (
            <span className="text-muted-foreground flex items-center gap-1">
              {meta.cached && (
                <Badge variant="secondary" className="text-xs mr-2">
                  Cached
                </Badge>
              )}
              Updated {formatDistanceToNow(parseISO(meta.computedAt), { addSuffix: true })}
            </span>
          )}
          <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching} className="h-8 gap-2">
            <RefreshCcw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading && !data ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse bg-muted/20 border-border/50">
              <CardHeader className="p-4">
                <div className="h-4 w-16 bg-muted rounded" />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-8 w-12 bg-muted rounded" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <KpiCard
              title="Critical"
              count={summary?.critical || 0}
              variant="critical"
              isActive={severityFilter === "critical"}
              onClick={() => setSeverityFilter((prev) => (prev === "critical" ? null : "critical"))}
            />
            <KpiCard
              title="High"
              count={summary?.high || 0}
              variant="high"
              isActive={severityFilter === "high"}
              onClick={() => setSeverityFilter((prev) => (prev === "high" ? null : "high"))}
            />
            <KpiCard
              title="Medium"
              count={summary?.medium || 0}
              variant="medium"
              isActive={severityFilter === "medium"}
              onClick={() => setSeverityFilter((prev) => (prev === "medium" ? null : "medium"))}
            />
            <KpiCard
              title="Low"
              count={summary?.low || 0}
              variant="low"
              isActive={severityFilter === "low"}
              onClick={() => setSeverityFilter((prev) => (prev === "low" ? null : "low"))}
            />
          </>
        )}
      </div>

      {/* Priority List */}
      <Card className="shadow-sm border-border overflow-hidden bg-card backdrop-blur-[12px] saturate-[1.4] border-border/30">
        <CardHeader className="bg-muted border-b pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Ranked Action List</CardTitle>
              <CardDescription>Attention required ranked by cascade risk and delivery deadlines.</CardDescription>
            </div>
            {severityFilter && (
              <Badge variant="outline" className="cursor-pointer" onClick={() => setSeverityFilter(null)}>
                Clear Filter: {severityFilter} ✕
              </Badge>
            )}
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[100px]">Order Ref</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Triggers</TableHead>
                <TableHead className="w-[300px]">Recommended Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && !data ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground animate-pulse">
                    Analyzing ERP datastreams...
                  </TableCell>
                </TableRow>
              ) : priorities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <p className="text-muted-foreground">No active priority signals detected.</p>
                  </TableCell>
                </TableRow>
              ) : (
                priorities.map((item: PriorityItem) => (
                  <TableRow
                    key={item.orderId}
                    className="hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => (window.location.href = `/dashboard/orders/${item.orderId}`)}
                  >
                    <TableCell className="font-mono text-xs font-medium">{item.refNo}</TableCell>
                    <TableCell>
                      <SeverityBadge severity={item.severity} />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{new Date(item.deliveryDate).toLocaleDateString()}</span>
                        {item.reasonCodes?.includes("CRITICAL_DEADLINE") && (
                          <span className="text-xs text-red-500 font-semibold mt-0.5">At Risk</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{item.buyer}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                        {item.reasonCodes?.map((code) => (
                          <Badge
                            key={code}
                            variant="secondary"
                            className="text-[10px] uppercase tracking-wider py-0 px-1.5 font-medium bg-muted/60"
                          >
                            {code.replace(/_/g, " ")}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="p-2.5 rounded-md bg-accent/30 border border-accent/50 text-sm font-medium text-accent-foreground leading-snug">
                        {item.recommendedAction}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

function KpiCard({
  title,
  count,
  variant,
  isActive,
  onClick,
}: {
  title: string;
  count: number;
  variant: "critical" | "high" | "medium" | "low";
  isActive?: boolean;
  onClick?: () => void;
}) {
  const styles = {
    critical: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
    high: "border-orange-500/30 bg-orange-500/10 text-orange-600 dark:text-orange-400",
    medium: "border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    low: "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
  };

  return (
    <Card
      onClick={onClick}
      className={cn(
        "overflow-hidden transition-all hover:shadow-md cursor-pointer",
        "backdrop-blur-[12px] saturate-[1.4] border border-border bg-card",
        isActive ? "ring-2 ring-primary ring-offset-1" : "",
        isActive ? styles[variant] : "hover:border-primary/50",
      )}
    >
      <CardHeader className="p-4 pb-2">
        <CardDescription
          className={cn(
            "uppercase tracking-wider font-semibold text-xs opacity-80",
            isActive ? "" : styles[variant].split(" ")[2],
          )}
        >
          {title}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className={cn("text-3xl font-bold tracking-tighter", isActive ? "" : styles[variant].split(" ")[2])}>
          {count}
        </div>
      </CardContent>
    </Card>
  );
}
