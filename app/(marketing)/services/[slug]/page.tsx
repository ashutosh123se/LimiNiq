import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { LeadCTASection } from "@/components/sections/home/LeadCTASection";
import { ArrowRight, CheckCircle2, TrendingUp, BarChart3, Globe } from "lucide-react";

const SERVICES_DATA = {
  "website-development": {
    title: "Website Development",
    subtitle: "Custom-built, high-performance web applications that convert visitors into customers.",
    icon: <Globe size={48} strokeWidth={1} color="var(--accent-primary)" />,
    description: "We don't just build websites; we engineer digital experiences. Our development process prioritizes speed, security, and scalability, ensuring your platform performs flawlessly under pressure while delivering an intuitive user journey.",
    features: [
      "Custom React / Next.js Applications",
      "Headless CMS Integration",
      "E-commerce Platforms (Shopify, Custom)",
      "Progressive Web Apps (PWAs)",
      "API Development & Integration",
      "Performance Optimization (Core Web Vitals)",
    ],
    process: [
      { title: "Discovery", desc: "Understanding your business goals and technical requirements." },
      { title: "Architecture", desc: "Planning the tech stack, database schema, and system flow." },
      { title: "Development", desc: "Agile sprints with weekly deliverables and transparent progress." },
      { title: "Testing", desc: "Rigorous QA across devices, browsers, and load conditions." },
      { title: "Deployment", desc: "Seamless launch with zero downtime and continuous integration." },
    ],
  },
  "seo": {
    title: "Search Engine Optimization",
    subtitle: "Data-driven SEO strategies that dominate search results and drive qualified traffic.",
    icon: <TrendingUp size={48} strokeWidth={1} color="var(--accent-primary)" />,
    description: "Visibility is everything. We combine technical SEO, content strategy, and authoritative link building to secure top rankings for high-intent keywords. No black-hat tricks, just sustainable, compounding organic growth.",
    features: [
      "Technical SEO Audits & Fixes",
      "Keyword Research & Strategy",
      "On-Page Optimization",
      "Content Strategy & Creation",
      "High-Authority Link Building",
      "Local SEO & Google Business",
    ],
    process: [
      { title: "Audit", desc: "Deep technical analysis to identify blockers and opportunities." },
      { title: "Strategy", desc: "Mapping high-value keywords to search intent." },
      { title: "Optimization", desc: "Fixing technical debt and optimizing existing content." },
      { title: "Authority", desc: "Building high-quality backlinks from relevant domains." },
      { title: "Reporting", desc: "Transparent tracking of rankings, traffic, and conversions." },
    ],
  },
  "digital-marketing": {
    title: "Digital Marketing",
    subtitle: "Precision-targeted campaigns that maximize ROI and scale your revenue.",
    icon: <BarChart3 size={48} strokeWidth={1} color="var(--accent-primary)" />,
    description: "Stop guessing with your ad spend. Our performance marketing strategies leverage advanced targeting, compelling creative, and rigorous A/B testing to lower acquisition costs and maximize lifetime value across all channels.",
    features: [
      "Google Ads (Search, Display, Shopping)",
      "Meta Ads (Facebook, Instagram)",
      "LinkedIn B2B Lead Gen",
      "Conversion Rate Optimization (CRO)",
      "Email Automation & Sequences",
      "Advanced Analytics & Attribution",
    ],
    process: [
      { title: "Analysis", desc: "Auditing past performance and identifying target personas." },
      { title: "Creative", desc: "Developing ad copy, visuals, and high-converting landing pages." },
      { title: "Launch", desc: "Structuring campaigns for optimal budget distribution." },
      { title: "Optimization", desc: "Daily bid management and A/B testing to lower CAC." },
      { title: "Scaling", desc: "Increasing spend profitably once winners are identified." },
    ],
  },
};

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA[slug as keyof typeof SERVICES_DATA];

  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} Services | LIMINIQ`,
    description: service.subtitle,
    alternates: { canonical: `https://liminiq.com/services/${slug}` },
  };
}

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug as keyof typeof SERVICES_DATA];

  if (!service) notFound();

  return (
    <div style={{ paddingTop: "5rem", background: "var(--bg-primary)" }}>
      {/* Split Hero */}
      <section className="section-padding section-container" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", alignItems: "center", width: "100%" }} className="service-hero-grid">
          
          {/* Left: Typography */}
          <div>
            <div className="pill-badge" style={{ marginBottom: "1.5rem" }}>
              <span style={{ color: "var(--accent-primary)" }}>✦</span> Service Overview
            </div>
            <h1 className="text-hero" style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", marginBottom: "1.5rem", lineHeight: 1.1 }}>
              {service.title}
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 540, marginBottom: "2.5rem" }}>
              {service.subtitle}
            </p>
            <Link href="#overview" className="btn-secondary" style={{ borderRadius: 30 }}>
              Explore Details
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right: Bento Graphic */}
          <div className="glass-card" style={{ padding: "3rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, borderRadius: 24 }}>
            <div style={{ width: 96, height: 96, borderRadius: 24, background: "rgba(109, 40, 217, 0.05)", border: "1px solid rgba(109, 40, 217, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2rem" }}>
              {service.icon}
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>Enterprise-Grade</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Implementation</div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Main Content */}
      <section id="overview" className="section-padding section-container" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ display: "grid", gap: "6rem", gridTemplateColumns: "1fr", maxWidth: 1000, margin: "0 auto" }}>
          
          {/* Overview */}
          <div className="glass-card" style={{ padding: "3rem", borderRadius: 24 }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.5rem" }}>
              The Challenge & Solution
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
              {service.description}
            </p>
          </div>

          {/* Features Bento Grid */}
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "2rem", textAlign: "center" }}>
              Capabilities
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {service.features.map((feature, i) => (
                <div key={i} className="glass-card group" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem", borderRadius: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(109, 40, 217, 0.08)", border: "1px solid rgba(109, 40, 217, 0.2)", color: "var(--accent-primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <CheckCircle2 size={18} strokeWidth={2} />
                  </div>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4 }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Process Timeline */}
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "3rem", textAlign: "center" }}>
              Execution Strategy
            </h2>
            <div style={{ position: "relative", paddingLeft: "1.5rem" }}>
              {/* Vertical connecting line */}
              <div style={{ position: "absolute", top: 0, bottom: 0, left: "2.25rem", width: 2, background: "var(--border-subtle)", zIndex: 0 }} />
              
              <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                {service.process.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", color: "var(--accent-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "1.1rem", fontWeight: 600, flexShrink: 0 }}>
                      0{i + 1}
                    </div>
                    <div className="glass-card" style={{ padding: "2rem", flex: 1, borderRadius: 16 }}>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                        {step.title}
                      </h3>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <div style={{ padding: "4rem 0" }} />

      {/* CTA */}
      <LeadCTASection />

      <style>{`
        @media (min-width: 900px) {
          .service-hero-grid { grid-template-columns: 1.2fr 0.8fr !important; }
        }
      `}</style>
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({ slug }));
}
