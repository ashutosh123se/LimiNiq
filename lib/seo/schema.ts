import { SITE_CONTACT, SITE_NAME, SITE_SOCIAL, SITE_URL, absoluteUrl } from "@/lib/site";
import { TESTIMONIALS } from "@/lib/data/testimonials";
import type { FAQItem } from "@/components/sections/services/FAQAccordion";

function averageRating(): { ratingValue: string; reviewCount: string } {
  const ratings = TESTIMONIALS.map((t) => t.rating);
  const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  return {
    ratingValue: avg.toFixed(1),
    reviewCount: String(ratings.length),
  };
}

/** Top-level Organization JSON-LD (auditor-friendly, not @graph). */
export function organizationJsonLd() {
  const { ratingValue, reviewCount } = averageRating();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/apple-icon`,
      width: 180,
      height: 180,
    },
    foundingDate: SITE_CONTACT.foundingYear,
    description:
      "Custom software, SaaS, and enterprise development company also offering SEO and digital marketing services.",
    email: SITE_CONTACT.email,
    telephone: SITE_CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONTACT.streetAddress,
      addressLocality: SITE_CONTACT.addressLocality,
      addressRegion: SITE_CONTACT.addressRegion,
      postalCode: SITE_CONTACT.postalCode,
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONTACT.phone,
      email: SITE_CONTACT.email,
      contactType: "customer service",
      availableLanguage: "English",
      areaServed: "IN",
    },
    sameAs: [SITE_SOCIAL.linkedin, SITE_SOCIAL.instagram],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
      bestRating: "5",
      worstRating: "4",
    },
  };
}

/** Top-level LocalBusiness JSON-LD (separate script tag for audit tools). */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/apple-icon`,
    telephone: SITE_CONTACT.phone,
    email: SITE_CONTACT.email,
    foundingDate: SITE_CONTACT.foundingYear,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONTACT.streetAddress,
      addressLocality: SITE_CONTACT.addressLocality,
      addressRegion: SITE_CONTACT.addressRegion,
      postalCode: SITE_CONTACT.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    sameAs: [SITE_SOCIAL.linkedin, SITE_SOCIAL.instagram],
  };
}

/** @deprecated Use organizationJsonLd + localBusinessJsonLd separately */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(), localBusinessJsonLd()],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  slug: string;
  serviceType: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.serviceType,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    description: input.description,
    areaServed: { "@type": "Country", name: "India" },
    url: absoluteUrl(`/services/${input.slug}`),
  };
}

export function faqPageSchema(faqs: FAQItem[]) {
  if (!faqs.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  slug: string;
  description: string;
  author: string;
  publishedAt?: Date | null;
  updatedAt?: Date | null;
  image?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    author: { "@type": "Person", name: input.author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-icon` },
    },
    datePublished: input.publishedAt?.toISOString(),
    dateModified: (input.updatedAt ?? input.publishedAt)?.toISOString(),
    image: input.image ? [input.image] : [`${SITE_URL}/api/og`],
    mainEntityOfPage: absoluteUrl(`/blog/${input.slug}`),
  };
}
