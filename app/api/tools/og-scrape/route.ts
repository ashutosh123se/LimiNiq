import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const FETCH_TIMEOUT_MS = 8000;

interface ScrapedMeta {
  url: string;
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
}

function normalizeUrl(raw: string): URL {
  const trimmed = raw.trim();
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  return new URL(withScheme);
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

function extractMeta(html: string, property: string): string | null {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]*content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*property=["']${property}["']`, "i"),
    new RegExp(`<meta[^>]+name=["']${property}["'][^>]*content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*name=["']${property}["']`, "i"),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

function extractTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match?.[1]?.trim() || null;
}

function resolveUrl(maybeRelative: string | null, base: URL): string | null {
  if (!maybeRelative) return null;
  try {
    return new URL(maybeRelative, base).toString();
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const rawUrl = typeof body?.url === "string" ? body.url : "";

  if (!rawUrl.trim()) {
    return NextResponse.json({ error: "A URL is required." }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = normalizeUrl(rawUrl);
  } catch {
    return NextResponse.json({ error: "That doesn't look like a valid URL." }, { status: 400 });
  }

  try {
    const res = await fetchWithTimeout(parsed.toString(), {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LiminiqOGBot/1.0; +https://www.liminiq.com)",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Site responded with status ${res.status}.` }, { status: 502 });
    }

    const html = (await res.text()).slice(0, 150_000);

    const result: ScrapedMeta = {
      url: parsed.toString(),
      title: extractMeta(html, "og:title") || extractTitle(html),
      description: extractMeta(html, "og:description") || extractMeta(html, "description"),
      image: resolveUrl(extractMeta(html, "og:image") || extractMeta(html, "twitter:image"), parsed),
      siteName: extractMeta(html, "og:site_name"),
    };

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Couldn't reach that URL. Check it's correct and publicly accessible." }, { status: 502 });
  }
}
