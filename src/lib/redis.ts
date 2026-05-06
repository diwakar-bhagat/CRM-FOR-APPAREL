import Redis from "ioredis";

/** Thin wrapper that exposes an Upstash-compatible API over ioredis. */
class RedisWrapper {
  private client: Redis;

  constructor(client: Redis) {
    this.client = client;
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);
    if (value === null) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
    }
  }

  async set(key: string, value: string, options?: { ex?: number }): Promise<void> {
    if (options?.ex) {
      await this.client.set(key, value, "EX", options.ex);
    } else {
      await this.client.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async incr(key: string): Promise<number> {
    return this.client.incr(key);
  }

  async expire(key: string, seconds: number): Promise<void> {
    await this.client.expire(key, seconds);
  }
}

const globalForRedis = globalThis as unknown as {
  redis: RedisWrapper | null | undefined;
};

function createRedisClient(): RedisWrapper | null {
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

  return new RedisWrapper(client);
}

export const redis = globalForRedis.redis ?? createRedisClient();

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redis = redis;
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
