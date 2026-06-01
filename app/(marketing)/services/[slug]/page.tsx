import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { LeadCTASection } from "@/components/sections/home/LeadCTASection";
import { ArrowRight, CheckCircle2, TrendingUp, BarChart3, Globe, Smartphone, Code2, PenTool, Palette, FileText, Video, Cpu } from "lucide-react";
import Image from "next/image";

export const SERVICES_DATA = {
  "website-ecommerce": {
    title: "Website & E-commerce Development",
    subtitle: "Custom-built, high-performance web applications and e-commerce platforms that convert visitors into customers.",
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
    coverImage: "/images/services/ecommerce_dev.png"
  },
  "mobile-app-development": {
    title: "Mobile Application Development",
    subtitle: "Native and cross-platform mobile experiences that engage users and dominate the app stores.",
    icon: <Smartphone size={48} strokeWidth={1} color="var(--accent-primary)" />,
    description: "We build intuitive, high-performance mobile apps for iOS and Android. Using React Native and Flutter, we deliver seamless native-like experiences with rapid development cycles.",
    features: [
      "iOS & Android Development",
      "Cross-Platform Solutions (React Native/Flutter)",
      "Mobile UI/UX Design",
      "App Store Optimization (ASO)",
      "Push Notifications & Engagement",
      "Backend API & Database Architecture",
    ],
    process: [
      { title: "Ideation", desc: "Mapping user journeys and defining core app features." },
      { title: "Prototyping", desc: "Creating interactive wireframes and UI designs." },
      { title: "Engineering", desc: "Building the front-end and robust backend infrastructure." },
      { title: "QA Testing", desc: "Testing across multiple devices and OS versions." },
      { title: "Launch", desc: "App store submission and post-launch support." },
    ],
    coverImage: "/images/services/mobile_app_dev.png"
  },
  "custom-software-saas": {
    title: "Custom Software & SaaS Development",
    subtitle: "Scalable, secure, and robust cloud applications engineered to solve complex business problems.",
    icon: <Code2 size={48} strokeWidth={1} color="var(--accent-primary)" />,
    description: "Whether you're building a multi-tenant SaaS product from scratch or modernizing legacy software, our engineering team architects solutions that scale globally and securely.",
    features: [
      "Multi-Tenant SaaS Architecture",
      "Enterprise Web Portals",
      "Legacy System Modernization",
      "Custom ERP & CRM Solutions",
      "Secure API Infrastructure",
      "Cloud Deployment & DevOps",
    ],
    process: [
      { title: "Scoping", desc: "Detailed requirements gathering and feasibility analysis." },
      { title: "System Design", desc: "Architecting the database, API, and cloud infrastructure." },
      { title: "Development", desc: "Iterative development with CI/CD pipelines." },
      { title: "Security Audit", desc: "Vulnerability testing and data compliance checks." },
      { title: "Scaling", desc: "Monitoring performance and scaling server infrastructure." },
    ],
    coverImage: "/images/services/saas_dev.png"
  },
  "ui-ux-design-branding": {
    title: "UI/UX Design & Branding",
    subtitle: "Award-winning interfaces and brand identities that leave a lasting impression.",
    icon: <PenTool size={48} strokeWidth={1} color="var(--accent-primary)" />,
    description: "Great design isn't just about looking good—it's about how it works. We craft user-centric interfaces and compelling brand narratives that build trust and drive conversions.",
    features: [
      "User Experience (UX) Research",
      "User Interface (UI) Design",
      "Wireframing & Prototyping",
      "Brand Identity & Guidelines",
      "Logo Design & Typography",
      "Design System Creation",
    ],
    process: [
      { title: "Research", desc: "Analyzing competitors, user behavior, and market trends." },
      { title: "Wireframing", desc: "Mapping out the structure and user flow." },
      { title: "Visual Design", desc: "Applying color theory, typography, and brand elements." },
      { title: "Prototyping", desc: "Creating interactive prototypes for user testing." },
      { title: "Handoff", desc: "Delivering pixel-perfect assets to the engineering team." },
    ],
    coverImage: "/images/services/ui_ux_design.png"
  },
  "graphic-design-creative": {
    title: "Graphic Design & Creative Services",
    subtitle: "Visually striking creative assets that capture attention and communicate your message.",
    icon: <Palette size={48} strokeWidth={1} color="var(--accent-primary)" />,
    description: "From marketing collateral to social media graphics, our creative team produces high-quality visual content that aligns perfectly with your brand identity.",
    features: [
      "Social Media Graphics",
      "Marketing Collateral & Brochures",
      "Pitch Decks & Presentations",
      "Custom Illustrations",
      "Ad Creative & Banners",
      "Packaging Design",
    ],
    process: [
      { title: "Briefing", desc: "Understanding the creative goals and target audience." },
      { title: "Concepts", desc: "Developing initial mood boards and design directions." },
      { title: "Creation", desc: "Crafting the visual assets with precision." },
      { title: "Refinement", desc: "Iterating based on feedback to ensure perfection." },
      { title: "Delivery", desc: "Providing final files in all required formats." },
    ],
    coverImage: "/images/services/graphic_design.png"
  },
  "digital-marketing": {
    title: "Digital Marketing & Lead Generation",
    subtitle: "Precision-targeted campaigns that maximize ROI and scale your revenue.",
    icon: <BarChart3 size={48} strokeWidth={1} color="var(--accent-primary)" />,
    description: "Stop guessing with your ad spend. Our performance marketing strategies leverage advanced targeting, compelling creative, and rigorous A/B testing to lower acquisition costs and maximize lifetime value.",
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
      { title: "Creative", desc: "Developing ad copy, visuals, and landing pages." },
      { title: "Launch", desc: "Structuring campaigns for optimal budget distribution." },
      { title: "Optimization", desc: "Daily bid management and A/B testing to lower CAC." },
      { title: "Scaling", desc: "Increasing spend profitably once winners are identified." },
    ],
    coverImage: "/images/services/digital_marketing.png"
  },
  "seo-search-engine-marketing": {
    title: "SEO & Search Engine Marketing",
    subtitle: "Data-driven SEO strategies that dominate search results and drive qualified traffic.",
    icon: <TrendingUp size={48} strokeWidth={1} color="var(--accent-primary)" />,
    description: "Visibility is everything. We combine technical SEO, content strategy, and authoritative link building to secure top rankings for high-intent keywords. No black-hat tricks, just sustainable organic growth.",
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
    coverImage: "/images/services/seo_marketing.png"
  },
  "content-creation": {
    title: "Content Creation & Copywriting",
    subtitle: "Compelling narratives and SEO-optimized content that engages and converts.",
    icon: <FileText size={48} strokeWidth={1} color="var(--accent-primary)" />,
    description: "Content is the voice of your brand. We produce high-quality blogs, website copy, whitepapers, and social content that resonates with your audience and establishes industry authority.",
    features: [
      "SEO Blog Writing",
      "Website Copywriting",
      "Email Newsletter Content",
      "Whitepapers & E-books",
      "Social Media Captions",
      "Product Descriptions",
    ],
    process: [
      { title: "Discovery", desc: "Learning your brand voice, tone, and industry nuances." },
      { title: "Planning", desc: "Creating a comprehensive content calendar." },
      { title: "Drafting", desc: "Writing engaging, value-driven, and optimized content." },
      { title: "Editing", desc: "Rigorous proofreading and stylistic refinement." },
      { title: "Publishing", desc: "Formatting and distributing content across channels." },
    ],
    coverImage: "/images/services/content_creation.png"
  },
  "video-production": {
    title: "Video Production & Editing",
    subtitle: "Cinematic videos and dynamic animations that bring your brand to life.",
    icon: <Video size={48} strokeWidth={1} color="var(--accent-primary)" />,
    description: "Video is the most engaging medium online. From corporate promos to social media reels and explainer animations, we handle the entire production pipeline to deliver scroll-stopping visuals.",
    features: [
      "Promotional & Brand Videos",
      "Social Media Reels & Shorts",
      "2D/3D Motion Graphics",
      "Explainer Animations",
      "Corporate Interviews",
      "Video Editing & Color Grading",
    ],
    process: [
      { title: "Pre-Production", desc: "Scriptwriting, storyboarding, and planning." },
      { title: "Production", desc: "Filming with professional gear or generating animations." },
      { title: "Editing", desc: "Cutting, pacing, and assembling the narrative." },
      { title: "Post-Production", desc: "Adding VFX, motion graphics, color grading, and sound." },
      { title: "Delivery", desc: "Exporting optimized formats for various platforms." },
    ],
    coverImage: "/images/services/video_production.png"
  },
  "ai-automation-cloud": {
    title: "AI, Automation & Cloud Solutions",
    subtitle: "Future-proof your business with cutting-edge artificial intelligence and cloud architecture.",
    icon: <Cpu size={48} strokeWidth={1} color="var(--accent-primary)" />,
    description: "We help businesses leverage AI to automate workflows, analyze vast datasets, and scale infrastructure securely on AWS, GCP, or Azure.",
    features: [
      "Custom AI Chatbots (LLM Integration)",
      "Workflow Automation (Zapier/Make)",
      "Machine Learning Models",
      "Cloud Migration (AWS/Azure/GCP)",
      "Serverless Architecture",
      "Data Analytics & Pipelines",
    ],
    process: [
      { title: "Assessment", desc: "Identifying bottlenecks ripe for automation or AI integration." },
      { title: "Architecture", desc: "Designing secure cloud and data pipelines." },
      { title: "Integration", desc: "Connecting APIs and training AI models on your data." },
      { title: "Deployment", desc: "Rolling out solutions with minimal disruption." },
      { title: "Maintenance", desc: "Monitoring AI accuracy and cloud resource utilization." },
    ],
    coverImage: "/images/services/ai_automation.png"
  }
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

          {/* Right: Cover Image or Bento Graphic */}
          <div className="glass-card" style={{ position: "relative", overflow: "hidden", padding: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, borderRadius: 24 }}>
            {service.coverImage ? (
              <Image 
                src={service.coverImage} 
                alt={service.title} 
                fill 
                style={{ objectFit: 'cover' }} 
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <>
                <div style={{ width: 96, height: 96, borderRadius: 24, background: "rgba(109, 40, 217, 0.05)", border: "1px solid rgba(109, 40, 217, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2rem" }}>
                  {service.icon}
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>Enterprise-Grade</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Implementation</div>
                </div>
              </>
            )}
            {/* Dark overlay so the text isn't lost if image is bright */}
            {service.coverImage && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,5,8,0.8), rgba(4,5,8,0.2))' }} />}
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
