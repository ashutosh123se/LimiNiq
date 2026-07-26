import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustTicker } from "@/components/sections/TrustTicker";
import { DisciplinesList } from "@/components/sections/DisciplinesList";
import { CaseStudyGrid } from "@/components/sections/CaseStudyGrid";
import { ProcessPipeline } from "@/components/sections/ProcessPipeline";
import { AuditTool } from "@/components/sections/AuditTool";
import { StoryPeople } from "@/components/sections/StoryPeople";
import { ProofCredentials } from "@/components/sections/ProofCredentials";
import { PricingCards } from "@/components/sections/PricingCards";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { HomeFAQ } from "@/components/sections/HomeFAQ";
import { TestimonialMarquee } from "@/components/sections/TestimonialMarquee";
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
      <DisciplinesList />
      <CaseStudyGrid />
      <ProcessPipeline />
      <div className="section-band">
        <AuditTool />
      </div>
      <StoryPeople />
      <ProofCredentials />
      <div className="section-band">
        <TestimonialMarquee />
      </div>
      <PricingCards />
      <BlogTeaser />
      <HomeFAQ />
      <FinalCTA />
    </>
  );
}
