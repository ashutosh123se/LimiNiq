import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { StatsStrip } from "@/components/sections/home/StatsStrip";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { PortfolioSection } from "@/components/sections/home/PortfolioSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { PricingSection } from "@/components/sections/home/PricingSection";
import { BlogPreviewSection } from "@/components/sections/home/BlogPreviewSection";
import { AboutTeaser } from "@/components/sections/home/AboutTeaser";
import { LeadCTASection } from "@/components/sections/home/LeadCTASection";
import { AuditTool } from "@/components/sections/home/AuditTool";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { HOME_SEO } from "@/lib/seo/homeMetadata";

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
    </>
  );
}
