"use client";

import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Heatmap: rows = tasks, columns = weeks, intensity = days of work in that week
const tasks = ["Techpack", "Fabric Sourcing", "Sample Dev", "Fabric Cutting", "Inspection", "Packing & QC"];
const weeks = ["W1 (May 8)", "W2 (May 15)", "W3 (May 22)", "W4 (May 29)", "W5 (Jun 5)"];

// Each value: 0 = no work, 1-2 = light, 3-5 = medium, 6-7 = heavy
const heatmapData: number[][] = [
  [1, 0, 0, 0, 0], // Techpack
  [0, 0, 3, 0, 0], // Fabric Sourcing
  [5, 0, 0, 0, 0], // Sample Dev
  [3, 7, 7, 5, 1], // Fabric Cutting
  [0, 5, 7, 1, 0], // Inspection
  [6, 1, 0, 0, 0], // Packing & QC
];

function getHeatColor(value: number): string {
  if (value === 0) return "var(--surface-2)";
  if (value <= 2) return "var(--chart-2)";
  if (value <= 4) return "var(--chart-1)";
  return "var(--chart-4)";
}

function getOpacity(value: number): number {
  if (value === 0) return 0.3;
  if (value <= 2) return 0.5;
  if (value <= 4) return 0.75;
  return 1;
}

export function TNADurationHeatmap() {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="font-medium text-sm">Duration Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider delayDuration={100}>
          <div className="overflow-x-auto">
            <div className="min-w-[420px]">
              {/* Column Headers */}
              <div className="mb-1 grid gap-1" style={{ gridTemplateColumns: `120px repeat(${weeks.length}, 1fr)` }}>
                <div />
                {weeks.map((w) => (
                  <div key={w} className="truncate px-0.5 text-center font-medium text-[10px] text-muted-foreground">
                    {w}
                  </div>
                ))}
              </div>
              {/* Rows */}
              {tasks.map((task, rowIdx) => (
                <div
                  key={task}
                  className="mb-1 grid gap-1"
                  style={{ gridTemplateColumns: `120px repeat(${weeks.length}, 1fr)` }}
                >
                  <div className="flex items-center truncate pr-2 text-muted-foreground text-xs">{task}</div>
                  {heatmapData[rowIdx].map((val, colIdx) => (
                    <Tooltip key={`${task}-${weeks[colIdx]}`}>
                      <TooltipTrigger asChild>
                        <motion.div
                          className="h-8 cursor-pointer rounded-md"
                          style={{
                            background: `hsl(${getHeatColor(val)})`,
                            opacity: getOpacity(val),
                          }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2, delay: rowIdx * 0.04 + colIdx * 0.02 }}
                          whileHover={{ scale: 1.1 }}
                        />
                      </TooltipTrigger>
                      <TooltipContent className="text-xs">
                        <span className="font-medium">{task}</span> — {weeks[colIdx]}
                        <br />
                        {val === 0 ? "No activity" : `${val} active day${val > 1 ? "s" : ""}`}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              ))}
              {/* Legend */}
              <div className="mt-3 flex items-center gap-3 border-border/50 border-t pt-2">
                <span className="text-[10px] text-muted-foreground">Intensity:</span>
                {[
                  { label: "None", value: 0 },
                  { label: "Low", value: 1 },
                  { label: "Med", value: 3 },
                  { label: "High", value: 7 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1">
                    <div
                      className="size-3 rounded-sm"
                      style={{
                        background: `hsl(${getHeatColor(item.value)})`,
                        opacity: getOpacity(item.value),
                      }}
                    />
                    <span className="text-[10px] text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
