import type { ReactNode } from "react";

import { OperationsLayout } from "@/components/cta/operations-layout";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return <OperationsLayout>{children}</OperationsLayout>;
}
