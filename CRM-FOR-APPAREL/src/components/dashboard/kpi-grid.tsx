"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, Package, Truck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const kpis = [
  {
    title: "Total Orders",
    value: "1,225",
    icon: Package,
    color: "text-[var(--chart-1)]",
  },
  {
    title: "Completed Orders",
    value: "900",
    icon: CheckCircle,
    color: "text-[var(--chart-2)]",
  },
  {
    title: "Delayed Orders",
    value: "69",
    icon: Clock,
    color: "text-[var(--chart-3)]",
  },
  {
    title: "Pending Shipments",
    value: "112",
    icon: Truck,
    color: "text-[var(--chart-4)]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
} as const;

export function KPIGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {kpis.map((kpi, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card className="rounded-2xl border-border/50 bg-card shadow-xs transition-shadow hover:shadow-sm">
            <CardContent className="flex flex-col items-center justify-center space-y-3 p-6 text-center">
              <div className={`rounded-xl bg-muted/50 p-3 ${kpi.color}`}>
                <kpi.icon className="h-6 w-6" />
              </div>
              <p className="font-medium text-muted-foreground text-sm">{kpi.title}</p>
              <h2 className="font-bold text-3xl tracking-tight">{kpi.value}</h2>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
