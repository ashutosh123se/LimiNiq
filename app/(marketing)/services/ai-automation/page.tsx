import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  FileSpreadsheet,
  Workflow,
  BarChart3,
  CheckCircle2,
  Lock,
  Clock,
  Sparkles,
  Zap,
  Globe2,
  ChevronRight,
  FileText,
  UserCheck,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQAccordion } from "@/components/sections/services/FAQAccordion";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, serviceSchema, faqPageSchema } from "@/lib/seo/schema";
import { SITE_CONTACT, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Automation & Autonomous Agents | LIMINIQ",
  description:
    "Cut manual operations by 50%+ with production-grade AI agents, intelligent document processing, and automated CRM workflows. Deployed in 3–6 weeks with senior engineers.",
  path: "/services/ai-automation",
});

const USE_CASES = [
  {
    icon: Bot,
    title: "Autonomous Support & Triage Agents",
    tagline: "24/7 intelligent tier-1 resolution",
    challenge: "Support teams buried in repetitive tickets, slow response times, and high customer churn.",
    solution:
      "Context-aware AI agents that resolve user inquiries, trigger backend actions (refunds, order tracking, booking), and escalate edge cases with pre-written summaries.",
    outcome: "65% instant resolution rate · < 5 second response time · 24/7 coverage",
    tech: ["Claude 3.5", "GPT-4o", "pgvector", "Zendesk/Intercom API"],
  },
  {
    icon: UserCheck,
    title: "Intelligent Lead Scoring & Routing",
    tagline: "Convert high-intent leads in seconds",
    challenge: "Inbound leads sit untouched for hours while reps manually qualify company size and budget.",
    solution:
      "Automated pipeline that enriches prospect data from Apollo/Clearbit, evaluates ICP fit via LLM rules, and instantly books calls with the matching account executive.",
    outcome: "Zero lead leakage · 4x faster response-to-meeting rate · 30% higher conversion",
    tech: ["HubSpot API", "Salesforce", "Python Workflows", "Slack Alerts"],
  },
  {
    icon: FileSpreadsheet,
    title: "Invoice & Document Processing (IDP)",
    tagline: "PDFs to structured database records",
    challenge: "Finance and ops teams manually typing data from thousands of invoices, receipts, and vendor contracts.",
    solution:
      "High-accuracy OCR + multi-modal LLM extraction that parses line items, tax numbers, and dates, runs validation checks, and pushes directly to accounting software.",
    outcome: "99.8% extraction accuracy · 80% manual entry eliminated · Same-day reconciliation",
    tech: ["Vision LLMs", "AWS Textract", "PostgreSQL", "QuickBooks/Xero/ERP"],
  },
  {
    icon: Workflow,
    title: "Cross-System Workflow Automation",
    tagline: "Kill manual data entry between siloed tools",
    challenge: "Teams juggling disconnected software (CRM, ERP, spreadsheets, email) with copy-paste errors.",
    solution:
      "Event-driven automation engines connecting webhooks, third-party APIs, and custom databases with guaranteed delivery, retries, and error notifications.",
    outcome: "15+ weekly hours saved per operator · 0% data sync mismatch · Full audit trails",
    tech: ["Event Queues", "Node.js", "Python FastAPIs", "REST/GraphQL"],
  },
  {
    icon: BarChart3,
    title: "Automated Executive Analytics & KPI Digests",
    tagline: "Actionable intelligence delivered daily",
    challenge: "Leaders waiting for end-of-month manual reporting spreadsheets to make critical business decisions.",
    solution:
      "Scheduled intelligence engines that pull metrics from Stripe, ad platforms, and product analytics, generate natural-language anomaly briefings, and post to Slack.",
    outcome: "Instant visibility · Automated anomaly alerts · Zero manual spreadsheet compilation",
    tech: ["SQL Aggregations", "LLM Summarization", "Slack Bots", "Scheduled Cloud Functions"],
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Automation Audit & ROI Discovery",
    desc: "We analyze your existing workflows, identify highest-ROI bottlenecks, and calculate exact time/cost savings before writing code.",
    timeline: "Week 1",
  },
  {
    step: "02",
    title: "Architecture & Working Prototype",
    desc: "We build a functional proof-of-concept using your sample data. You test the accuracy and experience before full integration.",
    timeline: "Weeks 2–3",
  },
  {
    step: "03",
    title: "Production Integration & Guardrails",
    desc: "We connect the solution to your live CRM, ERP, and databases, with strict hallucination guardrails, monitoring, and fallback routing.",
    timeline: "Weeks 4–5",
  },
  {
    step: "04",
    title: "Handover, Training & Ongoing SLA",
    desc: "You receive 100% code ownership, comprehensive documentation, team training, and post-launch maintenance with guaranteed response times.",
    timeline: "Week 6+",
  },
];

const FAQS = [
  {
    question: "Is our proprietary business and customer data safe?",
    answer:
      "Yes. We configure enterprise-grade zero-data-retention agreements where your data is never used to train public models. All vector databases and integrations use encrypted connections (TLS 1.3 / AES-256) and adhere strictly to GDPR, UK GDPR, and SOC2 compliance standards.",
  },
  {
    question: "How do you prevent AI hallucinations in critical workflows?",
    answer:
      "We design multi-step verification systems: Retrieval-Augmented Generation (RAG) grounds every response in your verified source documents, strict schema enforcement (Zod/Pydantic) validates structured outputs, and confidence scoring automatically routes low-certainty outputs to human review.",
  },
  {
    question: "How long does an automation project take to deploy?",
    answer:
      "A focused AI automation (e.g. support bot or invoice extraction pipeline) typically ships to production in 3 to 6 weeks. More complex multi-system enterprise integrations are scoped in 2-week agile milestones.",
  },
  {
    question: "Can you integrate with our legacy software or custom databases?",
    answer:
      "Yes. Our senior full-stack engineering team specializes in custom API integrations, database connectors (PostgreSQL, MySQL, SQL Server, MongoDB), webhooks, and private microservices.",
  },
  {
    question: "How does your pricing and engagement work for international clients?",
    answer:
      "We offer transparent fixed-price milestone agreements or monthly dedicated sprints. Typical implementations start at $2,500–$5,000 depending on complexity. Payments are supported in USD, GBP, EUR, or INR via Wise, Stripe, or direct bank transfer with full IP transfer upon milestone completion.",
  },
];

export default function AiAutomationPage() {
  const serviceSchemaData = serviceSchema({
    name: "AI Automation & Autonomous Agents",
    slug: "ai-automation",
    serviceType: "AI & Software",
    description:
      "Enterprise AI automation, autonomous agents, and intelligent document processing that cut manual work by 50%+.",
  });

  const faqSchemaData = faqPageSchema(FAQS);

  return (
    <div className="ai-page">
      <JsonLd data={serviceSchemaData} />
      {faqSchemaData && <JsonLd data={faqSchemaData} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "AI Automation", path: "/services/ai-automation" },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B1F3A] pt-24 pb-20 text-white lg:pt-32 lg:pb-28">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle at 75% 25%, rgba(59,130,246,0.3) 0%, transparent 60%)",
          }}
        />

        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-200 backdrop-blur">
                <Sparkles size={13} className="text-blue-300" />
                Enterprise AI Engineering
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-blue-200/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                US, UK &amp; Gulf Timezone Coverage
              </span>
            </div>

            <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-white">
              AI Automation &amp; Custom Agents That Cut Manual Work by{" "}
              <span className="font-[family-name:var(--font-display)] font-normal italic text-blue-300">
                50%+
              </span>
              .
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-blue-100/80 sm:text-xl">
              We design, build, and deploy production AI agents and custom automation systems. From autonomous
              support triage and CRM lead routing to document parsing and real-time executive summaries — you own
              100% of the code, deployed in weeks.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-7 py-4 text-sm font-bold text-white shadow-[0_12px_40px_rgba(59,130,246,0.45)] transition hover:bg-blue-400"
              >
                Claim Free Automation Audit <ArrowRight size={16} />
              </Link>
              <Link
                href="/portfolio/leadflow-ai"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
              >
                View Flagship Case Study
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="border-y border-border-subtle bg-bg-secondary py-8">
        <div className="section-container">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: "50–70%", label: "Manual time reduced", sub: "across back-office ops" },
              { value: "< 3s", label: "Real-time AI triage", sub: "instant customer resolution" },
              { value: "99.8%", label: "Extraction accuracy", sub: "verified document OCR" },
              { value: "3–6 Wks", label: "Production delivery", sub: "milestone-based handover" },
            ].map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-accent lg:text-4xl">
                  {m.value}
                </span>
                <span className="mt-1 text-sm font-bold text-text-primary">{m.label}</span>
                <span className="text-xs text-text-muted">{m.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-bg-primary">
        <div className="section-container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="pill-badge mb-4 inline-flex">
              <span className="text-[var(--signal)]">✦</span> Battle-Tested Systems
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3.25rem)] font-extrabold tracking-tight text-text-primary">
              5 High-Impact <span className="heading-accent">Automation Blueprints</span>
            </h2>
            <p className="mt-4 text-text-secondary">
              Proven enterprise use cases engineered with deterministic guardrails and full auditability.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((uc) => {
              const Icon = uc.icon;
              return (
                <div key={uc.title} className="glass-card-premium flex flex-col justify-between p-7 rounded-2xl">
                  <div>
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-muted text-accent">
                        <Icon size={24} />
                      </div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-muted">
                        Production Ready
                      </span>
                    </div>

                    <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-text-primary">
                      {uc.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-accent">{uc.tagline}</p>

                    <div className="mt-4 space-y-3 text-xs leading-relaxed">
                      <div>
                        <span className="font-bold text-text-muted uppercase tracking-wider block mb-1">
                          The Bottleneck:
                        </span>
                        <span className="text-text-secondary">{uc.challenge}</span>
                      </div>
                      <div>
                        <span className="font-bold text-accent uppercase tracking-wider block mb-1">
                          Our Solution:
                        </span>
                        <span className="text-text-primary">{uc.solution}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-border-subtle pt-4">
                    <div className="mb-3 flex items-start gap-1.5 text-xs font-bold text-emerald-600">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
                      <span>{uc.outcome}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {uc.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-bg-secondary px-2 py-0.5 font-mono text-[10px] text-text-muted border border-border-subtle"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Pipeline */}
      <section className="section-padding bg-bg-secondary border-y border-border-subtle">
        <div className="section-container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="pill-badge mb-4 inline-flex">
              <span className="text-[var(--signal)]">§ 04</span> Predictable Delivery
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3.25rem)] font-extrabold tracking-tight text-text-primary">
              How We Ship in <span className="heading-accent">4 Sprints</span>
            </h2>
            <p className="mt-4 text-text-secondary">
              Fixed milestones, weekly Slack updates, and working staging builds from week 2.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <div key={p.step} className="glass-card flex flex-col justify-between p-6 rounded-2xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-accent/40">{p.step}</span>
                    <span className="font-mono text-[11px] font-semibold text-text-muted bg-white/60 px-2.5 py-1 rounded-full border border-border-subtle">
                      {p.timeline}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-text-primary mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack & Security Guarantees */}
      <section className="section-padding bg-bg-primary">
        <div className="section-container">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <span className="pill-badge mb-4 inline-flex">
                <span className="text-[var(--signal)]">✦</span> Enterprise-Grade
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3.25rem)] font-extrabold tracking-tight text-text-primary">
                Zero Vendor Lock-In. <br />
                <span className="heading-accent">100% Code Ownership.</span>
              </h2>
              <p className="mt-4 text-text-secondary leading-relaxed">
                We build directly in your cloud infrastructure (AWS, GCP, Azure, or Cloudflare). Your proprietary data
                is never exposed, models run with zero data retention, and every contract includes full intellectual
                property transfer upon milestone payment.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: Lock,
                    title: "Enterprise Privacy & Compliance",
                    desc: "Zero model retention policies, GDPR/UK GDPR compliant data handling, and end-to-end encrypted pipelines.",
                  },
                  {
                    icon: Globe2,
                    title: "Timezone-Aligned Senior Team",
                    desc: "Daily async Slack updates and live sync overlap across US East, UK GMT, and Gulf GST working hours.",
                  },
                  {
                    icon: Zap,
                    title: "Deterministic Guardrails",
                    desc: "Every LLM output is validated against strict Pydantic/Zod schemas with human-in-the-loop fallback.",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl glass-card">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-[family-name:var(--font-heading)] font-bold text-text-primary">
                          {item.title}
                        </h4>
                        <p className="text-xs text-text-secondary mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass-card-premium p-8 rounded-3xl">
              <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text-primary mb-6">
                Our Production AI Stack
              </h3>
              <div className="space-y-4 text-sm">
                <div className="border-b border-border-subtle pb-3">
                  <span className="text-xs font-mono uppercase text-accent font-bold block mb-1">
                    Foundational Models
                  </span>
                  <p className="text-text-primary font-medium">
                    Claude 3.5 Sonnet · OpenAI GPT-4o &amp; o1 · Google Gemini 2.0 Flash · DeepSeek V3
                  </p>
                </div>
                <div className="border-b border-border-subtle pb-3">
                  <span className="text-xs font-mono uppercase text-accent font-bold block mb-1">
                    Orchestration &amp; Agent Frameworks
                  </span>
                  <p className="text-text-primary font-medium">
                    LangChain · LlamaIndex · CrewAI · FastAPI (Python) · Next.js / TypeScript
                  </p>
                </div>
                <div className="border-b border-border-subtle pb-3">
                  <span className="text-xs font-mono uppercase text-accent font-bold block mb-1">
                    Vector Search &amp; Retrieval
                  </span>
                  <p className="text-text-primary font-medium">
                    pgvector (PostgreSQL) · Pinecone · Qdrant · Hybrid Semantic Search
                  </p>
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-accent font-bold block mb-1">
                    Production Observability &amp; Guardrails
                  </span>
                  <p className="text-text-primary font-medium">
                    Langfuse · Helicone · Guardrails AI · Automated Unit &amp; Eval Tests
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-accent p-6 text-white text-center">
                <h4 className="font-bold text-lg mb-1">Ready to audit your workflows?</h4>
                <p className="text-xs text-blue-100 mb-4">
                  We'll map your bottlenecks and calculate your exact 90-day ROI for free.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#0B1F3A] hover:bg-blue-50 transition"
                >
                  Schedule Free Automation Audit <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-bg-secondary border-t border-border-subtle">
        <div className="section-container max-w-4xl">
          <div className="mb-12 text-center">
            <span className="pill-badge mb-4 inline-flex">
              <span className="text-[var(--signal)]">✦</span> Clear Answers
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3.25rem)] font-extrabold tracking-tight text-text-primary">
              Frequently Asked <span className="heading-accent">Questions</span>
            </h2>
          </div>
          <FAQAccordion items={FAQS} />
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
