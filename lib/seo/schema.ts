import { SITE_CONTACT, SITE_NAME, SITE_SOCIAL, SITE_URL, absoluteUrl } from "@/lib/site";
import { TESTIMONIALS } from "@/lib/data/testimonials";
import type { FAQItem } from "@/components/sections/services/FAQAccordion";

/** Top-level Organization JSON-LD (auditor-friendly, not @graph). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/apple-icon`,
      width: 180,
      height: 180,
    },
    foundingDate: SITE_CONTACT.foundingYear,
    description:
      "Custom software development, AI automation, and SaaS engineering company based in Delhi, India.",
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
      availableLanguage: ["English", "Hindi"],
      areaServed: ["US", "GB", "CA", "AU", "AE", "EU", "IN"],
    },
    sameAs: [SITE_SOCIAL.linkedin, SITE_SOCIAL.instagram],
  };
}

/** Top-level LocalBusiness JSON-LD (separate script tag for audit tools). */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    url: absoluteUrl("/"),
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
      latitude: "28.6692",
      longitude: "77.1046",
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "India" },
    ],
    sameAs: [SITE_SOCIAL.linkedin, SITE_SOCIAL.instagram],
  };
}

/** Top-level WebSite JSON-LD for homepage indexing signals. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: absoluteUrl("/"),
    name: SITE_NAME,
    description:
      "AI automation, custom software, and enterprise SaaS development company.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
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
    areaServed: ["US", "GB", "CA", "AU", "AE", "EU", "IN"],
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
