import type { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: https: https://*.supabase.co https://res.cloudinary.com https://utfs.io https://images.unsplash.com https://www.google-analytics.com;
  font-src 'self' data: https://fonts.gstatic.com;
  connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.googleapis.com https://va.vercel-scripts.com https://vitals.vercel-insights.com;
  media-src 'self';
  frame-src 'self' https://maps.google.com https://www.google.com https://cal.com https://calendly.com;
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const nextConfig: NextConfig = {
  poweredByHeader: false,
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
      // Legacy / friendly aliases for continuity
      { source: "/services/ai-automation-cloud", destination: "/services/ai-automation", permanent: true },
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
          { key: "Content-Security-Policy", value: cspHeader },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
        ],
      },
      {
        source: "/admin/(.*)",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, private" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        source: "/api/admin/(.*)",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, private" },
        ],
      },
    ];
  },
};

export default nextConfig;
