/** Canonical public site URL — always use www (matches live domain). */
export const SITE_URL = "https://www.liminiq.com";
export const SITE_NAME = "LIMINIQ";

/** Build absolute URL for a site path. Homepage uses trailing slash for GSC/canonical alignment. */
export function absoluteUrl(path = "/"): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const SITE_CONTACT = {
  email: "hello@liminiq.com",
  phone: "+91 9431471654",
  phoneTel: "+919431471654",
  phoneDisplay: "9431471654",
  location: "Delhi, India",
  streetAddress:
    "Shivangi Kunj B47C, Madipur JJ Colony, Block A, Janta Colony, Paschim Vihar",
  addressLocality: "Delhi",
  addressRegion: "Delhi",
  postalCode: "110063",
  /** Short single-line address for footer / NAP */
  addressDisplay: "Paschim Vihar, Delhi 110063, India",
  mapsQuery:
    "Shivangi KunjB47C, Madipur JJ Colony, Block A, Janta Colony, Paschim Vihar, Delhi, 110063",
  foundingYear: "2019",
} as const;

export const SITE_SOCIAL = {
  linkedin: "https://www.linkedin.com/company/124623896",
  instagram: "https://www.instagram.com/liminiq_com",
} as const;
