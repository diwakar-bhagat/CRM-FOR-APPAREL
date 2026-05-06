type RedisCommandResult<T> = {
  result?: T;
  error?: string;
};

class UpstashRestRedis {
  private url: string;
  private token: string;

  constructor(url: string, token: string) {
    this.url = url.replace(/\/$/, "");
    this.token = token;
  }

  private async command<T>(args: Array<string | number>): Promise<T> {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Upstash command failed with status ${response.status}`);
    }

    const payload = (await response.json()) as RedisCommandResult<T>;
    if (payload.error) {
      throw new Error(payload.error);
    }
    return payload.result as T;
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.command<string | null>(["GET", key]);
    if (value === null) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
    }
  }

  async set(key: string, value: string, options?: { ex?: number }): Promise<void> {
    if (options?.ex) {
      await this.command(["SET", key, value, "EX", options.ex]);
      return;
    }
    await this.command(["SET", key, value]);
  }

  async del(...keys: string[]): Promise<void> {
    if (keys.length === 0) return;
    await this.command(["DEL", ...keys]);
  }

  async incr(key: string): Promise<number> {
    return this.command<number>(["INCR", key]);
  }

  async expire(key: string, seconds: number): Promise<void> {
    await this.command(["EXPIRE", key, seconds]);
  }

  async scan(cursor: number, options: { match?: string; count?: number } = {}): Promise<[number, string[]]> {
    const args: Array<string | number> = ["SCAN", cursor];
    if (options.match) args.push("MATCH", options.match);
    if (options.count) args.push("COUNT", options.count);
    const [nextCursor, keys] = await this.command<[string, string[]]>(args);
    return [Number(nextCursor), keys];
  }
}

function createRedisClient(): UpstashRestRedis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Redis] Upstash REST env vars not set - cache disabled");
    }
    return null;
  }

  return new UpstashRestRedis(url, token);
}

export const redis = createRedisClient();

export async function cacheGet<T>(key: string): Promise<T | null> {
  if (!redis) return null;
  try {
    return await redis.get<T>(key);
  } catch (error) {
    console.error("[Redis] cacheGet failed:", (error as Error).message);
    return null;
  }
}

export async function cacheSet(key: string, value: unknown, ttlSeconds = 60): Promise<void> {
  if (!redis) return;
  try {
    await redis.set(key, JSON.stringify(value), { ex: ttlSeconds });
  } catch (error) {
    console.error("[Redis] cacheSet failed:", (error as Error).message);
  }
}

export async function invalidateKeys(...keys: string[]): Promise<void> {
  if (!redis || keys.length === 0) return;
  try {
    await redis.del(...keys);
  } catch (error) {
    console.error("[Redis] invalidateKeys failed:", (error as Error).message);
  }
}

export async function invalidateByPrefix(prefix: string): Promise<void> {
  if (!redis) return;
  try {
    let cursor = 0;
    const keys: string[] = [];
    do {
      const [nextCursor, batch] = await redis.scan(cursor, {
        match: `${prefix}*`,
        count: 100,
      });
      cursor = nextCursor;
      keys.push(...batch);
    } while (cursor !== 0);

    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error("[Redis] invalidateByPrefix failed:", (error as Error).message);
  }
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
