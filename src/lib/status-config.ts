export const ORDER_BADGE_VARIANTS = {
  active: "default",
  shipped: "default",
  atRisk: "secondary",
  overdue: "destructive",
  new: "outline",
} as const;

export const STATUS_BADGE_MAP = {
  Planned: "outline",
  Running: "secondary",
  Stitched: "default",
  Shipped: "default",
  Overdue: "destructive",
  Buffer: "secondary",
} as const;

export type StatusBadgeKey = keyof typeof STATUS_BADGE_MAP;
