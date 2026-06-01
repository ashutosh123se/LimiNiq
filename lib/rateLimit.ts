// In-memory sliding window rate limiter (Redis-ready interface)
// To switch to Redis: replace the Map store with Redis commands

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

export interface RateLimitOptions {
  maxRequests?: number; // Default: 10
  windowMs?: number;   // Default: 3600000 (1 hour)
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const { maxRequests = 10, windowMs = 60 * 60 * 1000 } = options;
  const now = Date.now();

  // Cleanup expired entries occasionally
  if (Math.random() < 0.01) {
    for (const [key, entry] of store.entries()) {
      if (entry.resetAt < now) store.delete(key);
    }
  }

  const existing = store.get(identifier);

  if (!existing || existing.resetAt < now) {
    // New window
    const entry: RateLimitEntry = { count: 1, resetAt: now + windowMs };
    store.set(identifier, entry);
    return { success: true, remaining: maxRequests - 1, resetAt: entry.resetAt };
  }

  if (existing.count >= maxRequests) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count++;
  return { success: true, remaining: maxRequests - existing.count, resetAt: existing.resetAt };
}

export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  const realIP = request.headers.get("x-real-ip");
  if (realIP) return realIP;

  return "unknown";
}
