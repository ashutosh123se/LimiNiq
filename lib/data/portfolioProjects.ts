export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: "Software" | "Web" | "Marketing";
  description: string;
  tags: string[];
  previewLabel: string;
  featured?: boolean;
  accent: string;
  year: string;
  deliverables: string[];
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "leadflow",
    title: "LeadFlow AI",
    client: "LeadFlow AI",
    category: "Software",
    description:
      "AI-assisted lead management product with pipeline views, intelligent routing, and a sales-team dashboard.",
    tags: ["JavaScript", "AI Workflows", "Dashboard"],
    previewLabel: "leadflow.app",
    featured: true,
    accent: "#00C8A0",
    year: "2026",
    deliverables: ["Lead pipeline UI", "AI routing layer", "Admin dashboard"],
  },
  {
    id: "realestate",
    title: "PropSearch Real Estate",
    client: "PropSearch",
    category: "Web",
    description:
      "Property discovery platform with listing grids, advanced filters, and a conversion-focused buyer journey.",
    tags: ["TypeScript", "Next.js", "Listings"],
    previewLabel: "propsearch.in",
    featured: true,
    accent: "#0EA5E9",
    year: "2026",
    deliverables: ["Listing experience", "Search & filters", "Mobile-first UX"],
  },
  {
    id: "stocksense",
    title: "StockSense Analytics",
    client: "StockSense",
    category: "Software",
    description:
      "Market analytics dashboard with watchlists, charting, and a dark UI tuned for financial workflows.",
    tags: ["TypeScript", "Charts", "FinTech"],
    previewLabel: "stocksense.io",
    featured: true,
    accent: "#10B981",
    year: "2026",
    deliverables: ["Analytics dashboard", "Data visualisation", "Watchlist system"],
  },
  {
    id: "scholaredge",
    title: "ScholarEdge",
    client: "ScholarEdge",
    category: "Web",
    description:
      "Education platform with course presentation, student-focused UX, and structured content architecture.",
    tags: ["Education", "Courses", "Enrollment"],
    previewLabel: "scholaredge.com",
    featured: true,
    accent: "#F59E0B",
    year: "2026",
    deliverables: ["Course pages", "Student UX", "Content structure"],
  },
  {
    id: "taskmanager",
    title: "TaskManager Pro",
    client: "Productivity Suite",
    category: "Software",
    description:
      "Task and project management app with boards, priorities, and a responsive SaaS interface.",
    tags: ["TypeScript", "Productivity", "SaaS"],
    previewLabel: "taskmanager.pro",
    featured: true,
    accent: "#6366F1",
    year: "2026",
    deliverables: ["Task boards", "Priority system", "Team workflows"],
  },
  {
    id: "burgerverse",
    title: "BurgerVerse",
    client: "BurgerVerse",
    category: "Web",
    description:
      "Restaurant brand website with menu presentation, ordering UX patterns, and bold visual identity.",
    tags: ["JavaScript", "Food & Bev", "Brand UI"],
    previewLabel: "burgerverse.co",
    featured: true,
    accent: "#EF4444",
    year: "2026",
    deliverables: ["Menu experience", "Brand site", "Conversion layout"],
  },
  {
    id: "sentimentscope",
    title: "SentimentScope",
    client: "SentimentScope",
    category: "Software",
    description:
      "Sentiment analysis application with NLP-driven insights, review parsing, and reporting dashboards.",
    tags: ["TypeScript", "NLP", "Analytics"],
    previewLabel: "sentimentscope.ai",
    accent: "#8B5CF6",
    year: "2026",
    deliverables: ["Sentiment engine", "Review analysis", "Insight dashboard"],
  },
  {
    id: "nexacommerce",
    title: "NexaCommerce API",
    client: "NexaCommerce",
    category: "Software",
    description:
      "Headless e-commerce REST API — product catalog, cart logic, and order endpoints for composable storefronts.",
    tags: ["Node.js", "REST API", "E-commerce"],
    previewLabel: "api.nexacommerce.com",
    accent: "#EC4899",
    year: "2026",
    deliverables: ["Product API", "Cart & orders", "Headless commerce"],
  },
  {
    id: "sajan-shah",
    title: "Sajan Shah Website",
    client: "Sajan Shah",
    category: "Web",
    description:
      "Personal brand website with speaker profile, event highlights, and premium editorial layout.",
    tags: ["TypeScript", "Personal Brand", "Events"],
    previewLabel: "sajanshah.com",
    accent: "#14B8A6",
    year: "2026",
    deliverables: ["Speaker profile", "Event sections", "Brand storytelling"],
  },
  {
    id: "ashutosh-portfolio",
    title: "Ashutosh Shekhar Portfolio",
    client: "Ashutosh Shekhar",
    category: "Web",
    description:
      "Developer portfolio with project highlights, skills matrix, and a modern dark aesthetic.",
    tags: ["TypeScript", "Developer", "Portfolio"],
    previewLabel: "ashutosh.dev",
    accent: "#3B82F6",
    year: "2026",
    deliverables: ["Dev portfolio", "Project grid", "Skills section"],
  },
  {
    id: "aisajanshah",
    title: "AI Sajan Shah",
    client: "Sajan Shah",
    category: "Marketing",
    description:
      "AI-powered brand experience combining speaker positioning with interactive, AI-driven content sections.",
    tags: ["JavaScript", "AI Content", "Brand"],
    previewLabel: "ai.sajanshah.com",
    accent: "#06B6D4",
    year: "2026",
    deliverables: ["AI content blocks", "Brand experience", "Interactive UI"],
  },
  {
    id: "customised-programs",
    title: "Customised Programs",
    client: "Training Programs",
    category: "Web",
    description:
      "Program catalog site for bespoke training offerings with structured modules and enrollment CTAs.",
    tags: ["Programs", "Landing pages", "CMS-ready"],
    previewLabel: "customprograms.co",
    accent: "#84CC16",
    year: "2026",
    deliverables: ["Program pages", "Module layout", "Enrollment CTAs"],
  },
  {
    id: "train-the-trainer",
    title: "Train The Trainer",
    client: "Train The Trainer",
    category: "Web",
    description:
      "Corporate training platform site with course pathways, trainer profiles, and institutional branding.",
    tags: ["Corporate Training", "Courses", "Branding"],
    previewLabel: "trainthetrainer.org",
    accent: "#F97316",
    year: "2026",
    deliverables: ["Course pathways", "Trainer profiles", "Institutional brand"],
  },
  {
    id: "fleettrack",
    title: "FleetTrack ERP",
    client: "FleetTrack Logistics",
    category: "Software",
    description:
      "Fleet operations platform with dispatch boards, driver tracking, and invoice automation for logistics teams.",
    tags: ["ERP", "Logistics", "Multi-tenant"],
    previewLabel: "fleettrack.io",
    accent: "#7B61FF",
    year: "2025",
    deliverables: ["Dispatch console", "Driver management", "Billing module"],
  },
  {
    id: "mediqueue",
    title: "MediQueue SaaS",
    client: "MediQueue Clinics",
    category: "Software",
    description:
      "Clinic scheduling and patient queue system with doctor calendars, SMS reminders, and admin reporting.",
    tags: ["Healthcare", "SaaS", "Scheduling"],
    previewLabel: "mediqueue.health",
    accent: "#22D3EE",
    year: "2025",
    deliverables: ["Appointment booking", "Queue management", "Clinic admin panel"],
  },
  {
    id: "novacart",
    title: "NovaCart Commerce",
    client: "NovaCart Retail",
    category: "Web",
    description:
      "Headless storefront with fast product pages, cart optimisation, and integrated payment checkout flows.",
    tags: ["Next.js", "E-commerce", "Headless"],
    previewLabel: "novacart.shop",
    accent: "#A855F7",
    year: "2025",
    deliverables: ["Product catalog", "Checkout flow", "Performance tuning"],
  },
  {
    id: "rankforge",
    title: "RankForge SEO Suite",
    client: "RankForge Agency",
    category: "Marketing",
    description:
      "SEO reporting portal with rank tracking, technical audit summaries, and client-facing dashboards.",
    tags: ["SEO", "Reporting", "Analytics"],
    previewLabel: "rankforge.io",
    accent: "#10B981",
    year: "2025",
    deliverables: ["Rank dashboards", "Audit reports", "Client portal"],
  },
  {
    id: "payflow",
    title: "PayFlow Fintech",
    client: "PayFlow",
    category: "Software",
    description:
      "Payments operations dashboard with transaction monitoring, reconciliation views, and role-based access.",
    tags: ["FinTech", "Dashboard", "Security"],
    previewLabel: "payflow.finance",
    accent: "#3B5BFF",
    year: "2025",
    deliverables: ["Transaction monitor", "Reconciliation UI", "RBAC system"],
  },
  {
    id: "artisan-studio",
    title: "Artisan Studio Co.",
    client: "Artisan Studio",
    category: "Web",
    description:
      "Creative agency website with case-study storytelling, service tiers, and a cinematic scroll experience.",
    tags: ["Creative", "Brand UI", "Motion"],
    previewLabel: "artisanstudio.co",
    accent: "#F472B6",
    year: "2025",
    deliverables: ["Agency site", "Case study layout", "Service pages"],
  },
  {
    id: "growthpilot",
    title: "GrowthPilot Ads",
    client: "GrowthPilot",
    category: "Marketing",
    description:
      "Paid media command centre with campaign performance tiles, ROAS tracking, and budget pacing alerts.",
    tags: ["Google Ads", "Meta Ads", "ROAS"],
    previewLabel: "growthpilot.ads",
    accent: "#0EA5E9",
    year: "2025",
    deliverables: ["Campaign dashboard", "ROAS tracking", "Budget alerts"],
  },
  {
    id: "legaldesk",
    title: "LegalDesk Portal",
    client: "LegalDesk LLP",
    category: "Web",
    description:
      "Law firm client portal with document uploads, case status tracking, and secure messaging workflows.",
    tags: ["Legal Tech", "Portal", "Secure UX"],
    previewLabel: "legaldesk.in",
    accent: "#64748B",
    year: "2025",
    deliverables: ["Client portal", "Document vault", "Case tracking"],
  },
  {
    id: "cloudstack-crm",
    title: "CloudStack CRM",
    client: "CloudStack IT",
    category: "Software",
    description:
      "B2B CRM with pipeline stages, contact enrichment, email sequences, and team activity timelines.",
    tags: ["CRM", "B2B SaaS", "Automation"],
    previewLabel: "cloudstack-crm.com",
    accent: "#059669",
    year: "2025",
    deliverables: ["Sales pipeline", "Email automation", "Activity timeline"],
  },
  {
    id: "craftbite",
    title: "CraftBite D2C",
    client: "CraftBite Foods",
    category: "Marketing",
    description:
      "D2C launch strategy with Meta campaign architecture, landing page CRO, and retention email flows.",
    tags: ["D2C", "Meta Ads", "CRO"],
    previewLabel: "craftbite.in",
    accent: "#D97706",
    year: "2025",
    deliverables: ["Ad funnels", "Landing CRO", "Retention emails"],
  },
];

export const PORTFOLIO_FILTERS = ["All", "Software", "Web", "Marketing"] as const;

export function getFeaturedProjects(limit?: number, list: PortfolioProject[] = PORTFOLIO_PROJECTS) {
  const featured = list.filter((p) => p.featured);
  const result = featured.length > 0 ? featured : list;
  return limit ? result.slice(0, limit) : result;
}

export function getProjectById(id: string) {
  return PORTFOLIO_PROJECTS.find((p) => p.id === id);
}

export function getFeaturedProject() {
  return PORTFOLIO_PROJECTS.find((p) => p.id === "leadflow") ?? PORTFOLIO_PROJECTS[0];
}
