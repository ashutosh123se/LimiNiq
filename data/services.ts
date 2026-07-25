export interface Service {
  slug: string;
  name: string;
  category: "Software & SaaS" | "Web & Commerce" | "Mobile & Design" | "Marketing & Growth";
  isCorePillar: boolean;
  tagline: string;
  description: string;
  features: string[];
  priceFrom?: { amount: string; unit: string };
  relatedCaseStudySlugs: string[];
  icon: string;
}

export const SERVICES: Service[] = [
  {
    slug: "custom-software-saas",
    name: "Custom Software & SaaS Development",
    category: "Software & SaaS",
    isCorePillar: true,
    tagline: "Scalable, secure cloud applications engineered for complex business problems.",
    description:
      "Whether you're building a multi-tenant SaaS product from scratch or modernizing legacy software, our engineering team architects solutions that scale globally and securely.",
    features: [
      "Multi-Tenant SaaS Architecture",
      "Enterprise Web Portals",
      "Legacy System Modernization",
      "Custom ERP & CRM Solutions",
    ],
    priceFrom: { amount: "₹75,000", unit: "project" },
    relatedCaseStudySlugs: ["leadflow-ai", "stocksense-analytics", "taskmanager-pro"],
    icon: "Code2",
  },
  {
    slug: "saas-mvp-development",
    name: "SaaS MVP Development",
    category: "Software & SaaS",
    isCorePillar: false,
    tagline: "Ship a production-ready MVP fast — validated scope, clean architecture, room to scale.",
    description:
      "We help founders go from idea to live SaaS without overbuilding. Focused discovery, lean feature set, and a codebase that won't need a rewrite after product-market fit.",
    features: [
      "Scoped MVP roadmap",
      "Auth, billing & tenancy foundations",
      "Admin dashboard",
      "Deployed staging + production",
    ],
    priceFrom: { amount: "₹75,000", unit: "project" },
    relatedCaseStudySlugs: ["leadflow-ai"],
    icon: "Rocket",
  },
  {
    slug: "website-ecommerce",
    name: "Website & E-commerce Development",
    category: "Web & Commerce",
    isCorePillar: false,
    tagline: "High-performance web apps and storefronts that convert.",
    description:
      "Custom React / Next.js experiences and e-commerce platforms built for speed, security, and conversion — not template sprawl.",
    features: [
      "Next.js / React builds",
      "Headless / custom commerce",
      "Core Web Vitals optimization",
      "CMS & API integrations",
    ],
    priceFrom: { amount: "₹24,999", unit: "one-time" },
    relatedCaseStudySlugs: ["propsearch-real-estate", "burgerverse", "scholaredge"],
    icon: "Globe",
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    category: "Mobile & Design",
    isCorePillar: false,
    tagline: "Native-feel iOS and Android apps with React Native.",
    description:
      "Cross-platform mobile products with polished UX, push engagement, and backends that scale with your users.",
    features: ["React Native iOS & Android", "Push & deep links", "App Store / Play launch", "API architecture"],
    priceFrom: { amount: "₹75,000", unit: "project" },
    relatedCaseStudySlugs: [],
    icon: "Smartphone",
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    category: "Marketing & Growth",
    isCorePillar: true,
    tagline: "Precision campaigns that maximize ROI and scale revenue.",
    description:
      "Google and Meta acquisition systems with creative testing, landing-page CRO, and transparent reporting.",
    features: [
      "Google Ads (Search, Display, Shopping)",
      "Meta Ads (Facebook, Instagram)",
      "LinkedIn B2B Lead Gen",
      "Landing page CRO",
    ],
    priceFrom: { amount: "₹19,999", unit: "per month" },
    relatedCaseStudySlugs: [],
    icon: "BarChart3",
  },
  {
    slug: "seo-search-engine-marketing",
    name: "SEO & Search Engine Marketing",
    category: "Marketing & Growth",
    isCorePillar: true,
    tagline: "Data-driven SEO that dominates search and drives qualified traffic.",
    description:
      "Technical audits, keyword strategy, on-page optimization, and content systems built for compounding organic growth.",
    features: ["Technical SEO Audits & Fixes", "Keyword Research & Strategy", "On-Page Optimization", "Content & links"],
    priceFrom: { amount: "₹14,999", unit: "per month" },
    relatedCaseStudySlugs: [],
    icon: "TrendingUp",
  },
  {
    slug: "ui-ux-design-branding",
    name: "UI/UX Design & Branding",
    category: "Mobile & Design",
    isCorePillar: false,
    tagline: "Product design systems and brand identity that match product quality.",
    description:
      "Wireframes, prototypes, design systems, and brand identity for SaaS and digital products.",
    features: ["Product UI/UX", "Design systems", "Prototyping", "Brand identity"],
    relatedCaseStudySlugs: [],
    icon: "PenTool",
  },
  {
    slug: "graphic-design-creative",
    name: "Graphic Design & Creative",
    category: "Mobile & Design",
    isCorePillar: false,
    tagline: "Social creatives, pitch decks, and brand assets that look premium.",
    description: "Campaign creatives, decks, and visual systems delivered fast and on-brand.",
    features: ["Social ad creatives", "Pitch decks", "Brand assets", "Launch kits"],
    relatedCaseStudySlugs: [],
    icon: "Palette",
  },
  {
    slug: "content-creation",
    name: "Content Creation & Copywriting",
    category: "Marketing & Growth",
    isCorePillar: false,
    tagline: "SEO blog writing and conversion-focused landing page copy.",
    description:
      "Technical, confident copy that lifts authority and converts — blogs, landing pages, and product messaging.",
    features: ["SEO blog writing", "Landing page copy", "Product messaging", "Content calendars"],
    relatedCaseStudySlugs: [],
    icon: "FileText",
  },
  {
    slug: "ai-automation-cloud",
    name: "AI, Automation & Cloud Solutions",
    category: "Marketing & Growth",
    isCorePillar: false,
    tagline: "LLM chatbots, workflow automation, and cloud migration.",
    description:
      "Practical AI and automation that cut support load and speed operations — plus cloud setups that stay maintainable.",
    features: ["LLM chatbots", "Workflow automation", "Cloud migration", "API integrations"],
    relatedCaseStudySlugs: [],
    icon: "Cpu",
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export const CORE_PILLARS = SERVICES.filter((s) => s.isCorePillar);
export const SUPPORTING_SERVICES = SERVICES.filter((s) => !s.isCorePillar);
