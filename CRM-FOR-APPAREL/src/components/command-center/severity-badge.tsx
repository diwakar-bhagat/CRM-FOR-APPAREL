import { AlertCircle, AlertTriangle, ArrowUpCircle, Info } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Severity } from "@/types/erp";

export function SeverityBadge({ severity, className }: { severity: Severity | string; className?: string }) {
  const map: Record<Severity | string, { label: string; bg: string; icon: any }> = {
    critical: {
      label: "Critical",
      bg: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
      icon: AlertCircle,
    },
    high: {
      label: "High",
      bg: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
      icon: AlertTriangle,
    },
    medium: {
      label: "Medium",
      bg: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
      icon: ArrowUpCircle,
    },
    low: {
      label: "Low",
      bg: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
      icon: Info,
    },
  };

  const config = map[severity.toLowerCase()] || map.low;
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(`flex items-center gap-1.5 font-medium px-2.5 py-0.5 rounded-full ${config.bg}`, className)}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </Badge>
  );
}
