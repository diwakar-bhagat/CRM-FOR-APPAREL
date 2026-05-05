"use client";

import { Cell, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const stageData = [
  { name: "Initiation", value: 2, fill: "var(--color-initiation)" },
  { name: "Planning", value: 1, fill: "var(--color-planning)" },
  { name: "Execution", value: 2, fill: "var(--color-execution)" },
  { name: "Evaluation", value: 1, fill: "var(--color-evaluation)" },
];

const chartConfig = {
  initiation: { color: "var(--chart-1)", label: "Initiation" },
  planning: { color: "var(--chart-2)", label: "Planning" },
  execution: { color: "var(--chart-3)", label: "Execution" },
  evaluation: { color: "var(--chart-4)", label: "Evaluation" },
} satisfies ChartConfig;

export function TNAStageDistribution() {
  const total = stageData.reduce((sum, d) => sum + d.value, 0);

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="font-medium text-sm">Stage Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <ChartContainer config={chartConfig} className="h-[140px] w-[140px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={stageData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={36}
              outerRadius={60}
              strokeWidth={2}
              stroke="hsl(var(--background))"
            >
              {stageData.map((entry, _i) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col gap-2">
          {stageData.map((item, i) => {
            const keys = Object.keys(chartConfig);
            const color = chartConfig[keys[i] as keyof typeof chartConfig]?.color;
            return (
              <div key={item.name} className="flex items-center gap-2">
                <div className="size-2.5 shrink-0 rounded-full" style={{ background: color }} />
                <span className="text-muted-foreground text-xs">{item.name}</span>
                <span className="ml-auto font-medium text-xs tabular-nums">{item.value}</span>
                <span className="text-[10px] text-muted-foreground tabular-nums">
                  ({Math.round((item.value / total) * 100)}%)
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
