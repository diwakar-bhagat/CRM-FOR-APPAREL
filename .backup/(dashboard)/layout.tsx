import type * as React from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppTopbar } from "@/components/layout/app-topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="root-container" className="h-screen w-screen overflow-hidden flex bg-background">
      <AppSidebar />
      <main id="main-content" className="flex-1 flex flex-col relative">
        <AppTopbar />
        <div id="content-scroll-area" className="flex-1 overflow-y-auto p-6 space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
}
