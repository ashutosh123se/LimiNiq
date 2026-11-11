/** Canonical public site URL — always use www (matches live domain). */
export const SITE_URL = "https://www.liminiq.com";
export const SITE_NAME = "LIMINIQ";

/** Build absolute canonical URL for a site path (consistent without trailing slash, except root). */
export function absoluteUrl(path = "/"): string {
  if (path === "/" || path === "") return SITE_URL;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath.endsWith("/") && cleanPath.length > 1 ? cleanPath.slice(0, -1) : cleanPath}`;
}

export const SITE_CONTACT = {
  email: "hello@liminiq.com",
  phone: "+91 9431471654",
  phoneTel: "+919431471654",
  phoneDisplay: "+91 94314 71654",
  location: "Delhi, India",
  streetAddress:
    "Shivangi Kunj B47C, Madipur JJ Colony, Block A, Janta Colony, Paschim Vihar",
  addressLocality: "Delhi",
  addressRegion: "Delhi",
  postalCode: "110063",
  /** Short single-line address for footer / NAP */
  addressDisplay: "Paschim Vihar, Delhi 110063, India",
  mapsQuery:
    "Shivangi Kunj B47C, Madipur JJ Colony, Block A, Janta Colony, Paschim Vihar, Delhi, 110063",
  foundingYear: "2019",
} as const;

export const SITE_SOCIAL = {
  linkedin: "https://www.linkedin.com/company/124623896",
  instagram: "https://www.instagram.com/liminiq_com",
} as const;

/** Single verified rating configuration used across all components */
export const SITE_RATING = {
  score: 4.9,
  display: "4.9★",
  label: "Verified Client Rating",
  scale: "5.0",
} as const;

/**
 * Third-party review platform profiles.
 * Set via environment variables when live public profiles are available.
 * If null/empty, badges are hidden on live pages to avoid broken links.
 */
export const REVIEW_PLATFORMS_CONFIG = {
  clutchUrl: process.env.NEXT_PUBLIC_CLUTCH_URL || null,
  googleReviewUrl: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || null,
  goodfirmsUrl: process.env.NEXT_PUBLIC_GOODFIRMS_URL || null,
} as const;
