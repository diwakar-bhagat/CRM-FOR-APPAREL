"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";

import { TNAProgressOverview } from "../tna-tracker/_components/tna-progress-overview";
import { ActivityFeed } from "./_components/activity-feed";
import { AlertsPanel } from "./_components/alerts-panel";
import { KPICards } from "./_components/kpi-cards";
import { OrdersAtRiskTable } from "./_components/orders-at-risk-table";

export default function Page() {
  const today = format(new Date(), "EEEE, do MMMM yyyy");

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <motion.div
        className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="font-semibold text-2xl tracking-tight text-foreground">Command Center</h1>
          <p className="text-muted-foreground text-sm">{today}</p>
        </div>
      </motion.div>

      {/* KPIs */}
      <KPICards />

      {/* Orders + Alerts */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <OrdersAtRiskTable />
        </div>
        <div className="xl:col-span-4">
          <AlertsPanel />
        </div>
      </div>

      {/* Overview + Activity Feed */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <TNAProgressOverview />
        </div>
        <div className="xl:col-span-4">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
