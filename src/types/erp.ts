export type Severity = "critical" | "high" | "medium" | "low";

export interface Order {
  id: string;
  refNo: string;
  buyer: string;
  brand: string | null;
  styleId: string;
  styleName: string | null;
  orderQty: number;
  deliveryDate: Date;
  pfhStatus: string;
  sopStatus: string;
  ppmStatus: string;
  approvalPending: boolean;
  vendorLastActive: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DerivedSignals {
  id?: string;
  orderId: string;
  isDelayed: boolean;
  delayDays: number;
  isBlocked: boolean;
  blockedReason: string | null;
  inactivityHours: number;
  cascadeRisk: boolean;
  cascadeReason: string | null;
  deadlineProximity: number;
  computedAt?: Date;
}

export interface PriorityScore {
  id?: string;
  orderId: string;
  score: number;
  severity: Severity;
  reasonCodes: string[];
  recommendedAction: string | null;
  updatedAt?: Date;
}

export interface PriorityItem {
  orderId: string;
  refNo: string;
  buyer: string;
  styleId: string;
  deliveryDate: Date;
  pfhStatus: string;
  sopStatus: string;
  ppmStatus: string;
  approvalPending: boolean;
  score: number;
  severity: Severity;
  reasonCodes: string[];
  recommendedAction: string | null;
  cascadeRisk: boolean;
}

export interface CommandCenterSummary {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface CommandCenterResponse {
  priorities: PriorityItem[];
  summary: CommandCenterSummary;
  meta: {
    cached: boolean;
    computedAt: string | null;
    staleness?: string;
  };
}
