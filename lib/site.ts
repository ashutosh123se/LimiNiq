/** Canonical public site URL — always use www (matches live domain). */
export const SITE_URL = "https://www.liminiq.com";
export const SITE_NAME = "LIMINIQ";

export const SITE_CONTACT = {
  email: "hello@liminiq.com",
  phone: "+91 9431471654",
  phoneTel: "+919431471654",
  location: "India",
  foundingYear: "2019",
} as const;

export const SITE_SOCIAL = {
  linkedin: "https://www.linkedin.com/company/124623896",
  instagram: "https://www.instagram.com/liminiq_com",
} as const;

/** Build absolute URL for a site path (e.g. `/services` → https://www.liminiq.com/services). */
export function absoluteUrl(path = "/"): string {
  if (path === "/" || path === "") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
