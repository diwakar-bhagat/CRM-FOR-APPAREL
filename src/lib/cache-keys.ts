export const CACHE_KEYS = {
  PRIORITY_LIST: "priority:list:all",
  PRIORITY_FILTERED: (filter: string) => `priority:list:${filter}`,
  SYNC_LAST_RUN: "sync:last_run",
  GLOBAL_SETTINGS: "app:settings",
  PRODUCTS_LIST: "products:list:all",
  PRODUCTS_FILTERED: (filter: string) => `products:list:${filter}`,
  ORDERS_LIST: "orders:list:all",
  ORDERS_FILTERED: (filters: { buyer?: string; status?: string }) =>
    `orders:list:${filters.buyer ?? ""}:${filters.status ?? ""}`,
  ERP_SYNC_RATE_LIMIT: (requesterId: string, bucket: number) =>
    `rate_limit:erp_sync:{${requesterId}}:${bucket}`,
} as const;

export const CACHE_TTL = {
  SHORT: 30,
  MEDIUM: 60,
  LONG: 300,
  DAY: 86400,
  SETTINGS: 3600,
  RATE_LIMIT_WINDOW: 60,
} as const;
