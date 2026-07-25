export interface Industry {
  slug: string;
  name: string;
  heroCopy: string;
  relevantServiceSlugs: string[];
  relatedCaseStudySlug?: string;
  relatedTestimonialId?: string;
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "saas-startups",
    name: "SaaS & Startups",
    heroCopy:
      "From MVP to multi-tenant scale — we build the product and the growth engine that fills it.",
    relevantServiceSlugs: ["custom-software-saas", "saas-mvp-development", "seo-search-engine-marketing"],
    relatedCaseStudySlug: "leadflow-ai",
    relatedTestimonialId: "deepak-nair",
  },
  {
    slug: "healthcare-wellness",
    name: "Healthcare & Wellness",
    heroCopy: "Compliant-friendly digital experiences and SEO that drive patient inquiries.",
    relevantServiceSlugs: ["seo-search-engine-marketing", "website-ecommerce", "digital-marketing"],
    relatedTestimonialId: "priya-sharma",
  },
  {
    slug: "edtech",
    name: "EdTech",
    heroCopy: "Course platforms, learner UX, and paid acquisition that scales enrollment.",
    relevantServiceSlugs: ["website-ecommerce", "digital-marketing", "custom-software-saas"],
    relatedCaseStudySlug: "scholaredge",
    relatedTestimonialId: "arjun-kapoor",
  },
  {
    slug: "real-estate-proptech",
    name: "Real Estate & PropTech",
    heroCopy: "Listing experiences, search, and conversion journeys for property platforms.",
    relevantServiceSlugs: ["website-ecommerce", "seo-search-engine-marketing", "custom-software-saas"],
    relatedCaseStudySlug: "propsearch-real-estate",
  },
  {
    slug: "ecommerce-d2c",
    name: "E-commerce & D2C",
    heroCopy: "Fast storefronts, CRO, and performance marketing for brands that sell online.",
    relevantServiceSlugs: ["website-ecommerce", "digital-marketing", "seo-search-engine-marketing"],
    relatedTestimonialId: "tanvi-choudhary",
  },
  {
    slug: "fintech",
    name: "FinTech",
    heroCopy: "Secure dashboards, polished product UI, and brand systems for financial products.",
    relevantServiceSlugs: ["custom-software-saas", "ui-ux-design-branding", "seo-search-engine-marketing"],
    relatedCaseStudySlug: "stocksense-analytics",
    relatedTestimonialId: "neha-reddy",
  },
  {
    slug: "hospitality-food",
    name: "Hospitality & Food",
    heroCopy: "Menu experiences, brand creatives, and campaigns built for footfall and orders.",
    relevantServiceSlugs: ["website-ecommerce", "graphic-design-creative", "digital-marketing"],
    relatedCaseStudySlug: "burgerverse",
  },
  {
    slug: "professional-services-b2b",
    name: "Professional Services & B2B",
    heroCopy: "Lead systems, websites, and LinkedIn/Google acquisition for service businesses.",
    relevantServiceSlugs: ["digital-marketing", "seo-search-engine-marketing", "custom-software-saas"],
    relatedTestimonialId: "deepak-nair",
  },
];

export function getIndustryBySlug(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}
