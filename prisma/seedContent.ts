import { PrismaClient } from "@prisma/client";
import { PORTFOLIO_PROJECTS } from "../lib/data/portfolioProjects";
import { TESTIMONIALS } from "../lib/data/testimonials";

const prisma = new PrismaClient();

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
    if (exists) {
      await prisma.testimonial.update({
        where: { id: exists.id },
        data: {
          company: item.company,
          role: item.role,
          quote: item.quote,
          rating: item.rating,
          service: item.service,
          active: item.active ?? true,
        },
      });
    } else {
      await prisma.testimonial.create({
        data: {
          name: item.name,
          company: item.company,
          role: item.role,
          quote: item.quote,
          rating: item.rating,
          service: item.service,
          avatar: item.avatar ?? null,
          active: item.active ?? true,
        },
      });
    }
  }

  const activeNames = TESTIMONIALS.map((t) => t.name);
  await prisma.testimonial.updateMany({
    where: { name: { notIn: activeNames } },
    data: { active: false },
  });
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
