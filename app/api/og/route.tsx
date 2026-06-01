import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "LIMINIQ — Website Development, SEO & Digital Marketing Agency";

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
        <div style={{ position: "absolute", width: 600, height: 600, background: "radial-gradient(circle, rgba(59,91,255,0.25) 0%, transparent 70%)", top: -100, right: -100, display: "flex" }} />
        <div style={{ position: "absolute", width: 400, height: 400, background: "radial-gradient(circle, rgba(0,200,160,0.15) 0%, transparent 70%)", bottom: -100, left: -50, display: "flex" }} />

        {/* Logo box */}
        <div
          style={{
            width: 64, height: 64,
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
          <span style={{ fontSize: 28, fontWeight: 800, background: "linear-gradient(90deg, #3B5BFF, #00C8A0)", backgroundClip: "text", color: "transparent", letterSpacing: -1 }}>NIQ</span>
        </div>

        {/* Page title */}
        <h1
          style={{
            fontSize: title.length > 60 ? 38 : 48,
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.2,
            margin: "0 0 24px",
            letterSpacing: -1.5,
          }}
        >
          {title}
        </h1>

        {/* Tagline */}
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", letterSpacing: 1, textTransform: "uppercase" }}>
          Next-Gen Digital Solutions · Based in India · Building Globally
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
