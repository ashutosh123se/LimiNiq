import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustTicker } from "@/components/sections/TrustTicker";
import { DisciplinesList } from "@/components/sections/DisciplinesList";
import { ProcessPipeline } from "@/components/sections/ProcessPipeline";
import { AuditTool } from "@/components/sections/AuditTool";
import { CaseStudyGrid } from "@/components/sections/CaseStudyGrid";
import { TestimonialMarquee } from "@/components/sections/TestimonialMarquee";
import { PricingCards } from "@/components/sections/PricingCards";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { TextMarquee } from "@/components/sections/TextMarquee";
import { TeamPreview } from "@/components/sections/TeamPreview";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { websiteJsonLd } from "@/lib/seo/schema";
import { HOME_SEO } from "@/lib/seo/homeMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
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
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <Hero />
      <TrustTicker />
      <div className="section-band">
        <DisciplinesList />
      </div>
      <ProcessPipeline />
      <div className="section-band">
        <AuditTool />
      </div>
      <CaseStudyGrid />
      <div className="section-band">
        <TestimonialMarquee />
      </div>
      <PricingCards />
      <div className="section-band">
        <BlogTeaser />
      </div>
      <TextMarquee />
      <div className="section-band">
        <TeamPreview />
      </div>
      <FinalCTA />
    </>
  );
}
