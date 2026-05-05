"use client";

import { motion } from "framer-motion";
import { Cell, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const orderStatusData = [
  { name: "Completed", value: 400, fill: "var(--chart-1)" },
  { name: "Pending", value: 300, fill: "var(--chart-4)" },
  { name: "Delayed", value: 300, fill: "var(--chart-3)" },
];

const sampleTrackingData = [
  { name: "Afternoon", value: 500, fill: "var(--chart-5)" },
  { name: "Evening", value: 300, fill: "var(--chart-2)" },
  { name: "Morning", value: 200, fill: "var(--chart-4)" },
];

const inventoryLevelsData = [
  { name: "In Stock", value: 600, fill: "var(--chart-2)" },
  { name: "Out of Stock", value: 200, fill: "var(--chart-5)" },
  { name: "Re-Orders", value: 200, fill: "var(--chart-3)" },
];

const chartConfig = {
  // Configs are mostly for tooltips/legends in shadcn charts
  value: { label: "Value" },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
} as const;

function DonutCard({ title, data, config }: { title: string; data: any[]; config: any }) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="flex h-full flex-col rounded-2xl border-border/50 shadow-xs transition-all hover:shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pt-4 pb-0">
          <CardTitle className="font-medium text-muted-foreground text-sm">{title}</CardTitle>
          <button
            type="button"
            className="rounded border border-primary/20 px-2 py-1 text-primary text-xs transition-colors hover:bg-primary/10"
          >
            View Report
          </button>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col items-center justify-center pb-4">
          <div className="mt-2 mb-4 flex w-full justify-center gap-4 text-[10px] text-muted-foreground sm:text-xs">
            {data.map((entry, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <div className="h-1.5 w-2.5 rounded-sm" style={{ backgroundColor: entry.fill }} />
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
          <ChartContainer config={config} className="h-[180px] w-full sm:h-[220px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={80}
                strokeWidth={5}
                stroke="var(--card)"
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function DashboardCharts() {
  return (
    <motion.div
      className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 xl:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <DonutCard title="Order Status Overview" data={orderStatusData} config={chartConfig} />
      <DonutCard title="Sample Tracking" data={sampleTrackingData} config={chartConfig} />
      <DonutCard title="Inventory Levels" data={inventoryLevelsData} config={chartConfig} />
    </motion.div>
  );
}
