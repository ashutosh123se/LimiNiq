import { PrismaClient, PlanType } from '@prisma/client';

const prisma = new PrismaClient();

const PLANS = [
  // WEB DEVELOPMENT
  {
    type: PlanType.WEB_DEV,
    name: "STARTER",
    price: "₹24,999",
    priceSuffix: "one-time payment",
    tagline: "Perfect for small businesses",
    features: [
      { text: "Up to 5 custom pages", included: true },
      { text: "Mobile responsive design", included: true },
      { text: "Contact & Lead forms", included: true },
      { text: "On-page SEO setup", included: true },
      { text: "Google Analytics setup", included: true },
      { text: "Custom animations", included: false },
      { text: "CMS Integration", included: false },
    ],
    ctaText: "Get Started",
    badge: null,
    delivery: "7-day delivery",
    elevated: false,
    sortOrder: 2,
  },
  {
    type: PlanType.WEB_DEV,
    name: "GROWTH",
    price: "₹59,999",
    priceSuffix: "one-time payment",
    tagline: "For growing businesses",
    features: [
      { text: "Up to 15 custom pages", included: true },
      { text: "Premium UI/UX design", included: true },
      { text: "CRM integration", included: true },
      { text: "Advanced SEO & Tracking", included: true },
      { text: "Custom micro-animations", included: true },
      { text: "Blog / CMS system", included: true },
      { text: "Custom API Integrations", included: false },
    ],
    ctaText: "Start Project",
    badge: "Most Popular",
    delivery: "15-day delivery",
    elevated: true,
    sortOrder: 3,
  },
  {
    type: PlanType.WEB_DEV,
    name: "ENTERPRISE",
    price: "Custom Quote",
    priceSuffix: "tailored scope",
    tagline: "Complex web applications",
    features: [
      { text: "Unlimited pages", included: true },
      { text: "World-class UI/UX design", included: true },
      { text: "Full custom web app development", included: true },
      { text: "E-commerce & Payments", included: true },
      { text: "Third-party API integrations", included: true },
      { text: "Admin dashboards", included: true },
      { text: "Dedicated DevOps", included: true },
    ],
    ctaText: "Let's Talk",
    badge: null,
    delivery: "Custom timeline",
    elevated: false,
    sortOrder: 4,
  },

  // SEO & MARKETING
  {
    type: PlanType.SEO_MARKETING,
    name: "STARTER",
    price: "₹14,999",
    priceSuffix: "per month",
    tagline: "Build a strong foundation",
    features: [
      { text: "Full technical SEO audit", included: true },
      { text: "On-page SEO (up to 10 pages)", included: true },
      { text: "Keyword research & strategy", included: true },
      { text: "Authority link building (5/mo)", included: true },
      { text: "Social media management", included: false },
      { text: "PPC Management", included: false },
    ],
    ctaText: "Get Started",
    badge: null,
    delivery: null,
    elevated: false,
    sortOrder: 2,
  },
  {
    type: PlanType.SEO_MARKETING,
    name: "GROWTH",
    price: "₹34,999",
    priceSuffix: "per month",
    tagline: "Aggressive organic growth",
    features: [
      { text: "On-page SEO (unlimited pages)", included: true },
      { text: "Authority link building (15/mo)", included: true },
      { text: "Social media (2 platforms)", included: true },
      { text: "Content writing (2 blogs/mo)", included: true },
      { text: "Google OR Meta Ads", included: true },
      { text: "Competitor analysis", included: true },
      { text: "Full PPC (Google + Meta)", included: false },
    ],
    ctaText: "Start Growing",
    badge: "Most Popular",
    delivery: null,
    elevated: true,
    sortOrder: 3,
  },
  {
    type: PlanType.SEO_MARKETING,
    name: "ENTERPRISE",
    price: "Custom Quote",
    priceSuffix: "per month",
    tagline: "Full-spectrum digital dominance",
    features: [
      { text: "Everything in Growth", included: true },
      { text: "Full PPC (Google + Meta + LinkedIn)", included: true },
      { text: "Email marketing automation", included: true },
      { text: "Content writing (4 blogs/mo)", included: true },
      { text: "PR & brand mentions", included: true },
      { text: "Conversion rate optimization", included: true },
      { text: "Dedicated account manager", included: true },
    ],
    ctaText: "Let's Talk",
    badge: null,
    delivery: null,
    elevated: false,
    sortOrder: 4,
  },
];

async function main() {
  console.log('Seeding PricingPlans...');
  
  // Clear existing
  await prisma.pricingPlan.deleteMany({});
  
  for (const plan of PLANS) {
    await prisma.pricingPlan.create({
      data: plan
    });
  }
  
  console.log('Pricing plans seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
