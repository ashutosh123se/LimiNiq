import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "utfs.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      // Apex domain -> www (canonical host)
      {
        source: "/:path*",
        has: [{ type: "host", value: "liminiq.com" }],
        destination: "https://www.liminiq.com/:path*",
        permanent: true,
      },
      // Friendly query-param URLs -> canonical path-based URLs
      {
        source: "/contact",
        has: [{ type: "query", key: "service", value: "(?<slug>.*)" }],
        destination: "/contact/service/:slug",
        permanent: true,
      },
      {
        source: "/blog",
        has: [{ type: "query", key: "topic", value: "(?<slug>.*)" }],
        destination: "/blog/topic/:slug",
        permanent: true,
      },
      {
        source: "/blog",
        has: [{ type: "query", key: "category", value: "(?<slug>.*)" }],
        destination: "/blog/category/:slug",
        permanent: true,
      },
      // Legacy / friendly aliases for continuity (rebuild — old paths still linked externally)
      { source: "/service", destination: "/services", permanent: true },
      { source: "/service/:slug*", destination: "/services/:slug*", permanent: true },
      { source: "/work", destination: "/portfolio", permanent: true },
      { source: "/our-work", destination: "/portfolio", permanent: true },
      { source: "/case-studies", destination: "/portfolio", permanent: true },
      { source: "/get-started", destination: "/contact", permanent: true },
      { source: "/get-a-quote", destination: "/contact", permanent: true },
      { source: "/request-a-quote", destination: "/contact", permanent: true },
      { source: "/pricing-plans", destination: "/pricing", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms", destination: "/terms-of-service", permanent: true },
      { source: "/tos", destination: "/terms-of-service", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        source: "/admin/(.*)",
        headers: [
          { key: "Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
};

export default nextConfig;
