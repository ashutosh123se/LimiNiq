export interface PricingTier {
  id: string;
  label: string;
  serviceNames: string[];
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

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "software",
    label: "Software & Systems",
    serviceNames: ["Custom Software & SaaS", "SaaS MVP", "Multi-tenant architecture"],
    priceFrom: "₹75,000",
    unit: "project",
    note: "final quote after discovery",
    deliverables: [
      "Discovery & architecture document",
      "Working MVP or module in staging",
      "Admin dashboard & role-based access",
      "Production deployment + handover docs",
    ],
    timeline: "4–16 weeks, scope-dependent",
    revisions: "2 structured revision rounds + bug-fix window",
    support: "30-day post-launch support included",
  },
  {
    id: "web",
    label: "Websites & Stores",
    serviceNames: ["Web & E-commerce", "Next.js/React", "E-commerce"],
    priceFrom: "₹24,999",
    unit: "one-time",
    note: "depends on scope",
    deliverables: [
      "UX wireframes & content structure",
      "Responsive Next.js build",
      "CMS / API integrations",
      "Core Web Vitals performance pass",
    ],
    timeline: "2–6 weeks",
    revisions: "2 design revision rounds",
    support: "14-day post-launch support included",
  },
  {
    id: "seo",
    label: "Organic Growth",
    serviceNames: ["SEO & Search Marketing", "Technical audit", "Content & links"],
    priceFrom: "₹14,999",
    unit: "per month",
    note: "retainer",
    deliverables: [
      "Technical SEO audit & fix list",
      "Keyword & content roadmap",
      "On-page optimization sprints",
      "Monthly rankings & traffic report",
    ],
    timeline: "Ongoing monthly retainer",
    revisions: "Unlimited within the monthly sprint scope",
    support: "Dedicated SEO lead + monthly strategy call",
  },
  {
    id: "ads",
    label: "Paid Acquisition",
    serviceNames: ["Digital Marketing", "Google & Meta Ads", "Landing page CRO"],
    priceFrom: "₹19,999",
    unit: "per month",
    note: "+ ad spend",
    deliverables: [
      "Campaign architecture & targeting",
      "Ad creative direction & copy",
      "Landing page CRO",
      "Weekly performance reporting",
    ],
    timeline: "Ongoing monthly retainer",
    revisions: "Continuous A/B testing & optimization",
    support: "Dedicated media buyer + weekly check-in",
  },
];
