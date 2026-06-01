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
import { TeamSection } from "@/components/sections/home/TeamSection";
import { LeadCTASection } from "@/components/sections/home/LeadCTASection";
import { AuditTool } from "@/components/sections/home/AuditTool";

export const metadata: Metadata = {
  title: "LIMINIQ — Website Development, SEO & Digital Marketing Agency",
  description:
    "LIMINIQ engineers high-performance websites, drives organic growth through precision SEO, and executes data-backed digital marketing strategies for ambitious brands. 150+ projects. 4.9/5 rating.",
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
      <TeamSection />
      <LeadCTASection />
    </>
  );
}
