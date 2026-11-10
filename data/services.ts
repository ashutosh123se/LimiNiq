export interface Service {
  slug: string;
  name: string;
  category: "AI & Software" | "Web & Mobile" | "Growth & Marketing" | "Design & Creative";
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
    slug: "ai-automation",
    name: "AI Automation & Autonomous Agents",
    category: "AI & Software",
    isCorePillar: true,
    tagline: "Autonomous workflows, custom LLM agents, and data pipelines that cut manual operations by 50%+.",
    description:
      "We design, build, and deploy production AI agents and custom automation systems. From customer support triage and CRM lead routing to automated document parsing and predictive reporting, our solutions integrate directly into your existing software stack.",
    features: [
      "Custom LLM Agents & Tool-Calling Systems",
      "Automated Document & Invoice Processing (OCR + LLM)",
      "Intelligent CRM Lead Scoring & Routing",
      "Multi-System Workflow Orchestration",
      "24/7 Tier-1 Autonomous Support Bots",
    ],
    priceFrom: { amount: "$2,500", unit: "starting" },
    relatedCaseStudySlugs: ["leadflow-ai", "taskmanager-pro"],
    icon: "Cpu",
  },
  {
    slug: "custom-software-saas",
    name: "Custom Software & SaaS Development",
    category: "AI & Software",
    isCorePillar: true,
    tagline: "Scalable, secure cloud applications engineered for complex business problems.",
    description:
      "Whether you're building a multi-tenant SaaS product from scratch or modernizing legacy software, our engineering team architects solutions that scale globally and securely with zero technical debt.",
    features: [
      "Multi-Tenant SaaS Architecture",
      "Enterprise Web Applications",
      "API Architecture & Microservices",
      "Custom ERP & CRM Solutions",
      "Full IP Transfer & Milestone Billing",
    ],
    priceFrom: { amount: "$5,000", unit: "project" },
    relatedCaseStudySlugs: ["leadflow-ai", "stocksense-analytics", "taskmanager-pro"],
    icon: "Code2",
  },
  {
    slug: "saas-mvp-development",
    name: "SaaS MVP Development",
    category: "AI & Software",
    isCorePillar: true,
    tagline: "Ship a production-ready MVP in 4–8 weeks — validated scope, clean code, built to scale.",
    description:
      "We help founders and product teams go from concept to live, revenue-generating SaaS fast. Focused discovery, lean architecture, complete tenancy & billing foundations, and zero rewrite required after product-market fit.",
    features: [
      "4–8 Week Scoped MVP Delivery",
      "Auth, Multi-Tenancy & Stripe/LemonSqueezy Billing",
      "Admin & Customer Portals",
      "Staging + Production CI/CD Pipelines",
    ],
    priceFrom: { amount: "$3,500", unit: "project" },
    relatedCaseStudySlugs: ["leadflow-ai"],
    icon: "Rocket",
  },
  {
    slug: "website-ecommerce",
    name: "Website & E-commerce Development",
    category: "Web & Mobile",
    isCorePillar: false,
    tagline: "High-performance web applications and digital storefronts that convert.",
    description:
      "Custom Next.js experiences and headless e-commerce platforms engineered for sub-second page loads, Core Web Vitals optimization, and conversion-focused buyer journeys.",
    features: [
      "Next.js App Router Architecture",
      "Headless E-commerce & Checkout",
      "Core Web Vitals Optimization",
      "CMS & Custom Backend Integrations",
    ],
    priceFrom: { amount: "$1,500", unit: "starting" },
    relatedCaseStudySlugs: ["propsearch-real-estate", "burgerverse", "scholaredge"],
    icon: "Globe",
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    category: "Web & Mobile",
    isCorePillar: false,
    tagline: "Native-feel iOS and Android applications with React Native.",
    description:
      "Cross-platform mobile products with polished 60fps UX, offline data sync, push engagement, and secure backend integrations.",
    features: ["React Native iOS & Android", "Push & Deep Linking", "App Store & Play Store Launch", "Offline Data Sync"],
    priceFrom: { amount: "$4,500", unit: "project" },
    relatedCaseStudySlugs: [],
    icon: "Smartphone",
  },
  {
    slug: "seo-search-engine-marketing",
    name: "SEO & Organic Growth",
    category: "Growth & Marketing",
    isCorePillar: false,
    tagline: "Technical SEO and programmatic search engines that build durable inbound pipelines.",
    description:
      "Technical audits, international keyword strategy, on-page optimization, and programmatic content architecture built for compounding organic search traffic.",
    features: ["Technical SEO Audits & Fixes", "International Keyword Strategy", "On-Page & Schema Optimization", "Content & Link Architecture"],
    priceFrom: { amount: "$1,200", unit: "per month" },
    relatedCaseStudySlugs: [],
    icon: "TrendingUp",
  },
  {
    slug: "digital-marketing",
    name: "Paid Acquisition & Performance Marketing",
    category: "Growth & Marketing",
    isCorePillar: false,
    tagline: "Precision multi-channel campaigns that turn ad spend into profitable pipeline.",
    description:
      "Google, Meta, and LinkedIn acquisition systems with rigorous creative testing, high-converting landing page funnels, and transparent attribution.",
    features: [
      "Google Ads (Search & Performance Max)",
      "LinkedIn B2B Account-Based Marketing",
      "Meta Ads & Creative Testing",
      "Landing Page Conversion Optimization",
    ],
    priceFrom: { amount: "$1,500", unit: "per month" },
    relatedCaseStudySlugs: [],
    icon: "BarChart3",
  },
  {
    slug: "ui-ux-design-branding",
    name: "UI/UX Design & Design Systems",
    category: "Design & Creative",
    isCorePillar: false,
    tagline: "Product design systems and brand identity that reflect enterprise quality.",
    description:
      "Interactive Figma wireframes, clickable prototypes, comprehensive token-based design systems, and brand identities tailored for software and SaaS products.",
    features: ["Product UI/UX & Wireframing", "Tokenized Design Systems", "Interactive Prototyping", "Brand Identity & Guidelines"],
    relatedCaseStudySlugs: [],
    icon: "PenTool",
  },
  {
    slug: "graphic-design-creative",
    name: "Creative & Visual Systems",
    category: "Design & Creative",
    isCorePillar: false,
    tagline: "High-impact brand collateral, pitch decks, and digital campaign creative.",
    description: "Multi-format creative assets, investor pitch decks, and visual systems delivered fast and consistently on-brand.",
    features: ["Campaign Ad Sets", "Investor Pitch Decks", "Product Launch Assets", "Brand Motion Assets"],
    relatedCaseStudySlugs: [],
    icon: "Palette",
  },
  {
    slug: "content-creation",
    name: "Technical Content & Copywriting",
    category: "Growth & Marketing",
    isCorePillar: false,
    tagline: "Authoritative technical content and high-converting landing page copy.",
    description:
      "Deep technical writing, product marketing pages, and developer documentation that build domain authority and drive signups.",
    features: ["Technical Blog Writing", "High-Converting Landing Pages", "Product Marketing Copy", "Documentation & Whitepapers"],
    relatedCaseStudySlugs: [],
    icon: "FileText",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  if (slug === "ai-automation-cloud") {
    return SERVICES.find((s) => s.slug === "ai-automation");
  }
  return SERVICES.find((s) => s.slug === slug);
}

export const CORE_PILLARS = SERVICES.filter((s) => s.isCorePillar);
export const SUPPORTING_SERVICES = SERVICES.filter((s) => !s.isCorePillar);
