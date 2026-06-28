import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { LeadCTASection } from "@/components/sections/home/LeadCTASection";
import { FAQAccordion } from "@/components/sections/services/FAQAccordion";
import { CaseStudyCard } from "@/components/sections/services/CaseStudyCard";
import { TechStackBadgeList } from "@/components/sections/services/TechStackBadgeList";
import { InternalLinkCallout } from "@/components/sections/services/InternalLinkCallout";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

import { SERVICES } from "@/lib/data/services";
import { getServiceExtension } from "@/lib/data/serviceExtensions";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const extension = getServiceExtension(slug);

  if (!service) return { title: "Service Not Found" };

  return {
    title: extension?.metaTitle ?? service.title,
    description: extension?.metaDescription ?? service.subtitle,
    keywords: extension?.metaKeywords,
    alternates: { canonical: `https://liminiq.com/services/${slug}` },
  };
}

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const extension = getServiceExtension(slug);

  if (!service) notFound();

  const serviceSchema = extension
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        serviceType: extension.serviceType,
        provider: {
          "@type": "Organization",
          name: "LIMINIQ",
          url: "https://liminiq.com",
        },
        description: extension.metaDescription,
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        url: `https://liminiq.com/services/${slug}`,
      }
    : null;

  return (
    <div style={{ paddingTop: "5rem", background: "var(--bg-primary)" }}>
      {serviceSchema && <JsonLd data={serviceSchema} />}

      {/* Split Hero */}
      <section
        className="section-padding section-container"
        style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "4rem",
            alignItems: "center",
            width: "100%",
          }}
          className="service-hero-grid"
        >
          <div>
            <div className="pill-badge" style={{ marginBottom: "1.5rem" }}>
              <span style={{ color: "var(--accent-primary)" }}>✦</span> Service Overview
            </div>
            <h1
              className="text-hero service-hero-title"
              style={{ marginBottom: "1.5rem", lineHeight: 1.1 }}
            >
              {service.title}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.15rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                maxWidth: 540,
                marginBottom: "2.5rem",
              }}
            >
              {extension?.metaDescription ?? service.subtitle}
            </p>
            <Link href="#overview" className="btn-secondary" style={{ borderRadius: 30 }}>
              Explore Details
              <ArrowRight size={16} />
            </Link>
          </div>

          <div
            className="glass-card"
            style={{
              position: "relative",
              overflow: "hidden",
              padding: "0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 400,
              borderRadius: 24,
            }}
          >
            {service.coverImage ? (
              <Image
                src={service.coverImage}
                alt={service.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <>
                <div
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: 24,
                    background: "rgba(109, 40, 217, 0.05)",
                    border: "1px solid rgba(109, 40, 217, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "2rem",
                  }}
                >
                  {service.icon}
                </div>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Enterprise-Grade
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                      color: "var(--text-tertiary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Implementation
                  </div>
                </div>
              </>
            )}
            {service.coverImage && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(4,5,8,0.8), rgba(4,5,8,0.2))",
                }}
              />
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section
        id="overview"
        className="section-padding section-container"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        <div
          style={{
            display: "grid",
            gap: "6rem",
            gridTemplateColumns: "1fr",
            maxWidth: 1000,
            margin: "0 auto",
          }}
        >
          {extension?.expandedIntro && (
            <div className="glass-card" style={{ padding: "3rem", borderRadius: 24 }}>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  marginBottom: "1.5rem",
                }}
              >
                Why It Matters
              </h2>
              {extension.expandedIntro.split("\n\n").map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1.1rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.8,
                    marginBottom: "1.25rem",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          <div className="glass-card" style={{ padding: "3rem", borderRadius: 24 }}>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "2rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: "1.5rem",
              }}
            >
              The Challenge & Solution
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.15rem",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
              }}
            >
              {service.description}
            </p>
          </div>

          {extension?.caseStudies && extension.caseStudies.length > 0 && (
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  marginBottom: "2rem",
                  textAlign: "center",
                }}
              >
                Client Results
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {extension.caseStudies.map((caseStudy) => (
                  <CaseStudyCard key={caseStudy.name} caseStudy={caseStudy} />
                ))}
              </div>
            </div>
          )}

          <div>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "2rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              Capabilities
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {service.features.map((feature) => (
                <div
                  key={feature}
                  className="glass-card group"
                  style={{
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                    borderRadius: 16,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(109, 40, 217, 0.08)",
                      border: "1px solid rgba(109, 40, 217, 0.2)",
                      color: "var(--accent-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircle2 size={18} strokeWidth={2} />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      lineHeight: 1.4,
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {extension?.techStack && extension.techStack.length > 0 && (
            <TechStackBadgeList items={extension.techStack} />
          )}

          {extension?.industries && extension.industries.length > 0 && (
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  marginBottom: "2rem",
                  textAlign: "center",
                }}
              >
                Industries We Serve
              </h2>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                {extension.industries.map((industry) => (
                  <div
                    key={industry}
                    className="glass-card"
                    style={{
                      padding: "1rem 1.75rem",
                      borderRadius: 12,
                      fontFamily: "var(--font-heading)",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {industry}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "2rem",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: "3rem",
                textAlign: "center",
              }}
            >
              Execution Strategy
            </h2>
            <div className="timeline-container" style={{ position: "relative" }}>
              <div
                className="timeline-line"
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background: "var(--border-subtle)",
                  zIndex: 0,
                }}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                {service.process.map((step, i) => (
                  <div
                    key={step.title}
                    className="timeline-item"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <div
                      className="timeline-circle"
                      style={{
                        borderRadius: 12,
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--accent-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      0{i + 1}
                    </div>
                    <div className="glass-card timeline-card" style={{ flex: 1, borderRadius: 16 }}>
                      <h3
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "1.3rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          marginBottom: "0.75rem",
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "1.05rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {extension?.seoForSaasNote && (
            <div
              className="glass-card"
              style={{
                padding: "2rem 2.5rem",
                borderRadius: 20,
                border: "1px solid rgba(16, 185, 129, 0.2)",
                background: "rgba(16, 185, 129, 0.04)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.05rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                <strong style={{ color: "var(--text-primary)" }}>SEO for SaaS & Software:</strong>{" "}
                {extension.seoForSaasNote}
              </p>
            </div>
          )}

          {extension?.faqs && extension.faqs.length > 0 && (
            <FAQAccordion items={extension.faqs} />
          )}

          {extension?.internalLinks && extension.internalLinks.length > 0 && (
            <InternalLinkCallout links={extension.internalLinks} />
          )}
        </div>
      </section>

      <div style={{ padding: "4rem 0" }} />

      <LeadCTASection />

      <style>{`
        .service-hero-title { font-size: clamp(2rem, 8vw, 4.5rem); }
        .timeline-container { padding-left: 1.5rem; }
        .timeline-line { left: 39px; }
        .timeline-item { gap: 2.5rem; }
        .timeline-circle { width: 48px; height: 48px; font-size: 1.1rem; }
        .timeline-card { padding: 2rem; }
        
        @media (min-width: 900px) {
          .service-hero-grid { grid-template-columns: 1.2fr 0.8fr !important; }
          .timeline-line { left: 47px; }
        }
        @media (max-width: 899px) {
          .timeline-container { padding-left: 0; }
          .timeline-line { left: 19px; }
          .timeline-item { gap: 1rem; }
          .timeline-circle { width: 40px; height: 40px; font-size: 0.95rem; }
          .timeline-card { padding: 1.25rem; }
        }
      `}</style>
    </div>
  );
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}
