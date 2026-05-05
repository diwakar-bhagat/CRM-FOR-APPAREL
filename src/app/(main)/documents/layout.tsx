import type { ReactNode } from "react";

import { OperationsLayout } from "@/components/cta/operations-layout";

export default function DocumentsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <OperationsLayout>{children}</OperationsLayout>;
}
