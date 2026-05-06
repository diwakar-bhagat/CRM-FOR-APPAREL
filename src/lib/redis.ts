import Redis from "ioredis";

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

function createRedisClient() {
  if (!process.env.REDIS_URL) {
    console.warn("[Redis] REDIS_URL not set — cache disabled");
    return null;
  }

  const client = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      if (times > 3) return null;
      return Math.min(times * 200, 1000);
    },
    enableOfflineQueue: false,
  });

  client.on("error", (err) => {
    console.error("[Redis] Error:", err.message);
  });

  client.on("connect", () => {
    console.log("[Redis] Connected");
  });

  return client;
}

export const redis = globalForRedis.redis ?? createRedisClient();

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redis = redis ?? undefined;
}

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
} as const;

export const CACHE_TTL = 60; // seconds
export const SETTINGS_CACHE_TTL = 3600; // 1 hour - settings change rarely
