export interface CaseStudy {
  slug: string;
  title: string;
  category: "Software" | "Web" | "Marketing";
  year: string;
  summary: string;
  tags: string[];
  liveUrl?: string;
  imageSrc: string;
  challenge: string;
  approach: string;
  solution: string;
  results: { label: string; value: string }[];
  techStack: string[];
  clientQuoteTestimonialId?: string;
  featured?: boolean;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "leadflow-ai",
    title: "LeadFlow AI",
    category: "Software",
    year: "2026",
    summary:
      "AI-assisted lead management product with pipeline views, intelligent routing, and a sales-team dashboard.",
    tags: ["Lead pipeline UI", "AI routing layer", "Admin dashboard"],
    liveUrl: "https://leadflow.app",
    imageSrc: "/images/portfolio/ecommerce_dashboard.png",
    challenge:
      "The sales team needed a single pipeline with smarter routing instead of scattered spreadsheets and manual assignment.",
    approach:
      "We scoped a multi-tenant SaaS MVP: CRM-style boards, AI-assisted routing rules, and an admin layer for ops.",
    solution:
      "Shipped a production dashboard with pipeline views, routing automation, and role-based access for sales + admins.",
    results: [
      { label: "Ship vs plan", value: "2 weeks early" },
      { label: "Pipeline visibility", value: "100%" },
      { label: "Manual routing", value: "−70%" },
    ],
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "AI workflows"],
    clientQuoteTestimonialId: "deepak-nair",
    featured: true,
  },
  {
    slug: "propsearch-real-estate",
    title: "PropSearch Real Estate",
    category: "Web",
    year: "2026",
    summary: "Property discovery platform with listing grids, advanced filters, and a conversion-focused buyer journey.",
    tags: ["Listing experience", "Search & filters", "Mobile-first UX"],
    imageSrc: "/images/portfolio/realestate_platform.png",
    challenge: "Buyers abandoned listing pages that were slow and hard to filter on mobile.",
    approach: "Rebuild listing UX around filters, performance, and a clear path to inquiry.",
    solution: "A Next.js listing experience with advanced filters and mobile-first conversion flows.",
    results: [
      { label: "Mobile UX", value: "Rebuilt" },
      { label: "Filter depth", value: "Advanced" },
      { label: "Stack", value: "Next.js" },
    ],
    techStack: ["Next.js", "TypeScript", "Listings"],
    featured: true,
  },
  {
    slug: "stocksense-analytics",
    title: "StockSense Analytics",
    category: "Software",
    year: "2026",
    summary: "Market analytics dashboard with watchlists, charting, and a dark UI tuned for financial workflows.",
    tags: ["Analytics dashboard", "Data visualisation", "Watchlist system"],
    imageSrc: "/images/services/saas_dev.png",
    challenge: "Traders needed dense data without sacrificing clarity or dark-mode readability.",
    approach: "Design a FinTech dashboard language, then engineer charting + watchlists on a TypeScript stack.",
    solution: "Production analytics UI with watchlists, charts, and workflows tuned for market data.",
    results: [
      { label: "UI mode", value: "Dark-first" },
      { label: "Core views", value: "Charts + lists" },
      { label: "Domain", value: "FinTech" },
    ],
    techStack: ["TypeScript", "Charts", "FinTech"],
    featured: true,
  },
  {
    slug: "scholaredge",
    title: "ScholarEdge",
    category: "Web",
    year: "2026",
    summary: "Education platform with course presentation, student-focused UX, and structured content architecture.",
    tags: ["Course pages", "Student UX", "Content structure"],
    imageSrc: "/images/portfolio/edtech_marketing.png",
    challenge: "Course content was hard to navigate and enrollment paths were unclear.",
    approach: "Restructure information architecture and ship student-focused course presentation.",
    solution: "Education web experience with clear course pages and enrollment-oriented UX.",
    results: [
      { label: "IA", value: "Restructured" },
      { label: "Focus", value: "Students" },
      { label: "Type", value: "EdTech" },
    ],
    techStack: ["Education", "Courses", "Enrollment"],
    featured: true,
  },
  {
    slug: "taskmanager-pro",
    title: "TaskManager Pro",
    category: "Software",
    year: "2026",
    summary: "Task and project management app with boards, priorities, and a responsive SaaS interface.",
    tags: ["Task boards", "Priorities", "SaaS UI"],
    imageSrc: "/images/portfolio/legal_brand_website.png",
    challenge: "Teams needed a lightweight board product without enterprise bloat.",
    approach: "Build a responsive SaaS task board with priorities and clean empty states.",
    solution: "TaskManager Pro — boards, priorities, and a production-ready SaaS shell.",
    results: [
      { label: "Views", value: "Boards" },
      { label: "Platform", value: "SaaS" },
      { label: "UX", value: "Responsive" },
    ],
    techStack: ["TypeScript", "Productivity", "SaaS"],
    featured: true,
  },
  {
    slug: "burgerverse",
    title: "BurgerVerse",
    category: "Web",
    year: "2026",
    summary: "Hospitality web experience focused on menu presentation and order-ready journeys.",
    tags: ["Menu experience", "Brand web", "Mobile UX"],
    imageSrc: "/images/portfolio/social_commerce_food.png",
    challenge: "The brand needed a menu-forward site that felt premium on mobile.",
    approach: "Design a bold menu experience with clear CTAs into ordering channels.",
    solution: "BurgerVerse web — menu-led layout optimized for mobile discovery.",
    results: [
      { label: "Focus", value: "Menu UX" },
      { label: "Device", value: "Mobile-first" },
      { label: "Industry", value: "Food" },
    ],
    techStack: ["Next.js", "Brand", "Hospitality"],
    featured: true,
  },
];

export function getCaseStudyBySlug(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export function getFeaturedCaseStudies(limit = 6) {
  const featured = CASE_STUDIES.filter((c) => c.featured);
  return (featured.length ? featured : CASE_STUDIES).slice(0, limit);
}
