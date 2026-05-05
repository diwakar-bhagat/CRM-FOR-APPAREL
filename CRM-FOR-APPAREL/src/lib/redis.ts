import Redis from "ioredis";

type RedisSetOptions = {
  ex?: number;
};

type CacheClient = {
  get: <T>(key: string) => Promise<T | null>;
  set: (key: string, value: string, options?: RedisSetOptions) => Promise<"OK" | null>;
  del: (key: string) => Promise<number>;
  incr: (key: string) => Promise<number>;
  expire: (key: string, seconds: number) => Promise<number>;
};

const parseCachedValue = <T>(value: string | null): T | null => {
  if (value === null) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return value as T;
  }
};

const createRedisClient = (): CacheClient => {
  if (!process.env.REDIS_URL) {
    return {
      get: async () => null,
      set: async () => "OK",
      del: async () => 1,
      incr: async () => 1,
      expire: async () => 1,
    };
  }

  const client = new Redis(process.env.REDIS_URL, {
    lazyConnect: true,
    maxRetriesPerRequest: 2,
  });

  return {
    get: async <T>(key: string) => parseCachedValue<T>(await client.get(key)),
    set: async (key, value, options) => {
      if (options?.ex) {
        return client.set(key, value, "EX", options.ex);
      }

      return client.set(key, value);
    },
    del: (key) => client.del(key),
    incr: (key) => client.incr(key),
    expire: (key, seconds) => client.expire(key, seconds),
  };
};

export const redis = createRedisClient();

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
