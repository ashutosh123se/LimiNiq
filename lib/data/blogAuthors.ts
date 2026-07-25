export interface BlogAuthorInfo {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

const BLOG_AUTHORS: Record<string, Omit<BlogAuthorInfo, "name" | "initials">> = {
  "Aryan Shah": {
    role: "Frontend Engineer",
    bio: "Frontend engineer at LIMINIQ focused on Core Web Vitals, rendering performance, and modern React/Next.js architecture.",
  },
  "Priya Nair": {
    role: "SEO Lead",
    bio: "SEO lead at LIMINIQ specializing in technical SEO, entity optimization, and search visibility strategy.",
  },
  "Ayush Shekhar": {
    role: "Technical Head",
    bio: "Technical Head at LIMINIQ. Leads architecture and engineering for SaaS, web, and commerce builds.",
  },
  "Akanksha Singh": {
    role: "Marketing Head",
    bio: "Marketing Head at LIMINIQ, owning SEO, paid acquisition, and growth strategy.",
  },
  "LIMINIQ Team": {
    role: "Editorial Team",
    bio: "Insights from the engineers, strategists, and marketers building LIMINIQ client products.",
  },
};

function initialsFor(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Resolve a byline name to display info — falls back gracefully for unknown authors. */
export function getAuthorInfo(name: string): BlogAuthorInfo {
  const known = BLOG_AUTHORS[name];
  return {
    name,
    role: known?.role ?? "Contributor",
    bio: known?.bio ?? `${name} contributes insights on software, SEO, and growth at LIMINIQ.`,
    initials: initialsFor(name) || "LQ",
  };
}
