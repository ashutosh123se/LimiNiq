import { NextRequest, NextResponse } from "next/server";
import { safeSsrfFetch, validateUrlForSsrf, SsrfBlockedError } from "@/lib/security/ssrf";
import { rateLimit, getClientIP } from "@/lib/rateLimit";

interface ScrapedMeta {
  url: string;
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
}

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function extractMeta(html: string, property: string): string | null {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]*content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*property=["']${property}["']`, "i"),
    new RegExp(`<meta[^>]+name=["']${property}["'][^>]*content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*name=["']${property}["']`, "i"),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      // Decode basic HTML entities and strip control characters
      return match[1]
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .slice(0, 500)
        .trim();
    }
  }
  return null;
}

function extractTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match?.[1] ? match[1].slice(0, 200).trim() : null;
}

function resolveSafeUrl(maybeRelative: string | null, base: URL): string | null {
  if (!maybeRelative) return null;
  try {
    const resolved = new URL(maybeRelative, base);
    // Only permit safe web protocols for preview images
    if (resolved.protocol === "http:" || resolved.protocol === "https:") {
      return resolved.toString();
    }
    return null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  // Rate limiting: 15 requests per 5 minutes per IP
  const clientIp = getClientIP(req);
  const rl = rateLimit(`tool:og-scrape:${clientIp}`, { maxRequests: 15, windowMs: 5 * 60 * 1000 });
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many preview requests. Please wait a moment." },
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
    return NextResponse.json({ error: "A URL is required." }, { status: 400 });
  }

  let normalized: string;
  try {
    normalized = normalizeUrl(rawUrl);
  } catch {
    return NextResponse.json({ error: "That doesn't look like a valid URL." }, { status: 400 });
  }

  // SSRF Validation
  let parsedUrl: URL;
  try {
    parsedUrl = await validateUrlForSsrf(normalized);
  } catch (err) {
    if (err instanceof SsrfBlockedError) {
      return NextResponse.json(
        { error: "Accessing internal, local, or private network addresses is not permitted." },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Invalid URL or hostname could not be resolved." }, { status: 400 });
  }

  try {
    const res = await safeSsrfFetch(parsedUrl.toString(), {
      timeoutMs: 6000,
      maxRedirects: 3,
      maxSizeBytes: 1024 * 1024, // 1MB max
    });

    if (res.status >= 400) {
      return NextResponse.json({ error: `Site responded with status ${res.status}.` }, { status: 502 });
    }

    const html = res.bodyText.slice(0, 150_000);
    const finalUrlObj = new URL(res.finalUrl);

    const result: ScrapedMeta = {
      url: res.finalUrl,
      title: extractMeta(html, "og:title") || extractTitle(html),
      description: extractMeta(html, "og:description") || extractMeta(html, "description"),
      image: resolveSafeUrl(extractMeta(html, "og:image") || extractMeta(html, "twitter:image"), finalUrlObj),
      siteName: extractMeta(html, "og:site_name"),
    };

    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof SsrfBlockedError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Couldn't reach that URL. Check that it is publicly accessible and responding." },
      { status: 502 }
    );
  }
}
