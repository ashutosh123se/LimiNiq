import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

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

const FETCH_TIMEOUT_MS = 8000;

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

function normalizeUrl(raw: string) {
  const trimmed = raw.trim();
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  return new URL(withScheme);
}

function clampScore(value: number) {
  return Math.max(5, Math.min(99, Math.round(value)));
}

async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/** Fetches the live page once to check HTTPS, a viewport meta tag, and baseline security headers. */
async function runHeuristics(parsed: URL): Promise<Heuristics> {
  const isHttps = parsed.protocol === "https:";
  let hasViewportMeta = false;
  let hasSecurityHeaders = false;
  let responseOk = false;
  let fetchFailed = false;

  try {
    const res = await fetchWithTimeout(parsed.toString(), {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LiminiqAuditBot/1.0; +https://www.liminiq.com)",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    responseOk = res.ok;
    hasSecurityHeaders =
      res.headers.has("strict-transport-security") ||
      res.headers.has("content-security-policy") ||
      res.headers.has("x-content-type-options") ||
      res.headers.has("x-frame-options");

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("text/html") || contentType === "") {
      const html = await res.text();
      hasViewportMeta = /<meta[^>]+name=["']viewport["'][^>]*>/i.test(html.slice(0, 80_000));
    }
  } catch {
    fetchFailed = true;
  }

  return { isHttps, hasViewportMeta, hasSecurityHeaders, responseOk, fetchFailed };
}

/** Calls Google PageSpeed Insights (Lighthouse) when an API key is configured. */
async function fetchPageSpeed(targetUrl: string, apiKey: string): Promise<PageSpeedScores> {
  const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", targetUrl);
  endpoint.searchParams.set("key", apiKey);
  endpoint.searchParams.set("strategy", "mobile");
  for (const category of ["performance", "seo", "accessibility", "best-practices"]) {
    endpoint.searchParams.append("category", category);
  }

  const res = await fetchWithTimeout(endpoint.toString());
  if (!res.ok) {
    throw new Error(`PageSpeed API responded with status ${res.status}`);
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
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const rawUrl = typeof body?.url === "string" ? body.url : "";

  if (!rawUrl.trim()) {
    return NextResponse.json({ error: "A website URL is required." }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = normalizeUrl(rawUrl);
  } catch {
    return NextResponse.json({ error: "That doesn't look like a valid URL." }, { status: 400 });
  }

  const apiKey = process.env.PAGESPEED_API_KEY;
  const rand = seededRandom(parsed.hostname);
  const demoScore = (min: number, span: number) => Math.floor(min + rand() * span);

  const heuristics = await runHeuristics(parsed);

  let psi: PageSpeedScores | null = null;
  let demo = true;

  if (apiKey) {
    try {
      psi = await fetchPageSpeed(parsed.toString(), apiKey);
      demo = false;
    } catch {
      psi = null;
      demo = true;
    }
  }

  const performance = psi?.performance ?? demoScore(48, 45);
  const seo = psi?.seo ?? demoScore(52, 42);
  const accessibility = psi?.accessibility ?? demoScore(46, 46);

  // Security blends the HTTPS/header heuristics with PSI's best-practices score when available.
  const security = (() => {
    let base = heuristics.isHttps ? 76 : 38;
    if (heuristics.hasSecurityHeaders) base += 12;
    if (!heuristics.responseOk || heuristics.fetchFailed) base -= 10;
    if (psi?.bestPractices != null) base = Math.round((base + psi.bestPractices) / 2);
    const jitter = Math.floor(rand() * 10) - 5;
    return clampScore(base + jitter);
  })();

  // Mobile blends the viewport-meta heuristic with PSI's mobile performance score when available.
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
    // Keep the perceived scan time consistent even without a real Lighthouse run.
    await new Promise((r) => setTimeout(r, 300));
  }

  return NextResponse.json({
    url: parsed.toString(),
    hostname: parsed.hostname,
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
