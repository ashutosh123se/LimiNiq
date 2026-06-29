import { PrismaClient } from "@prisma/client";
import { PORTFOLIO_PROJECTS } from "../lib/data/portfolioProjects";

const prisma = new PrismaClient();

const TESTIMONIALS = [
  { name: "Rohan Mehta", company: "TechScale SaaS", role: "CEO", quote: "LIMINIQ rebuilt our platform and organic traffic shot up 420% in 4 months. The team is insanely talented — they think like product builders, not just developers.", rating: 5, service: "Web Dev" },
  { name: "Priya Sharma", company: "HealthFirst Clinics", role: "Marketing Director", quote: "We rank #1 for 45 high-intent keywords now. Our patient inquiries doubled in 6 months. LIMINIQ's SEO team is exceptional — data-driven and results-obsessed.", rating: 5, service: "SEO" },
  { name: "Arjun Kapoor", company: "LearnSphere EdTech", role: "Founder", quote: "Our Meta campaigns went from a 1.2x ROAS to 4.8x in just 8 weeks. The level of optimisation and attention to detail is unlike any agency I've worked with.", rating: 5, service: "Digital Marketing" },
  { name: "Sneha Iyer", company: "PropVault Realty", role: "Co-Founder", quote: "Website speed went from 42 to 98 on PageSpeed, and our lead form conversions tripled. LIMINIQ delivered exactly what they promised, on time.", rating: 5, service: "Web Dev" },
  { name: "Vikram Singh", company: "LegalEdge LLP", role: "Managing Partner", quote: "Our firm now dominates local search in 3 cities. Revenue from organic search grew 220% year-over-year. Best investment we've made in marketing.", rating: 5, service: "SEO" },
  { name: "Anika Joshi", company: "CraftBite Foods", role: "Brand Head", quote: "They launched our Instagram commerce strategy and we hit ₹1Cr in online sales in month 3. The team feels like an extension of our internal team.", rating: 5, service: "Digital Marketing" },
  { name: "Deepak Nair", company: "CloudStack IT", role: "CTO", quote: "LIMINIQ built our entire B2B web app from scratch — clean architecture, flawless UI, and delivered 2 weeks early. Rare to find this level of craft.", rating: 5, service: "Web Dev" },
  { name: "Meera Pillai", company: "Organic Root", role: "Founder", quote: "We were invisible on Google. 6 months with LIMINIQ and we're ranking for 200+ keywords. Organic orders now make up 65% of our revenue.", rating: 5, service: "SEO" },
  { name: "Rahul Gupta", company: "QuickFin Loans", role: "VP Marketing", quote: "Our cost per acquisition dropped 58% while lead volume grew 3x. The LIMINIQ team's command of Google Ads is genuinely world-class.", rating: 5, service: "Digital Marketing" },
  { name: "Tanvi Choudhary", company: "StyleHub Fashion", role: "E-Commerce Head", quote: "The new Shopify store LIMINIQ built loads in under 0.8 seconds and our cart abandonment fell 40%. Revenue per visitor is up 2.4x.", rating: 5, service: "Web Dev" },
];

const BLOG_POSTS = [
  { title: "The Future of Headless Commerce in 2024", slug: "headless-commerce-2024", excerpt: "Why moving away from monolithic platforms is essential for scaling e-commerce brands.", content: "Full content here...", category: "Web Dev", coverImage: null, author: "LIMINIQ Team", published: true, postType: "ARTICLE" as const, trending: true, tags: ["commerce", "nextjs"] },
  { title: "Technical SEO Checklist for Migrations", slug: "technical-seo-migration", excerpt: "Don't lose your traffic during a redesign. Here is our 40-point checklist.", content: "Full content here...", category: "SEO", coverImage: null, author: "LIMINIQ Team", published: true, postType: "ARTICLE" as const, trending: false, tags: ["seo", "migration"] },
  { title: "Maximizing Meta Ads ROAS with AI Creatives", slug: "meta-ads-ai-creatives", excerpt: "How we leveraged AI to reduce CPA by 40% for a D2C fashion brand.", content: "Full content here...", category: "Digital Marketing", coverImage: null, author: "LIMINIQ Team", published: true, postType: "ARTICLE" as const, trending: true, tags: ["meta", "ai"] },
  {
    title: "What's your #1 growth priority in 2026?",
    slug: "biggest-growth-priority-2026",
    excerpt: "Cast your vote — see what founders and marketers are prioritising this year.",
    content: "Community poll",
    category: "Insights",
    coverImage: null,
    author: "LIMINIQ Team",
    published: true,
    postType: "POLL" as const,
    trending: true,
    tags: ["poll", "strategy"],
    pollOptions: [
      { id: "opt-1", label: "Custom software / SaaS product", votes: 0 },
      { id: "opt-2", label: "SEO & organic traffic", votes: 0 },
      { id: "opt-3", label: "Paid ads & performance marketing", votes: 0 },
      { id: "opt-4", label: "Website redesign / conversion", votes: 0 },
    ],
  },
];

const TRENDING_TOPICS = [
  { label: "Custom SaaS MVPs", slug: "custom-saas", emoji: "🚀", color: "#7B61FF", description: "Building lean SaaS products", sortOrder: 0 },
  { label: "AI in Marketing", slug: "ai-marketing", emoji: "✨", color: "#00C8A0", description: "AI-driven ROAS strategies", sortOrder: 1 },
  { label: "Technical SEO", slug: "technical-seo", emoji: "📈", color: "#3B5BFF", description: "Crawl, index, rank", sortOrder: 2 },
  { label: "Next.js Performance", slug: "nextjs-perf", emoji: "⚡", color: "#F59E0B", description: "Core Web Vitals wins", sortOrder: 3 },
];

async function main() {
  console.log("Seeding Database...");

  for (const item of PORTFOLIO_PROJECTS) {
    const exists = await prisma.portfolioItem.findFirst({ where: { title: item.title } });
    if (!exists) {
      await prisma.portfolioItem.create({
        data: {
          title: item.title,
          client: item.client,
          category: item.category,
          description: item.description,
          metrics: item.deliverables.map((d) => ({ label: "Deliverable", value: d })),
          tags: item.tags,
          featured: item.featured ?? false,
        },
      });
    }
  }
  console.log(`Seeded portfolio items.`);

  for (const item of TESTIMONIALS) {
    const exists = await prisma.testimonial.findFirst({ where: { name: item.name } });
    if (!exists) await prisma.testimonial.create({ data: item });
  }
  console.log(`Seeded testimonials.`);

  for (const item of BLOG_POSTS) {
    const exists = await prisma.blogPost.findUnique({ where: { slug: item.slug } });
    if (!exists) await prisma.blogPost.create({ data: item });
  }
  console.log(`Seeded blog posts.`);

  for (const item of TRENDING_TOPICS) {
    const exists = await prisma.trendingTopic.findUnique({ where: { slug: item.slug } });
    if (!exists) await prisma.trendingTopic.create({ data: item });
  }
  console.log(`Seeded trending topics.`);

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
