import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { StatsStrip } from "@/components/sections/home/StatsStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { HOME_SEO } from "@/lib/seo/homeMetadata";
import { HomeCrawlableIntro } from "@/components/seo/HomeCrawlableIntro";
import { websiteJsonLd } from "@/lib/seo/schema";

const ServicesSection = dynamic(() =>
  import("@/components/sections/home/ServicesSection").then((m) => m.ServicesSection)
);
const ProcessSection = dynamic(() =>
  import("@/components/sections/home/ProcessSection").then((m) => m.ProcessSection)
);
const AuditTool = dynamic(() =>
  import("@/components/sections/home/AuditTool").then((m) => m.AuditTool)
);
const PortfolioSection = dynamic(() =>
  import("@/components/sections/home/PortfolioSection").then((m) => m.PortfolioSection)
);
const TestimonialsSection = dynamic(() =>
  import("@/components/sections/home/TestimonialsSection").then((m) => m.TestimonialsSection)
);
const PricingSection = dynamic(() =>
  import("@/components/sections/home/PricingSection").then((m) => m.PricingSection)
);
const BlogPreviewSection = dynamic(() =>
  import("@/components/sections/home/BlogPreviewSection").then((m) => m.BlogPreviewSection)
);
const AboutTeaser = dynamic(() =>
  import("@/components/sections/home/AboutTeaser").then((m) => m.AboutTeaser)
);
const LeadCTASection = dynamic(() =>
  import("@/components/sections/home/LeadCTASection").then((m) => m.LeadCTASection)
);

export const metadata: Metadata = buildPageMetadata({
  title: HOME_SEO.title,
  description: HOME_SEO.description,
  path: "/",
  absoluteTitle: true,
  keywords: [
    "custom software development company India",
    "enterprise software development company",
    "SaaS development company India",
    "SEO agency India",
    "digital marketing agency India",
    "software development agency",
    "ERP CRM development India",
  ],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <HeroSection />
      <StatsStrip />
      <ServicesSection />
      <ProcessSection />
      <AuditTool />
      <PortfolioSection />
      <TestimonialsSection />
      <PricingSection compact />
      <BlogPreviewSection />
      <AboutTeaser />
      <LeadCTASection />
      <HomeCrawlableIntro />
    </>
  );
}
