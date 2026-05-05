import type { Metadata } from "next";

import { PriorityDashboard } from "@/components/command-center/priority-dashboard";

export const metadata: Metadata = {
  title: "Command Center | Priority Engine",
  description: "Real-time decision engine and actionable priority alerts.",
};

export default function CommandCenterPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl animate-in fade-in duration-500">
      <PriorityDashboard />
    </div>
  );
}
