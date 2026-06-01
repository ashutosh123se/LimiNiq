import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/admin/"],
      },
    ],
    sitemap: "https://liminiq.com/sitemap.xml",
    host: "https://liminiq.com",
  };
}
