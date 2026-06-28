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

export const metadata: Metadata = {
  title: {
    absolute:
      "LIMINIQ — Custom Software, SaaS & Enterprise Development Company in India",
  },
  description:
    "LIMINIQ builds custom software, SaaS platforms, and enterprise systems for growing businesses — and drives their growth with data-backed SEO and digital marketing. 150+ projects delivered, 4.9/5 rated.",
  keywords: [
    "custom software development company India",
    "enterprise software development company",
    "SaaS development company India",
    "SEO agency India",
    "digital marketing agency India",
    "software development agency",
    "ERP CRM development India",
  ],
  openGraph: {
    title: "LIMINIQ — Custom Software, SaaS & Enterprise Development Company in India",
    description:
      "Next-gen software & SaaS development company — backed by data-driven SEO and marketing. High-performance websites, precision SEO, and data-backed digital marketing.",
  },
  twitter: {
    title: "LIMINIQ — Custom Software, SaaS & Enterprise Development Company in India",
    description:
      "Next-gen software & SaaS development company — backed by data-driven SEO and marketing. High-performance websites, precision SEO, and data-backed digital marketing.",
  },
  alternates: { canonical: "https://liminiq.com" },
};

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
      <PricingSection />
      <BlogPreviewSection />
      <AboutTeaser />
      <LeadCTASection />
    </>
  );
}
