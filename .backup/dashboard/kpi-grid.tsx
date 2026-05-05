"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Package, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const kpis = [
  {
    title: "Active Orders",
    value: "124",
    change: "+12.5%",
    trend: "up",
    icon: Package,
    color: "text-foreground",
  },
  {
    title: "At Risk (TNA)",
    value: "12",
    change: "-2",
    trend: "down",
    icon: AlertCircle,
    color: "text-status-at-risk",
  },
  {
    title: "Delayed",
    value: "4",
    change: "+1",
    trend: "up",
    icon: AlertCircle,
    color: "text-status-delayed",
  },
  {
    title: "Completed (30d)",
    value: "89",
    change: "+24%",
    trend: "up",
    icon: CheckCircle2,
    color: "text-status-completed",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export function KPIGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {kpis.map((kpi, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card className="bg-surface-1/50 backdrop-blur-md border-border/50 shadow-sm hover:border-border transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-foreground-subtle">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              <p className="text-xs mt-1 text-foreground-muted">
                <span
                  className={
                    kpi.trend === "up" && kpi.color !== "text-status-delayed"
                      ? "text-status-on-track"
                      : "text-status-delayed"
                  }
                >
                  {kpi.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
