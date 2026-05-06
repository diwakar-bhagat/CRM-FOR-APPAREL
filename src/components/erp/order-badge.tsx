import { Badge } from "@/components/ui/badge";
import { ORDER_BADGE_VARIANTS } from "@/lib/status-config";

type OrderBadgeProps = {
  reffNo: string;
  status: keyof typeof ORDER_BADGE_VARIANTS;
};

export function OrderBadge({ reffNo, status }: OrderBadgeProps) {
  return <Badge variant={ORDER_BADGE_VARIANTS[status]}>{reffNo}</Badge>;
}
