import type { FAQItem } from "@/components/sections/services/FAQAccordion";
import type { CaseStudyData } from "@/components/sections/services/CaseStudyCard";
import type { InternalLinkItem } from "@/components/sections/services/InternalLinkCallout";

export interface ServiceExtension {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  serviceType: string;
  tier: 1 | 2;
  tierOrder: number;
  expandedIntro?: string;
  caseStudies?: CaseStudyData[];
  techStack?: string[];
  industries?: string[];
  faqs?: FAQItem[];
  internalLinks?: InternalLinkItem[];
  seoForSaasNote?: string;
}

export const TIER_1_SLUGS = [
  "custom-software-saas",
  "digital-marketing",
  "seo-search-engine-marketing",
] as const;

export const SERVICE_EXTENSIONS: Record<string, ServiceExtension> = {
  "custom-software-saas": {
    metaTitle: "Custom Software & SaaS Development Company in India",
    metaDescription:
      "LIMINIQ builds custom enterprise software, multi-tenant SaaS platforms, and legacy system modernizations. Secure, scalable architecture for growing businesses. 150+ projects delivered.",
    metaKeywords: [
      "custom software development company India",
      "SaaS development company India",
      "enterprise software development",
      "multi-tenant SaaS architecture",
      "legacy system modernization",
      "custom ERP CRM development India",
    ],
    serviceType: "Custom Software Development",
    tier: 1,
    tierOrder: 1,
    expandedIntro: `Growing businesses outgrow spreadsheets, disconnected tools, and brittle legacy systems faster than they expect. Whether you need to replace a patchwork of Excel workflows, build a multi-department internal portal, modernize a legacy ERP without downtime, or take a SaaS MVP from prototype to production-grade architecture — the engineering decisions you make early determine whether the product scales or stalls.

LIMINIQ is a custom software development company in India that architects solutions for real operational complexity: multi-tenant SaaS platforms, secure API layers, role-based access across departments, and cloud-native deployments built to handle growth. We don't treat software as a one-off deliverable — we engineer products with clean domain modeling, observability, and CI/CD pipelines so your team can iterate after launch.

From replacing spreadsheet-based workflows for finance and ops teams to building customer-facing B2B portals and custom CRM/ERP modules, our team combines product thinking with enterprise-grade engineering. If you're evaluating a SaaS development partner or need a legacy modernization path that minimizes business disruption, we scope honestly, ship iteratively, and design for the scale you're heading toward — not just today's user count.`,
    caseStudies: [
      {
        name: "Rohan Mehta",
        company: "TechScale SaaS",
        role: "CEO",
        quote:
          "LIMINIQ rebuilt our platform and organic traffic shot up 420% in 4 months. The team is insanely talented — they think like product builders, not just developers.",
        highlight: "Platform rebuild + growth",
      },
      {
        name: "Deepak Nair",
        company: "CloudStack IT",
        role: "CTO",
        quote:
          "LIMINIQ built our entire B2B web app from scratch — clean architecture, flawless UI, and delivered 2 weeks early. Rare to find this level of craft.",
        highlight: "B2B web application",
      },
    ],
    techStack: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "React / Next.js",
      "AWS / GCP",
      "Docker",
      "Kubernetes",
      "GraphQL / REST",
      "Prisma ORM",
    ],
    industries: [
      "Healthcare & Clinics",
      "Fintech & Lending",
      "SaaS & B2B Platforms",
      "Logistics & Operations",
      "EdTech",
      "Real Estate & PropTech",
    ],
    faqs: [
      {
        question: "How long does custom enterprise software take to build?",
        answer:
          "Timelines depend on scope, but a focused MVP typically takes 8–14 weeks, while full enterprise modules or multi-tenant SaaS platforms often run 4–8 months. We break work into phased releases so you can validate early and avoid big-bang launches.",
      },
      {
        question: "What's the cost of building a SaaS MVP in India?",
        answer:
          "SaaS MVP projects typically start from ₹8–15 lakhs for a well-scoped product with authentication, core workflows, admin panel, and cloud deployment. Complex multi-tenant architecture, integrations, or compliance requirements increase scope — we provide fixed-scope quotes after discovery.",
      },
      {
        question: "Do you build multi-tenant SaaS architecture from scratch?",
        answer:
          "Yes. We design tenant isolation, subscription billing hooks, role-based permissions, and scalable data models from day one — whether you're launching a new SaaS or refactoring a single-tenant prototype into a production multi-tenant platform.",
      },
      {
        question: "Can you modernize our legacy system without downtime?",
        answer:
          "We use phased migration strategies: parallel runs, strangler-fig patterns, and feature flags to migrate modules incrementally. Critical business operations keep running while we replace backend services, databases, or UI layers behind the scenes.",
      },
      {
        question: "What's included in your enterprise software development process?",
        answer:
          "Discovery and requirements mapping, system architecture, UI/UX where needed, agile development sprints, QA across environments, security review, cloud deployment, documentation, and post-launch support. You get transparent weekly progress and a codebase your team can maintain.",
      },
    ],
    internalLinks: [
      {
        href: "/services/digital-marketing",
        title: "Digital Marketing & Lead Generation",
        description:
          "Need to market your software after launch? See our growth services for paid acquisition and funnel optimization.",
      },
      {
        href: "/services/seo-search-engine-marketing",
        title: "SEO & Search Engine Marketing",
        description:
          "Drive qualified organic traffic to your product with technical SEO, content strategy, and authority building.",
      },
    ],
  },
  "seo-search-engine-marketing": {
    metaTitle: "SEO Agency in India | Search Engine Marketing Services",
    metaDescription:
      "LIMINIQ delivers technical SEO, content strategy, and authority link building that drives ranked, qualified organic traffic — for businesses and software/SaaS companies alike. 150+ projects delivered.",
    metaKeywords: [
      "SEO agency India",
      "search engine marketing services India",
      "SEO for SaaS companies",
      "technical SEO audit",
      "local SEO India",
      "link building agency India",
    ],
    serviceType: "SEO Services",
    tier: 1,
    tierOrder: 3,
    expandedIntro: `Organic search is still the highest-intent acquisition channel for most businesses — but ranking requires more than blog posts and meta tags. As an SEO agency in India, LIMINIQ combines technical audits, entity-driven content strategy, and authoritative link building to earn rankings that convert, not just traffic that bounces.

We work with local service businesses, e-commerce brands, and software/SaaS companies that need sustainable visibility. SaaS SEO is a distinct discipline: product-led sites need programmatic pages, documentation indexing, comparison content, and technical foundations that support complex site architectures. Most SEO agencies don't understand software clients; most software agencies don't do SEO — we operate at that intersection.

Our search engine marketing approach starts with diagnosing what's blocking crawlability, indexation, and rankings — then building a keyword map aligned to buyer intent, fixing technical debt, and earning links from relevant domains. Whether you need local SEO across multiple cities or a national content engine for a B2B SaaS product, we report on rankings, traffic, and conversions — not vanity metrics.`,
    caseStudies: [
      {
        name: "Priya Sharma",
        company: "HealthFirst Clinics",
        role: "Marketing Director",
        quote:
          "We rank #1 for 45 high-intent keywords now. Our patient inquiries doubled in 6 months. LIMINIQ's SEO team is exceptional — data-driven and results-obsessed.",
        highlight: "Local + technical SEO",
      },
      {
        name: "Vikram Singh",
        company: "LegalEdge LLP",
        role: "Managing Partner",
        quote:
          "Our firm now dominates local search in 3 cities. Revenue from organic search grew 220% year-over-year. Best investment we've made in marketing.",
        highlight: "Multi-city local SEO",
      },
      {
        name: "Meera Pillai",
        company: "Organic Root",
        role: "Founder",
        quote:
          "We were invisible on Google. 6 months with LIMINIQ and we're ranking for 200+ keywords. Organic orders now make up 65% of our revenue.",
        highlight: "E-commerce organic growth",
      },
    ],
    faqs: [
      {
        question: "How long does SEO take to show results in India?",
        answer:
          "Most clients see measurable ranking movement in 8–12 weeks, with significant traffic gains in 4–6 months. Competitive niches and new domains take longer; sites with existing authority often see faster wins from technical fixes and content optimization.",
      },
      {
        question: "Do you offer SEO specifically for SaaS and software companies?",
        answer:
          "Yes — this is a core differentiator. We optimize product pages, docs, comparison content, and programmatic SEO structures that SaaS sites need. We understand trial signup funnels, not just contact forms, and align keyword strategy to software buyer journeys.",
      },
      {
        question: "What's included in a technical SEO audit?",
        answer:
          "Crawl analysis, indexation review, Core Web Vitals assessment, schema markup gaps, internal linking structure, redirect chains, mobile usability, sitemap/robots review, and a prioritized fix roadmap with impact estimates.",
      },
      {
        question: "How much does SEO cost for a small business in India?",
        answer:
          "Ongoing SEO retainers typically start from ₹25,000–₹40,000/month for local businesses, scaling with content volume, link building scope, and market competitiveness. We offer transparent monthly reporting and no long-term lock-ins.",
      },
      {
        question: "Do you handle Google Ads alongside organic SEO?",
        answer:
          "Yes. Our search engine marketing services include paid search where it complements organic strategy — especially for new domains or high-intent keywords while SEO matures. We coordinate messaging across both channels.",
      },
    ],
    internalLinks: [
      {
        href: "/services/custom-software-saas",
        title: "Custom Software & SaaS Development",
        description:
          "Building a product that needs to rank? Pair SEO with software engineered for performance and crawlability from day one.",
      },
    ],
    seoForSaasNote:
      "We also specialize in SEO for SaaS & software companies — a growing practice area bridging product architecture and search strategy. Ask us about dedicated SaaS SEO engagements.",
  },
  "digital-marketing": {
    metaTitle: "Digital Marketing Agency in India | Lead Generation Services",
    metaDescription:
      "LIMINIQ runs precision-targeted Google Ads, Meta Ads, and LinkedIn campaigns that lower acquisition costs and scale revenue. Data-backed creative, CRO, and attribution for ambitious brands. 150+ projects delivered.",
    metaKeywords: [
      "digital marketing agency India",
      "lead generation agency India",
      "Google Ads agency India",
      "Meta Ads management India",
      "PPC advertising services",
      "conversion rate optimization India",
    ],
    serviceType: "Digital Marketing Services",
    tier: 1,
    tierOrder: 2,
    expandedIntro: `Paid acquisition only works when strategy, creative, landing pages, and attribution align. As a digital marketing agency in India, LIMINIQ builds performance campaigns that optimize for cost per acquisition and lifetime value — not clicks for their own sake.

We manage Google Ads (Search, Display, Shopping), Meta Ads (Facebook & Instagram), and LinkedIn B2B lead gen for brands scaling lead volume or e-commerce revenue. Every campaign starts with persona research, offer positioning, and funnel analysis — then we launch structured tests, kill underperformers fast, and scale winners with disciplined budget allocation.

Whether you're a fintech brand needing qualified loan applications, a D2C food brand launching Instagram commerce, or a B2B SaaS company filling demo pipelines, our team handles creative development, landing page CRO, email automation sequences, and advanced analytics so you know exactly which channels drive revenue.`,
    caseStudies: [
      {
        name: "Rahul Gupta",
        company: "QuickFin Loans",
        role: "VP Marketing",
        quote:
          "Our cost per acquisition dropped 58% while lead volume grew 3x. The LIMINIQ team's command of Google Ads is genuinely world-class.",
        highlight: "Google Ads + lead gen",
      },
      {
        name: "Anika Joshi",
        company: "CraftBite Foods",
        role: "Brand Head",
        quote:
          "They launched our Instagram commerce strategy and we hit ₹1Cr in online sales in month 3. The team feels like an extension of our internal team.",
        highlight: "Social commerce launch",
      },
    ],
    faqs: [
      {
        question: "What's the minimum ad budget to work with LIMINIQ?",
        answer:
          "We recommend a minimum ad spend of ₹50,000–₹75,000/month alongside our management fee so we have enough data to optimize meaningfully. Smaller budgets work for hyper-local campaigns with narrow targeting.",
      },
      {
        question: "Which platforms do you manage?",
        answer:
          "Google Ads (Search, Display, Shopping, Performance Max), Meta Ads (Facebook & Instagram), LinkedIn Ads for B2B, and email automation via platforms like Mailchimp, Klaviyo, or custom integrations.",
      },
      {
        question: "How quickly can we expect results from paid campaigns?",
        answer:
          "Initial performance data appears within 1–2 weeks. Meaningful CPA optimization typically takes 4–8 weeks of testing creative, audiences, and landing pages. We provide weekly performance reports from day one.",
      },
      {
        question: "Do you create ad creative and landing pages?",
        answer:
          "Yes. We develop ad copy, static and video creative briefs, and high-converting landing pages. CRO is built into our process — we A/B test headlines, forms, and offers to improve conversion rates continuously.",
      },
      {
        question: "How do you measure campaign ROI?",
        answer:
          "We track cost per acquisition, ROAS, lead quality, and downstream conversions using GA4, platform pixels, and UTM attribution. Monthly reports tie spend directly to leads, sales, or revenue where tracking allows.",
      },
    ],
    internalLinks: [
      {
        href: "/services/seo-search-engine-marketing",
        title: "SEO & Search Engine Marketing",
        description:
          "Reduce reliance on paid spend over time with organic search strategies that compound.",
      },
      {
        href: "/services/custom-software-saas",
        title: "Custom Software & SaaS Development",
        description:
          "Need a product built to convert? Pair marketing with software engineered for performance.",
      },
    ],
  },
  "website-ecommerce": {
    metaTitle: "Website & E-commerce Development Services",
    metaDescription:
      "High-performance Next.js websites and e-commerce platforms built for speed, conversions, and scale. Custom development — no slow templates. 150+ projects delivered by LIMINIQ.",
    metaKeywords: [
      "website development company India",
      "ecommerce development India",
      "Next.js development agency",
      "headless commerce development",
      "Shopify custom development India",
      "high performance website development",
    ],
    serviceType: "Website Development",
    tier: 2,
    tierOrder: 4,
  },
  "mobile-app-development": {
    metaTitle: "Mobile App Development Company in India",
    metaDescription:
      "Native and cross-platform mobile apps for iOS and Android. React Native and Flutter development with scalable backend architecture. 150+ projects delivered by LIMINIQ.",
    metaKeywords: [
      "mobile app development company India",
      "React Native development India",
      "Flutter app development",
      "iOS Android app development",
      "cross platform mobile apps",
      "app development agency India",
    ],
    serviceType: "Mobile Application Development",
    tier: 2,
    tierOrder: 5,
  },
  "ui-ux-design-branding": {
    metaTitle: "UI/UX Design & Branding Services",
    metaDescription:
      "User-centric UI/UX design, wireframing, prototyping, and brand identity systems that drive conversions and build trust. 150+ projects delivered by LIMINIQ.",
    metaKeywords: [
      "UI UX design agency India",
      "brand identity design India",
      "product design services",
      "wireframing prototyping agency",
      "design system creation",
      "UX research India",
    ],
    serviceType: "UI/UX Design",
    tier: 2,
    tierOrder: 6,
  },
  "graphic-design-creative": {
    metaTitle: "Graphic Design & Creative Services",
    metaDescription:
      "Marketing collateral, social media graphics, pitch decks, and ad creative aligned with your brand identity. Professional creative services from LIMINIQ.",
    metaKeywords: [
      "graphic design agency India",
      "marketing collateral design",
      "social media graphic design",
      "pitch deck design services",
      "ad creative design India",
      "brand creative services",
    ],
    serviceType: "Graphic Design",
    tier: 2,
    tierOrder: 7,
  },
  "content-creation": {
    metaTitle: "Content Creation & Copywriting Services",
    metaDescription:
      "SEO-optimized blogs, website copy, whitepapers, and social content that engages audiences and establishes authority. Content services from LIMINIQ.",
    metaKeywords: [
      "content writing services India",
      "SEO blog writing agency",
      "website copywriting services",
      "B2B content marketing India",
      "copywriting agency India",
      "content strategy services",
    ],
    serviceType: "Content Creation",
    tier: 2,
    tierOrder: 8,
  },
  "ai-automation-cloud": {
    metaTitle: "AI, Automation & Cloud Solutions",
    metaDescription:
      "Custom AI chatbots, workflow automation, machine learning integration, and cloud migration on AWS, GCP, and Azure. Future-proof your operations with LIMINIQ.",
    metaKeywords: [
      "AI development company India",
      "workflow automation services",
      "cloud migration AWS GCP Azure",
      "custom AI chatbot development",
      "machine learning integration India",
      "serverless architecture development",
    ],
    serviceType: "AI & Cloud Solutions",
    tier: 2,
    tierOrder: 9,
  },
};

export function getServiceExtension(slug: string): ServiceExtension | undefined {
  return SERVICE_EXTENSIONS[slug];
}

export function getTier1Services() {
  return Object.entries(SERVICE_EXTENSIONS)
    .filter(([, ext]) => ext.tier === 1)
    .sort(([, a], [, b]) => a.tierOrder - b.tierOrder);
}

export function getTier2Services() {
  return Object.entries(SERVICE_EXTENSIONS)
    .filter(([, ext]) => ext.tier === 2)
    .sort(([, a], [, b]) => a.tierOrder - b.tierOrder);
}
