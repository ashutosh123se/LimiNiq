import dns from "dns/promises";
import net from "net";

export interface SafeFetchOptions {
  timeoutMs?: number;
  maxRedirects?: number;
  maxSizeBytes?: number;
  headers?: Record<string, string>;
  method?: "GET" | "HEAD";
}

export interface SafeFetchResult {
  url: string;
  finalUrl: string;
  status: number;
  statusText: string;
  headers: Headers;
  bodyText: string;
}

export class SsrfBlockedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SsrfBlockedError";
  }
}

/**
 * Checks if an IPv4 address is in private, loopback, link-local, or reserved ranges.
 */
function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split(".").map((p) => parseInt(p, 10));
  if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
    return true; // malformed treated as blocked
  }

  const [a, b] = parts;

  // 0.0.0.0/8 Current network ("this" host)
  if (a === 0) return true;

  // 10.0.0.0/8 Private network
  if (a === 10) return true;

  // 100.64.0.0/10 Shared Address Space (Carrier-grade NAT)
  if (a === 100 && b >= 64 && b <= 127) return true;

  // 127.0.0.0/8 Loopback
  if (a === 127) return true;

  // 169.254.0.0/16 Link-local / Cloud metadata (AWS, GCP, Azure, etc.)
  if (a === 169 && b === 254) return true;

  // 172.16.0.0/12 Private network (172.16.0.0 - 172.31.255.255)
  if (a === 172 && b >= 16 && b <= 31) return true;

  // 192.0.0.0/24 IETF Protocol Assignments
  if (a === 192 && b === 0 && parts[2] === 0) return true;

  // 192.0.2.0/24 TEST-NET-1 (documentation)
  if (a === 192 && b === 0 && parts[2] === 2) return true;

  // 192.168.0.0/16 Private network
  if (a === 192 && b === 168) return true;

  // 198.18.0.0/15 Network interconnect benchmark testing
  if (a === 198 && (b === 18 || b === 19)) return true;

  // 198.51.100.0/24 TEST-NET-2
  if (a === 198 && b === 51 && parts[2] === 100) return true;

  // 203.0.113.0/24 TEST-NET-3
  if (a === 203 && b === 0 && parts[2] === 113) return true;

  // 224.0.0.0/4 Multicast
  if (a >= 224 && a <= 239) return true;

  // 240.0.0.0/4 Reserved for future use
  if (a >= 240) return true;

  return false;
}

/**
 * Checks if an IPv6 address is in private, loopback, link-local, or IPv4-mapped ranges.
 */
function isPrivateIPv6(ip: string): boolean {
  const normalized = ip.toLowerCase();

  // ::1 loopback
  if (normalized === "::1" || normalized === "0:0:0:0:0:0:0:1") return true;

  // :: unspecified
  if (normalized === "::" || normalized === "0:0:0:0:0:0:0:0") return true;

  // IPv4-mapped IPv6 address (::ffff:x.x.x.x or ::ffff:127.0.0.1)
  const v4MappedMatch = normalized.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (v4MappedMatch) {
    return isPrivateIPv4(v4MappedMatch[1]);
  }

  // fc00::/7 Unique Local Address (ULA)
  if (normalized.startsWith("fc") || normalized.startsWith("fd")) return true;

  // fe80::/10 Link-Local Unicast
  if (normalized.startsWith("fe8") || normalized.startsWith("fe9") || normalized.startsWith("fea") || normalized.startsWith("feb")) {
    return true;
  }

  // ff00::/8 Multicast
  if (normalized.startsWith("ff")) return true;

  return false;
}

/**
 * Resolves a hostname to all associated IP addresses and validates none are internal/private.
 */
export async function validateHostForSsrf(hostname: string): Promise<void> {
  const cleanHost = hostname.trim().toLowerCase();

  // Reject obvious local names
  if (
    cleanHost === "localhost" ||
    cleanHost.endsWith(".localhost") ||
    cleanHost.endsWith(".local") ||
    cleanHost.endsWith(".internal") ||
    cleanHost.endsWith(".onion")
  ) {
    throw new SsrfBlockedError(`Access to ${cleanHost} is blocked for security.`);
  }

  // Check if hostname is an IP literal
  const ipFamily = net.isIP(cleanHost);
  if (ipFamily === 4) {
    if (isPrivateIPv4(cleanHost)) {
      throw new SsrfBlockedError(`Access to private IP ${cleanHost} is blocked.`);
    }
    return;
  }
  if (ipFamily === 6) {
    if (isPrivateIPv6(cleanHost)) {
      throw new SsrfBlockedError(`Access to private IPv6 ${cleanHost} is blocked.`);
    }
    return;
  }

  // Resolve hostname via DNS lookup
  let addresses: Array<{ address: string; family: number }>;
  try {
    addresses = await dns.lookup(cleanHost, { all: true });
  } catch (err) {
    throw new SsrfBlockedError(`Could not resolve hostname ${cleanHost}.`);
  }

  if (!addresses || addresses.length === 0) {
    throw new SsrfBlockedError(`Hostname ${cleanHost} has no DNS records.`);
  }

  for (const record of addresses) {
    if (record.family === 4) {
      if (isPrivateIPv4(record.address)) {
        throw new SsrfBlockedError(`Hostname ${cleanHost} resolves to private IP ${record.address}.`);
      }
    } else if (record.family === 6) {
      if (isPrivateIPv6(record.address)) {
        throw new SsrfBlockedError(`Hostname ${cleanHost} resolves to private IPv6 ${record.address}.`);
      }
    }
  }
}

/**
 * Validates a full URL against SSRF rules: scheme, host, and resolved IP addresses.
 */
export async function validateUrlForSsrf(rawUrl: string): Promise<URL> {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    throw new SsrfBlockedError("Invalid URL format.");
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new SsrfBlockedError(`Unsupported scheme: ${parsed.protocol}. Only http and https are allowed.`);
  }

  if (!parsed.hostname) {
    throw new SsrfBlockedError("URL hostname is missing.");
  }

  // Validate port if present: standard HTTP/HTTPS or high ports only
  if (parsed.port) {
    const portNum = parseInt(parsed.port, 10);
    if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
      throw new SsrfBlockedError("Invalid port specified.");
    }
    // Block typical internal database/management ports (SSH, MySQL, Postgres, Redis, etc.)
    const blockedPorts = [22, 23, 25, 3306, 5432, 6379, 11211, 27017, 9200];
    if (blockedPorts.includes(portNum)) {
      throw new SsrfBlockedError(`Port ${portNum} is blocked for security.`);
    }
  }

  await validateHostForSsrf(parsed.hostname);
  return parsed;
}

/**
 * Safely fetches a user-supplied URL with:
 * 1. Strict server-side SSRF validation on target and all redirect hops.
 * 2. Manual redirect resolution to prevent DNS-rebinding / redirect-to-internal attacks.
 * 3. Enforced request timeout and response size limit.
 */
export async function safeSsrfFetch(
  rawUrl: string,
  options: SafeFetchOptions = {}
): Promise<SafeFetchResult> {
  const {
    timeoutMs = 6000,
    maxRedirects = 3,
    maxSizeBytes = 2 * 1024 * 1024, // 2MB max
    headers = {},
    method = "GET",
  } = options;

  let currentUrl = rawUrl;
  let hops = 0;

  while (hops <= maxRedirects) {
    const validatedUrl = await validateUrlForSsrf(currentUrl);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    let res: Response;
    try {
      res = await fetch(validatedUrl.toString(), {
        method,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; LiminiqAuditBot/2.0; +https://www.liminiq.com)",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          ...headers,
        },
        redirect: "manual", // ALWAYS manual: we inspect location and re-verify SSRF
        signal: controller.signal,
      });
    } catch (err: unknown) {
      clearTimeout(timeout);
      if (err instanceof Error && err.name === "AbortError") {
        throw new SsrfBlockedError("Request timed out while connecting to the target website.");
      }
      throw new SsrfBlockedError("Failed to establish connection to target website.");
    }

    clearTimeout(timeout);

    // Handle redirects (301, 302, 303, 307, 308)
    if ([301, 302, 303, 307, 308].includes(res.status)) {
      const location = res.headers.get("location");
      if (!location) {
        throw new SsrfBlockedError(`Redirect response (${res.status}) missing Location header.`);
      }

      hops++;
      if (hops > maxRedirects) {
        throw new SsrfBlockedError(`Exceeded maximum allowed redirects (${maxRedirects}).`);
      }

      // Resolve relative redirects against validatedUrl
      currentUrl = new URL(location, validatedUrl).toString();
      continue;
    }

    // Read response body with streaming size limit
    if (!res.body) {
      return {
        url: rawUrl,
        finalUrl: validatedUrl.toString(),
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
        bodyText: "",
      };
    }

    const reader = res.body.getReader();
    const chunks: Uint8Array[] = [];
    let receivedBytes = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        receivedBytes += value.length;
        if (receivedBytes > maxSizeBytes) {
          // Truncate and stop reading to prevent memory exhaustion
          chunks.push(value);
          await reader.cancel();
          break;
        }
        chunks.push(value);
      }
    }

    const totalBuffer = new Uint8Array(receivedBytes);
    let offset = 0;
    for (const chunk of chunks) {
      totalBuffer.set(chunk, offset);
      offset += chunk.length;
    }

    const decoder = new TextDecoder("utf-8", { fatal: false, ignoreBOM: true });
    const bodyText = decoder.decode(totalBuffer);

    return {
      url: rawUrl,
      finalUrl: validatedUrl.toString(),
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
      bodyText,
    };
  }

  throw new SsrfBlockedError("Too many redirects.");
}

