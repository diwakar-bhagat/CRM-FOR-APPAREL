import { DashboardBottom } from "@/components/dashboard/dashboard-bottom";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { KPIGrid } from "@/components/dashboard/kpi-grid";

export default function DashboardPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col px-2 py-4 sm:px-4">
      <KPIGrid />
      <DashboardCharts />
      <DashboardBottom />
    </div>
  );
}
