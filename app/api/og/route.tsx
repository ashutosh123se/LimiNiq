import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { rateLimit, getClientIP } from "@/lib/rateLimit";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const ip = getClientIP(req);
  const rl = rateLimit(`og:${ip}`, { maxRequests: 30, windowMs: 60 * 1000 });
  if (!rl.success) {
    return new Response("Too Many Requests", {
      status: 429,
      headers: { "Retry-After": "60" },
    });
  }

  const { searchParams } = new URL(req.url);
  const rawTitle = searchParams.get("title") || "LIMINIQ — AI Automation & Custom Software Development";

  // Sanitize and constrain length to prevent resource exhaustion
  const title = rawTitle
    .replace(/[^\w\s.,!?:;'"\-&/]/gi, "")
    .trim()
    .slice(0, 100);

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0A0F2C 0%, #1a1440 50%, #0A1F2C 100%)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            background: "radial-gradient(circle, rgba(59,91,255,0.25) 0%, transparent 70%)",
            top: -100,
            right: -100,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            background: "radial-gradient(circle, rgba(0,200,160,0.15) 0%, transparent 70%)",
            bottom: -100,
            left: -50,
            display: "flex",
          }}
        />

        {/* Logo box */}
        <div
          style={{
            width: 64,
            height: 64,
            background: "linear-gradient(135deg, #3B5BFF, #7B61FF)",
            borderRadius: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            boxShadow: "0 0 40px rgba(59,91,255,0.5)",
          }}
        >
          <span style={{ color: "white", fontSize: 24, fontWeight: 800 }}>LN</span>
        </div>

        {/* Brand name */}
        <div style={{ display: "flex", marginBottom: 24 }}>
          <span style={{ fontSize: 28, fontWeight: 800, color: "white", letterSpacing: -1 }}>LIMI</span>
          <span
            style={{
              fontSize: 28,
              fontWeight: 800,
              background: "linear-gradient(90deg, #3B5BFF, #00C8A0)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: -1,
            }}
          >
            NIQ
          </span>
        </div>

        {/* Page title */}
        <h1
          style={{
            fontSize: title.length > 50 ? 36 : 46,
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            maxWidth: 920,
            lineHeight: 1.25,
            margin: "0 0 24px",
            letterSpacing: -1.2,
          }}
        >
          {title}
        </h1>

        {/* Tagline */}
        <div
          style={{
            fontSize: 17,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: 1.5,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          AI Automation &amp; Custom Software · Built for Measurable Scale
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
      },
    }
  );
}
