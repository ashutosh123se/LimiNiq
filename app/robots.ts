import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
      // Explicit allow for major AI crawlers (GEO/AEO citation eligibility)
      { userAgent: "GPTBot", allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "anthropic-ai", allow: "/", disallow: ["/admin", "/api/"] },
      { userAgent: "CCBot", allow: "/", disallow: ["/admin", "/api/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
