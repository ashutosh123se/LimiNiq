import { NextRequest, NextResponse } from "next/server";
import { safeSsrfFetch, validateUrlForSsrf, SsrfBlockedError } from "@/lib/security/ssrf";
import { rateLimit, getClientIP } from "@/lib/rateLimit";

interface AuditDimension {
  key: "performance" | "seo" | "mobile" | "security" | "accessibility";
  score: number;
}

interface Heuristics {
  isHttps: boolean;
  hasViewportMeta: boolean;
  hasSecurityHeaders: boolean;
  responseOk: boolean;
  fetchFailed: boolean;
}

interface PageSpeedScores {
  performance: number | null;
  seo: number | null;
  accessibility: number | null;
  bestPractices: number | null;
}

function seededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i);
    h |= 0;
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), h | 1);
    h ^= h + Math.imul(h ^ (h >>> 7), h | 61);
    return ((h ^ (h >>> 14)) >>> 0) / 4294967296;
  };
}

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function clampScore(value: number) {
  return Math.max(5, Math.min(99, Math.round(value)));
}

/** Fetches the live page safely with SSRF defense to inspect HTTPS, viewport meta, and security headers. */
async function runHeuristics(targetUrl: string): Promise<Heuristics> {
  let isHttps = false;
  let hasViewportMeta = false;
  let hasSecurityHeaders = false;
  let responseOk = false;
  let fetchFailed = false;

  try {
    const res = await safeSsrfFetch(targetUrl, {
      timeoutMs: 6000,
      maxRedirects: 3,
      maxSizeBytes: 1024 * 1024, // 1MB max for heuristics
    });

    isHttps = res.finalUrl.startsWith("https:");
    responseOk = res.status >= 200 && res.status < 400;

    hasSecurityHeaders =
      res.headers.has("strict-transport-security") ||
      res.headers.has("content-security-policy") ||
      res.headers.has("x-content-type-options") ||
      res.headers.has("x-frame-options");

    hasViewportMeta = /<meta[^>]+name=["']viewport["'][^>]*>/i.test(res.bodyText.slice(0, 80_000));
  } catch {
    fetchFailed = true;
  }

  return { isHttps, hasViewportMeta, hasSecurityHeaders, responseOk, fetchFailed };
}

/** Calls Google PageSpeed Insights when an API key is configured. */
async function fetchPageSpeed(targetUrl: string, apiKey: string): Promise<PageSpeedScores> {
  const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", targetUrl);
  endpoint.searchParams.set("key", apiKey);
  endpoint.searchParams.set("strategy", "mobile");
  for (const category of ["performance", "seo", "accessibility", "best-practices"]) {
    endpoint.searchParams.append("category", category);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);

  try {
    const res = await fetch(endpoint.toString(), { signal: controller.signal });
    if (!res.ok) {
      throw new Error(`PageSpeed API error: ${res.status}`);
    }

    const data = (await res.json()) as {
      lighthouseResult?: { categories?: Record<string, { score?: number | null }> };
    };
    const categories = data.lighthouseResult?.categories;
    if (!categories) {
      throw new Error("PageSpeed response missing Lighthouse categories");
    }

    const scoreOf = (key: string) => {
      const raw = categories[key]?.score;
      return typeof raw === "number" ? clampScore(raw * 100) : null;
    };

    return {
      performance: scoreOf("performance"),
      seo: scoreOf("seo"),
      accessibility: scoreOf("accessibility"),
      bestPractices: scoreOf("best-practices"),
    };
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(req: NextRequest) {
  // Rate limiting: 10 requests per 5 minutes per IP
  const clientIp = getClientIP(req);
  const rl = rateLimit(`tool:audit:${clientIp}`, { maxRequests: 10, windowMs: 5 * 60 * 1000 });
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many audit requests from this network. Please wait a few minutes." },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil((rl.resetAt - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  const body = await req.json().catch(() => null);
  const rawUrl = typeof body?.url === "string" ? body.url : "";

  if (!rawUrl.trim()) {
    return NextResponse.json({ error: "A website URL is required." }, { status: 400 });
  }

  let normalized: string;
  try {
    normalized = normalizeUrl(rawUrl);
  } catch {
    return NextResponse.json({ error: "That doesn't look like a valid URL." }, { status: 400 });
  }

  // SSRF Validation: Hostname and DNS resolution check
  let parsedUrl: URL;
  try {
    parsedUrl = await validateUrlForSsrf(normalized);
  } catch (err) {
    if (err instanceof SsrfBlockedError) {
      return NextResponse.json(
        { error: "Scanning internal, local, or private network addresses is not permitted." },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Invalid or unreachable URL." }, { status: 400 });
  }

  const validatedUrlString = parsedUrl.toString();
  const apiKey = process.env.PAGESPEED_API_KEY;
  const rand = seededRandom(parsedUrl.hostname);
  const demoScore = (min: number, span: number) => Math.floor(min + rand() * span);

  const heuristics = await runHeuristics(validatedUrlString);

  let psi: PageSpeedScores | null = null;
  let demo = true;

  if (apiKey) {
    try {
      psi = await fetchPageSpeed(validatedUrlString, apiKey);
      demo = false;
    } catch {
      psi = null;
      demo = true;
    }
  }

  const performance = psi?.performance ?? demoScore(48, 45);
  const seo = psi?.seo ?? demoScore(52, 42);
  const accessibility = psi?.accessibility ?? demoScore(46, 46);

  // Security blends HTTPS/header heuristics with PSI best-practices score
  const security = (() => {
    let base = heuristics.isHttps ? 76 : 38;
    if (heuristics.hasSecurityHeaders) base += 12;
    if (!heuristics.responseOk || heuristics.fetchFailed) base -= 10;
    if (psi?.bestPractices != null) base = Math.round((base + psi.bestPractices) / 2);
    const jitter = Math.floor(rand() * 10) - 5;
    return clampScore(base + jitter);
  })();

  // Mobile blends viewport-meta heuristic with PSI mobile performance score
  const mobile = (() => {
    let base = heuristics.hasViewportMeta ? 80 : 42;
    if (psi?.performance != null) base = Math.round((base + psi.performance) / 2);
    const jitter = Math.floor(rand() * 10) - 5;
    return clampScore(base + jitter);
  })();

  const dimensions: AuditDimension[] = [
    { key: "performance", score: clampScore(performance) },
    { key: "seo", score: clampScore(seo) },
    { key: "mobile", score: mobile },
    { key: "security", score: security },
    { key: "accessibility", score: clampScore(accessibility) },
  ];

  const overall = Math.round(dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length);

  if (demo) {
    await new Promise((r) => setTimeout(r, 250));
  }

  return NextResponse.json({
    url: validatedUrlString,
    hostname: parsedUrl.hostname,
    overall,
    dimensions,
    heuristics: {
      https: heuristics.isHttps,
      viewportMeta: heuristics.hasViewportMeta,
      securityHeaders: heuristics.hasSecurityHeaders,
    },
    demo,
    scannedAt: new Date().toISOString(),
  });
}
