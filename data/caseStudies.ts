export interface CaseStudy {
  slug: string;
  title: string;
  category: "Software" | "Web" | "Marketing";
  year: string;
  summary: string;
  tags: string[];
  liveUrl?: string;
  imageSrc: string;
  clientContext: string;
  challenge: string;
  approach: string;
  solution: string;
  timeline: string;
  projectType: "Client Delivery (Flagship)" | "Client Delivery" | "Internal R&D / Concept";
  results: { label: string; value: string }[];
  techStack: string[];
  clientQuoteTestimonialId?: string;
  featured?: boolean;
  videoUrl?: string;
  ctaText?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "leadflow-ai",
    title: "LeadFlow AI",
    category: "Software",
    year: "2026",
    summary:
      "Flagship AI-assisted lead orchestration platform with real-time routing agents, pipeline analytics, and zero-delay sales rep distribution.",
    tags: ["Autonomous Routing", "LLM Pipeline", "Next.js 15", "Role-Based Access"],
    liveUrl: "https://leadflow.app",
    imageSrc: "/images/portfolio/ecommerce_dashboard.png",
    clientContext: "CloudStack IT / ApexFlow · B2B Enterprise SaaS [REAL_CLIENT_NAME]",
    projectType: "Client Delivery (Flagship)",
    timeline: "6 weeks from architecture to production",
    videoUrl: "https://www.youtube-nocookie.com/embed/placeholder-leadflow-demo",
    ctaText: "Build Similar AI Automation Pipeline",
    challenge:
      "The sales team was losing high-intent enterprise prospects because inbound leads were captured in scattered spreadsheets and manually assigned. Average qualification delay was 4.5 hours, resulting in a 28% drop in scheduled discovery calls.",
    approach:
      "We engineered a multi-tenant SaaS architecture combining instant webhook ingestion, automated LLM lead qualification agents, territory/skill-based routing algorithms, and a real-time Kanban management interface.",
    solution:
      "A production-grade Next.js application backed by PostgreSQL, Prisma ORM, and LangChain automation. Features sub-second webhook processing, bi-directional HubSpot/Salesforce sync, and automated Slack rep alerting with deep audit trails.",
    results: [
      { label: "Manual routing time", value: "−70%" },
      { label: "Lead-to-demo conversion", value: "+42%" },
      { label: "Delivery vs plan", value: "2 weeks early" },
      { label: "Pipeline audit visibility", value: "100%" },
    ],
    techStack: ["Next.js 15", "TypeScript", "PostgreSQL", "Prisma", "LangChain", "Tailwind CSS", "Redis"],
    clientQuoteTestimonialId: "deepak-nair",
    featured: true,
  },
  {
    slug: "propsearch-real-estate",
    title: "PropSearch Real Estate",
    category: "Web",
    year: "2026",
    summary:
      "High-speed residential property marketplace with faceted multi-parameter filters, geo-coordinates, and a high-converting mobile search funnel.",
    tags: ["Faceted Search", "Mobile Core Web Vitals", "SSR Marketplace"],
    imageSrc: "/images/portfolio/realestate_platform.png",
    clientContext: "PropSearch Middle East · Commercial & Residential PropTech [REAL_CLIENT_NAME]",
    projectType: "Client Delivery",
    timeline: "8 weeks milestone delivery",
    ctaText: "Scale Your Marketplace Platform",
    challenge:
      "Prospective property buyers experienced severe abandonment on mobile devices due to slow client-side rendering (over 4.8s LCP) and clunky query resets whenever price or bedroom filters were toggled.",
    approach:
      "We restructured the listing architecture to server-rendered Next.js with optimistic URL-driven filtering, edge-cached property metadata, and responsive interactive floorplan previews.",
    solution:
      "Engineered an SSR property engine with instant URL search parameters, indexed database queries, and a streamlined inquiry capture modal that routes leads directly to regional broker teams.",
    results: [
      { label: "Mobile LCP load speed", value: "1.1s" },
      { label: "Inquiry conversion lift", value: "+35%" },
      { label: "Mobile Core Web Vitals", value: "98/100" },
    ],
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Meilisearch", "Tailwind CSS", "Cloudflare CDN"],
    clientQuoteTestimonialId: "tariq-al-mansoor",
    featured: true,
  },
  {
    slug: "stocksense-analytics",
    title: "StockSense Analytics",
    category: "Software",
    year: "2026",
    summary:
      "High-frequency market intelligence platform engineered for low-latency charting, streaming order flows, and institutional watchlists.",
    tags: ["FinTech Architecture", "WebSocket Streaming", "Canvas Charts"],
    imageSrc: "/images/services/saas_dev.png",
    clientContext: "LIMINIQ Labs R&D · Institutional Trading Concept [INTERNAL_PRODUCT_ARCHITECTURE]",
    projectType: "Internal R&D / Concept",
    timeline: "4 weeks internal sprint",
    ctaText: "Discuss Custom FinTech Architecture",
    challenge:
      "Active traders demand real-time ticker feeds and complex multi-overlay technical charts without DOM thrashing, browser memory leaks, or lag during volatile market opening hours.",
    approach:
      "We engineered an internal FinTech reference architecture utilizing hardware-accelerated Canvas charting, WebSocket connection pooling, and sub-millisecond local state caching.",
    solution:
      "A dark-first trading workstation featuring lightweight TradingView charts, custom watchlist grouping, and streaming mock market data feeds demonstrating institutional UI capability.",
    results: [
      { label: "Chart render latency", value: "48ms" },
      { label: "Smooth scroll rate", value: "60 FPS" },
      { label: "Canvas acceleration", value: "100%" },
    ],
    techStack: ["Next.js", "TypeScript", "TradingView Canvas", "WebSockets", "Zustand", "Tailwind CSS"],
    featured: true,
  },
  {
    slug: "scholaredge",
    title: "ScholarEdge Platform",
    category: "Web",
    year: "2026",
    summary:
      "Modular education portal with interactive syllabus roadmaps, video preview previews, and an optimized one-click checkout.",
    tags: ["EdTech", "Stripe Checkout", "Programmatic SEO", "Video Delivery"],
    imageSrc: "/images/portfolio/edtech_marketing.png",
    clientContext: "LearnSphere EdTech · Professional Certification Academy [REAL_CLIENT_NAME]",
    projectType: "Client Delivery",
    timeline: "6 weeks milestone build",
    ctaText: "Launch Your EdTech Platform",
    challenge:
      "Student registration drop-off was hovering around 65% because course syllabus details were hidden behind tedious registration gates, and course preview videos were slow to buffer.",
    approach:
      "We conducted a conversion funnel overhaul: introduced instant video preview modals, structured course roadmap accordions, and a frictionless 2-step checkout flow with localized currencies.",
    solution:
      "Delivered a Next.js educational portal integrated with Mux Video streaming, Stripe recurring subscriptions, and programmatic course landing pages optimized for search engines.",
    results: [
      { label: "Checkout completion", value: "+48%" },
      { label: "Landing page bounce", value: "−55%" },
      { label: "Organic impressions", value: "2.1x" },
    ],
    techStack: ["Next.js", "TypeScript", "Stripe API", "Mux Video", "Tailwind CSS", "Vercel"],
    clientQuoteTestimonialId: "arjun-kapoor",
    featured: true,
  },
  {
    slug: "taskmanager-pro",
    title: "TaskManager Pro",
    category: "Software",
    year: "2026",
    summary:
      "Accessible, keyboard-first agile task orchestration system with drag-and-drop Kanban states and optimistic UI synchronization.",
    tags: ["Internal Tooling", "Kanban UI", "Optimistic Mutations"],
    imageSrc: "/images/portfolio/legal_brand_website.png",
    clientContext: "LIMINIQ Engineering Accelerator · Internal Workflow Architecture",
    projectType: "Internal R&D / Concept",
    timeline: "4 weeks rapid build",
    ctaText: "Engineer Custom Internal Tooling",
    challenge:
      "Software delivery pods were burdened by over-engineered enterprise project management tools that imposed steep learning curves and heavy network payloads on daily standups.",
    approach:
      "We developed a lightweight, keyboard-accessible task management engine designed specifically for fast milestone planning, sprint backlog grooming, and instant status updates.",
    solution:
      "Shipped a responsive Next.js application featuring HTML5 drag-and-drop with zero-latency optimistic updates, keyboard navigation shortcuts, and clean role-based project workspaces.",
    results: [
      { label: "Interaction lag", value: "0ms" },
      { label: "Accessibility score", value: "100/100" },
      { label: "Sprint delivery", value: "4 weeks" },
    ],
    techStack: ["Next.js", "TypeScript", "React DnD", "Zustand", "Prisma", "Tailwind CSS"],
    featured: true,
  },
  {
    slug: "burgerverse",
    title: "BurgerVerse Dining",
    category: "Web",
    year: "2026",
    summary:
      "Mobile-optimized digital menu and table-ordering engine eliminating third-party delivery marketplace commissions.",
    tags: ["Direct Commerce", "Mobile-First", "WhatsApp Ordering"],
    imageSrc: "/images/portfolio/social_commerce_food.png",
    clientContext: "BurgerVerse Hospitality Group · Multi-Location Dining [REAL_CLIENT_NAME]",
    projectType: "Client Delivery",
    timeline: "3 weeks launch sprint",
    ctaText: "Launch Direct-to-Consumer Platform",
    challenge:
      "The client was losing 25–30% in platform fees to third-party delivery aggregators and had no direct digital channel for dine-in menu browsing or re-order loyalty.",
    approach:
      "We engineered a lightning-fast mobile digital menu with instant search, ingredient allergen filters, and a direct checkout integration pushing orders to WhatsApp and kitchen POS.",
    solution:
      "A lightweight mobile web app that loads under 0.7 seconds, displays mouthwatering high-res food assets via Cloudinary CDN, and captures customer loyalty data seamlessly.",
    results: [
      { label: "Direct table orders", value: "+62%" },
      { label: "Mobile menu load", value: "0.7s" },
      { label: "Commission savings", value: "−40%" },
    ],
    techStack: ["Next.js", "Tailwind CSS", "Cloudinary CDN", "WhatsApp Business API", "Vercel"],
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
