"use client";

import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const costingData = [
  { month: "01", value: 2.5 },
  { month: "02", value: 2.3 },
  { month: "03", value: 2.25 },
  { month: "04", value: 2.65 },
  { month: "05", value: 2.7 },
  { month: "06", value: 2.55 },
];

const suppliers = [
  { name: "Lucky yarn Tex", partner: "Gold Partner" },
  { name: "Avinash Tex com", partner: "Silver Partner" },
  { name: "Yarn Dyes", partner: "Silver Partner" },
  { name: "Jindal Buttons", partner: "Bronze Partner" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
} as const;

export function DashboardBottom() {
  return (
    <motion.div
      className="mt-6 grid grid-cols-1 gap-4 pb-12 lg:grid-cols-2 xl:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card className="h-full rounded-2xl border-border/50 shadow-xs transition-all hover:shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="font-medium text-muted-foreground text-sm">Supplier Scoreboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-3">
              {suppliers.map((supplier, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-surface-2 p-3 transition-colors hover:bg-surface-3"
                >
                  <span className="font-medium text-sm">{supplier.name}</span>
                  <span className="text-muted-foreground text-xs">- {supplier.partner}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="h-full rounded-2xl border-border/50 shadow-xs transition-all hover:shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-muted-foreground text-sm">Costing and Profitability</CardTitle>
            <button
              type="button"
              className="rounded border border-primary/20 px-2 py-1 text-primary text-xs transition-colors hover:bg-primary/10"
            >
              View Report
            </button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="mb-4">
              <span className="font-bold text-2xl text-destructive">2.568</span>
              <span className="ml-2 font-medium text-destructive text-sm">(-2.1%)</span>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={costingData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                    dy={10}
                  />
                  <YAxis
                    domain={[2.2, 2.8]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                    dx={-10}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid hsl(var(--border))",
                      backgroundColor: "hsl(var(--card))",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="var(--chart-1)"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
