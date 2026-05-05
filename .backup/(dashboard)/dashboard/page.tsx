import { AlertsPanel } from "@/components/dashboard/alerts-panel";
import { KPIGrid } from "@/components/dashboard/kpi-grid";
import { RecentOrdersTable } from "@/components/dashboard/recent-orders-table";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Command Center</h1>
          <p className="text-sm text-foreground-subtle mt-1">Overview of your production pipeline and active orders.</p>
        </div>
      </div>

      <KPIGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrdersTable />
        </div>
        <div>
          <AlertsPanel />
        </div>
      </div>
    </div>
  );
}
