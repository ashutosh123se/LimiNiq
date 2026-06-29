/** Valid service slugs for `/contact/service/[slug]` pre-filled contact links. */
export const CONTACT_SERVICE_SLUG_MAP: Record<string, string> = {
  "custom-software-saas": "Custom Software & SaaS",
  "website-ecommerce": "Website Development",
  "seo-search-engine-marketing": "SEO",
  "digital-marketing": "Digital Marketing",
};

export const CONTACT_SERVICE_SLUGS = Object.keys(CONTACT_SERVICE_SLUG_MAP);

export function contactServicePath(slug: string): string {
  return `/contact/service/${slug}`;
}

export function isContactServiceSlug(slug: string): boolean {
  return slug in CONTACT_SERVICE_SLUG_MAP;
}
