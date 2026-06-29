import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

type PageMetadataInput = {
  /** Page title without brand suffix (template adds `| LIMINIQ`). Use `absoluteTitle` for homepage. */
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  /** Skip title template — use for homepage where brand is already in title. */
  absoluteTitle?: boolean;
  noIndex?: boolean;
};

/** Consistent per-page metadata with matching canonical, og:url, and Twitter tags. */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  ogImage = "/api/og",
  absoluteTitle = false,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle || title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@liminiq",
      creator: "@liminiq",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    ...(noIndex
      ? { robots: { index: false, follow: true } }
      : {
          robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true, "max-image-preview": "large" as const },
          },
        }),
  };
}

export { SITE_URL, SITE_NAME };
