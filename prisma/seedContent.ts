import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PORTFOLIO_ITEMS = [
  {
    title: "E-Commerce Overhaul for FashionNova India",
    client: "FashionNova India",
    category: "Web Dev",
    metrics: [{ label: "Traffic", value: "+420%" }, { label: "LCP", value: "2.8s → 0.4s" }, { label: "Revenue", value: "3.2x" }],
    tags: ["Shopify", "Next.js", "Performance"],
    coverImage: null,
    description: "A complete overhaul of the e-commerce platform focusing on speed and conversions.",
    featured: true
  },
  {
    title: "SEO Domination for HealthFirst Clinics",
    client: "HealthFirst Clinics",
    category: "SEO",
    metrics: [{ label: "Organic", value: "+680%" }, { label: "KWs", value: "Rank #1 for 45" }, { label: "ROI", value: "4.1x" }],
    tags: ["Local SEO", "Technical", "Content"],
    coverImage: null,
    description: "Local SEO strategy that dominated the regional search results.",
    featured: true
  },
  {
    title: "Performance Marketing for EdTech Startup",
    client: "LearnSphere",
    category: "Digital Marketing",
    metrics: [{ label: "ROAS", value: "4.2x" }, { label: "CPA", value: "-62%" }, { label: "Leads", value: "38K/mo" }],
    tags: ["Meta Ads", "Google Ads", "Email"],
    coverImage: null,
    description: "Aggressive performance marketing to scale user acquisition.",
    featured: true
  }
];

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
  { title: "The Future of Headless Commerce in 2024", slug: "headless-commerce-2024", excerpt: "Why moving away from monolithic platforms is essential for scaling e-commerce brands.", content: "Full content here...", category: "Web Dev", coverImage: null, author: "Admin", published: true },
  { title: "Technical SEO Checklist for Migrations", slug: "technical-seo-migration", excerpt: "Don't lose your traffic during a redesign. Here is our 40-point checklist.", content: "Full content here...", category: "SEO", coverImage: null, author: "Admin", published: true },
  { title: "Maximizing Meta Ads ROAS with AI Creatives", slug: "meta-ads-ai-creatives", excerpt: "How we leveraged AI to reduce CPA by 40% for a D2C fashion brand.", content: "Full content here...", category: "Digital Marketing", coverImage: null, author: "Admin", published: true }
];

async function main() {
  console.log("Seeding Database...");

  for (const item of PORTFOLIO_ITEMS) {
    const exists = await prisma.portfolioItem.findFirst({ where: { title: item.title } });
    if (!exists) await prisma.portfolioItem.create({ data: item });
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
