export type CurrencyCode = "USD" | "EUR" | "GBP" | "INR";

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  label: string;
  flag: string;
}

export const SUPPORTED_CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: "USD", symbol: "$", label: "USD ($)", flag: "🇺🇸" },
  EUR: { code: "EUR", symbol: "€", label: "EUR (€)", flag: "🇪🇺" },
  GBP: { code: "GBP", symbol: "£", label: "GBP (£)", flag: "🇬🇧" },
  INR: { code: "INR", symbol: "₹", label: "INR (₹)", flag: "🇮🇳" },
};

export interface TierPrice {
  amount: string;
  unit: string;
  note: string;
}

export interface PricingTier {
  id: string;
  label: string;
  tagline: string;
  popular?: boolean;
  category: "core" | "additional";
  serviceNames: string[];
  prices: Record<CurrencyCode, TierPrice>;
  /** Backwards compatibility fallbacks */
  priceFrom: string;
  unit: string;
  note: string;
  /** What's actually handed over during the engagement — shown in the comparison table. */
  deliverables: string[];
  /** Typical delivery window for this tier. */
  timeline: string;
  /** Revision policy included in the base price. */
  revisions: string;
  /** What ongoing support looks like once live. */
  support: string;
}

export interface EngagementModel {
  id: string;
  title: string;
  tagline: string;
  bestFor: string;
  features: string[];
  iconName: "ShieldCheck" | "Users" | "Clock" | "Zap";
}

export interface InternationalWorkflowStep {
  step: string;
  title: string;
  description: string;
  badge: string;
}

/**
 * Standardized pricing tiers.
 * Note: Starting ranges are placeholders to be confirmed by client [STARTING_PRICE_CONFIRMATION].
 */
export const PRICING_TIERS: PricingTier[] = [
  {
    id: "ai-automation",
    label: "AI Automation & Agents",
    tagline: "Autonomous workflows & LLM pipelines that cut manual overhead by 50%+",
    popular: true,
    category: "core",
    serviceNames: [
      "Custom AI Agents & Tool Calling",
      "Document & Invoice OCR Pipelines",
      "Bi-directional CRM & ERP Automation",
      "Executive Analytics & Alerting Bots",
    ],
    prices: {
      USD: { amount: "$2,500", unit: "project", note: "scoped after discovery (or $1,500/mo retainer)" },
      EUR: { amount: "€2,300", unit: "project", note: "scoped after discovery (or €1,400/mo retainer)" },
      GBP: { amount: "£2,000", unit: "project", note: "scoped after discovery (or £1,200/mo retainer)" },
      INR: { amount: "₹1,25,000", unit: "project", note: "scoped after discovery (or ₹75,000/mo retainer)" },
    },
    priceFrom: "$2,500",
    unit: "project",
    note: "scoped after discovery",
    deliverables: [
      "Workflow architecture & security audit",
      "Multi-step agent pipelines (n8n, LangChain, custom APIs)",
      "Zero-retention data privacy controls & RBAC",
      "Production deployment + automated fallback monitors",
    ],
    timeline: "2–6 weeks, scope-dependent",
    revisions: "2 structured revision rounds + 30-day testing window",
    support: "30-day production warranty & SLA included",
  },
  {
    id: "software",
    label: "Custom Software & SaaS",
    tagline: "Production-grade web apps, multi-tenant architectures, and scalable APIs",
    popular: false,
    category: "core",
    serviceNames: [
      "Next.js / Node.js Full-Stack Web Apps",
      "Multi-Tenant SaaS Architecture",
      "PostgreSQL / Vector DB Data Models",
      "Role-Based Access Control (RBAC) & Auth",
    ],
    prices: {
      USD: { amount: "$5,000", unit: "project", note: "scoped after discovery" },
      EUR: { amount: "€4,600", unit: "project", note: "scoped after discovery" },
      GBP: { amount: "£4,000", unit: "project", note: "scoped after discovery" },
      INR: { amount: "₹2,50,000", unit: "project", note: "scoped after discovery" },
    },
    priceFrom: "$5,000",
    unit: "project",
    note: "scoped after discovery",
    deliverables: [
      "Discovery & technical specification (SRS)",
      "Working staging environment with continuous delivery",
      "Multi-tenant billing (Stripe) & RBAC security",
      "Production deployment on AWS / Vercel + full source code IP handover",
    ],
    timeline: "4–14 weeks, milestone-based",
    revisions: "Milestone-based acceptance criteria & bug-fix guarantee",
    support: "60-day post-launch warranty included",
  },
  {
    id: "saas-mvp",
    label: "SaaS MVP Sprint",
    tagline: "Go from concept to paying customers in 4 weeks with an investor-ready MVP",
    popular: false,
    category: "core",
    serviceNames: [
      "Rapid Product Prototyping",
      "Auth, Stripe Billing & Core Feature Loop",
      "High-Conversion Tailwind UI/UX",
      "Vercel / Cloudflare Production Setup",
    ],
    prices: {
      USD: { amount: "$3,500", unit: "sprint", note: "fixed 4-week build" },
      EUR: { amount: "€3,200", unit: "sprint", note: "fixed 4-week build" },
      GBP: { amount: "£2,800", unit: "sprint", note: "fixed 4-week build" },
      INR: { amount: "₹1,75,000", unit: "sprint", note: "fixed 4-week build" },
    },
    priceFrom: "$3,500",
    unit: "sprint",
    note: "fixed 4-week build",
    deliverables: [
      "Clickable prototype & interactive Figma wireframes",
      "Core user journey with database schema & authentication",
      "Stripe payment integration + customer onboarding",
      "Full source code ownership & staging walkthrough",
    ],
    timeline: "3–4 weeks fixed delivery",
    revisions: "Weekly sprint demos & agile backlog grooming",
    support: "30-day bug-fix guarantee included",
  },
  {
    id: "dedicated-team",
    label: "Dedicated Sprint Pod",
    tagline: "Dedicated senior engineers embedded in your workflow with live timezone overlap",
    popular: false,
    category: "core",
    serviceNames: [
      "Full-Time or Fractional Senior Developers",
      "US East, UK & Gulf Timezone Overlap",
      "Direct Slack / Linear / GitHub Collaboration",
      "Continuous CI/CD Shipping Cadence",
    ],
    prices: {
      USD: { amount: "$2,000", unit: "per month", note: "per engineer / rolling sprint" },
      EUR: { amount: "€1,850", unit: "per month", note: "per engineer / rolling sprint" },
      GBP: { amount: "£1,600", unit: "per month", note: "per engineer / rolling sprint" },
      INR: { amount: "₹1,00,000", unit: "per month", note: "per engineer / rolling sprint" },
    },
    priceFrom: "$2,000",
    unit: "per month",
    note: "cancel anytime",
    deliverables: [
      "Dedicated senior engineer (40 hrs/wk or fractional)",
      "Daily asynchronous check-ins + weekly live demo",
      "Direct commits to your repository with PR reviews",
      "Flexible backlog prioritization as your roadmap shifts",
    ],
    timeline: "Ongoing monthly rolling (cancel anytime)",
    revisions: "Continuous agile iterations & priority shifts",
    support: "Guaranteed 4-hour SLA response on critical blockers",
  },
  {
    id: "web",
    label: "Websites & Digital Platforms",
    tagline: "High-performance Next.js marketing sites engineered for Core Web Vitals & conversion",
    popular: false,
    category: "additional",
    serviceNames: [
      "Custom Next.js & React Frontends",
      "Headless CMS Integration",
      "Core Web Vitals Optimization (95+ score)",
      "Interactive Product Demos & Calculators",
    ],
    prices: {
      USD: { amount: "$1,500", unit: "one-time", note: "scope-dependent" },
      EUR: { amount: "€1,400", unit: "one-time", note: "scope-dependent" },
      GBP: { amount: "£1,200", unit: "one-time", note: "scope-dependent" },
      INR: { amount: "₹45,000", unit: "one-time", note: "scope-dependent" },
    },
    priceFrom: "$1,500",
    unit: "one-time",
    note: "scope-dependent",
    deliverables: [
      "UX wireframes & responsive UI design system",
      "Modern Next.js (App Router) codebase",
      "Headless CMS setup (Sanity / Strapi / MDX)",
      "LCP < 2.5s speed optimization pass",
    ],
    timeline: "2–5 weeks",
    revisions: "2 structured design revision rounds",
    support: "14-day post-launch support included",
  },
  {
    id: "seo",
    label: "Technical SEO & CRO",
    tagline: "Systematic technical SEO, schema architecture, and conversion rate optimization",
    popular: false,
    category: "additional",
    serviceNames: [
      "Deep Technical Site & Indexing Audits",
      "Programmatic SEO & Structured Data",
      "Conversion Rate Optimization (CRO)",
      "Monthly Growth Sprints & Performance Reports",
    ],
    prices: {
      USD: { amount: "$800", unit: "per month", note: "retainer" },
      EUR: { amount: "€750", unit: "per month", note: "retainer" },
      GBP: { amount: "£650", unit: "per month", note: "retainer" },
      INR: { amount: "₹25,000", unit: "per month", note: "retainer" },
    },
    priceFrom: "$800",
    unit: "per month",
    note: "retainer",
    deliverables: [
      "Technical SEO fix backlog & schema implementation",
      "Content gap analysis & search intent mapping",
      "Continuous on-page optimization sprints",
      "Transparent monthly ranking & traffic reporting",
    ],
    timeline: "Ongoing monthly retainer",
    revisions: "Continuous sprint improvements",
    support: "Dedicated technical SEO lead + monthly strategy review",
  },
  {
    id: "ads",
    label: "Paid Acquisition & Marketing",
    tagline: "High-intent paid ad funnels across Google Search, LinkedIn, and Meta",
    popular: false,
    category: "additional",
    serviceNames: [
      "Multi-Channel Campaign Architecture",
      "High-Converting Landing Page Design",
      "Ad Creative Direction & Copywriting",
      "Conversion Tracking & Attribution Setup",
    ],
    prices: {
      USD: { amount: "$1,000", unit: "per month", note: "+ ad spend" },
      EUR: { amount: "€920", unit: "per month", note: "+ ad spend" },
      GBP: { amount: "£800", unit: "per month", note: "+ ad spend" },
      INR: { amount: "₹30,000", unit: "per month", note: "+ ad spend" },
    },
    priceFrom: "$1,000",
    unit: "per month",
    note: "+ ad spend",
    deliverables: [
      "Account audit & full campaign structuring",
      "High-intent ad copy & creative variants",
      "Conversion tracking & server-side event setup",
      "Weekly performance dashboard & budget optimization",
    ],
    timeline: "Ongoing monthly retainer",
    revisions: "Continuous A/B testing of angles and pages",
    support: "Dedicated growth manager + weekly check-in",
  },
];

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    id: "fixed-milestone",
    title: "Fixed-Price Milestone",
    tagline: "Predictable scope, zero cost surprises",
    bestFor: "Best for SaaS MVPs, specific AI integrations, and scoped automation pipelines",
    features: [
      "100% fixed quote with milestone deliverables",
      "Payments tied to signed-off working staging builds",
      "Comprehensive SRS and architecture specification",
      "Guaranteed post-launch warranty and bug-fix SLA",
    ],
    iconName: "ShieldCheck",
  },
  {
    id: "dedicated-pod",
    title: "Dedicated Sprint Pod",
    tagline: "Senior engineering velocity on demand",
    bestFor: "Best for funded startups and scaling teams needing dedicated development velocity",
    features: [
      "Dedicated senior full-stack & AI engineers",
      "4–6 hours live timezone overlap with US East/UK/Gulf",
      "Direct integration into your Slack, Linear, and GitHub",
      "Weekly sprint demos, agile backlog grooming, and CI/CD",
    ],
    iconName: "Users",
  },
  {
    id: "monthly-retainer",
    title: "Monthly Retainer & SLA",
    tagline: "Continuous evolution & mission-critical support",
    bestFor: "Best for production applications needing continuous feature velocity and AI pipeline tuning",
    features: [
      "Guaranteed priority response times (under 4 hours)",
      "Continuous model tuning, vector DB indexing & prompt optimization",
      "Security patching, dependency upgrades & uptime monitoring",
      "Flexible monthly hours with rollover options",
    ],
    iconName: "Clock",
  },
];

export const INTERNATIONAL_WORKFLOW: InternationalWorkflowStep[] = [
  {
    step: "01",
    title: "Mutual NDA & Technical Discovery",
    description: "Before technical discovery begins, we execute a mutual NDA protecting your intellectual property, system data, and trade secrets.",
    badge: "Confidentiality",
  },
  {
    step: "02",
    title: "International MSA & Clear SOW",
    description: "All contracts follow US, UK, and international commercial standards with explicit milestone deliverables and acceptance criteria.",
    badge: "Legal Protection",
  },
  {
    step: "03",
    title: "Milestone-Gated Billing",
    description: "Zero 100% upfront risk. Payments are structured across verifiable milestones (e.g., 30% kickoff, 40% functional staging demo, 30% production sign-off).",
    badge: "Milestone Escrow",
  },
  {
    step: "04",
    title: "Global Multi-Currency Rails",
    description: "Invoice and pay seamlessly in USD, GBP, EUR, or AUD via Stripe, Wise, international wire transfer (ACH / SWIFT / SEPA), or PayPal.",
    badge: "Frictionless Billing",
  },
  {
    step: "05",
    title: "Live Timezone Overlap & Async Cadence",
    description: "Our senior engineers maintain 4–6 hours of live daily overlap with US East (EST), UK (GMT), and Gulf (GST) working hours, paired with transparent Slack and Loom updates.",
    badge: "4–6h Live Overlap",
  },
  {
    step: "06",
    title: "100% IP & Code Ownership",
    description: "You hold complete, unencumbered ownership of all code repositories, models, architectural documentation, and cloud infrastructure upon project handover.",
    badge: "100% Code Ownership",
  },
];

export function getTierPrice(tier: PricingTier, currency: CurrencyCode): TierPrice {
  return tier.prices[currency] || tier.prices.USD;
}
