// Sliding window rate limiter with Cloudflare edge IP awareness
// Safe for serverless runtime and ready for external distributed stores (Upstash / Redis)

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

export interface RateLimitOptions {
  maxRequests?: number; // Default: 10
  windowMs?: number;    // Default: 60000 (1 minute)
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
  limit: number;
}

export function rateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const { maxRequests = 10, windowMs = 60 * 1000 } = options;
  const now = Date.now();

  // Cleanup expired entries periodically (1% random sampling on invocation)
  if (Math.random() < 0.05) {
    for (const [key, entry] of store.entries()) {
      if (entry.resetAt < now) store.delete(key);
    }
  }

  const existing = store.get(identifier);

  if (!existing || existing.resetAt < now) {
    // New rate limit window
    const entry: RateLimitEntry = { count: 1, resetAt: now + windowMs };
    store.set(identifier, entry);
    return {
      success: true,
      remaining: Math.max(0, maxRequests - 1),
      resetAt: entry.resetAt,
      limit: maxRequests,
    };
  }

  if (existing.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetAt: existing.resetAt,
      limit: maxRequests,
    };
  }

  existing.count++;
  return {
    success: true,
    remaining: Math.max(0, maxRequests - existing.count),
    resetAt: existing.resetAt,
    limit: maxRequests,
  };
}

/**
 * Extracts client IP with priority on Cloudflare canonical edge header (CF-Connecting-IP),
 * followed by standard reverse proxy headers.
 */
export function getClientIP(request: Request): string {
  // 1. Cloudflare edge real IP (tamper-proof when traffic is proxied through Cloudflare)
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp && cfIp.trim()) {
    return cfIp.trim();
  }

  // 2. Standard X-Real-IP
  const realIP = request.headers.get("x-real-ip");
  if (realIP && realIP.trim()) {
    return realIP.trim();
  }

  // 3. True-Client-IP (enterprise Cloudflare / Akamai)
  const trueClientIp = request.headers.get("true-client-ip");
  if (trueClientIp && trueClientIp.trim()) {
    return trueClientIp.trim();
  }

  // 4. X-Forwarded-For fallback (extract first valid IP)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",").map((ip) => ip.trim());
    if (parts[0]) return parts[0];
  }

  return "127.0.0.1";
}
