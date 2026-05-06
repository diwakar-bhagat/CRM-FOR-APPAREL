import { Badge } from "@/components/ui/badge";
import { STATUS_BADGE_MAP, type StatusBadgeKey } from "@/lib/status-config";

export function StatusBadge({ status }: { status: string }) {
  const variant = STATUS_BADGE_MAP[status as StatusBadgeKey] ?? "outline";
  return <Badge variant={variant}>{status}</Badge>;
}
