import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Brain,
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
  ShieldAlert,
  Server,
  Cpu,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, serviceSchema, faqPageSchema } from "@/lib/seo/schema";
import { SITE_CONTACT, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Automation Agency in India | LIMINIQ",
  description:
    "Leading AI automation agency in India. We engineer production AI agents, intelligent document OCR, and bi-directional CRM/ERP workflows that cut manual labor by 50%+.",
  path: "/services/ai-automation-agency-india",
});

const USE_CASES = [
  {
    icon: Bot,
    title: "Autonomous Tier-1 Customer Support & Triage Agents",
    tagline: "Instant resolution with zero hallucination",
    challenge:
      "Customer support queues take hours to respond, leading to prospect drop-off, frustrated clients, and ballooning support headcounts.",
    solution:
      "We build context-grounded AI support agents connected directly to your knowledge base and database. They resolve inquiries in seconds, execute authorized actions (order lookups, booking, refunds), and escalate edge cases with pre-drafted diagnostic summaries.",
    outcome: "65%+ deflection rate · Sub-5 second first response · 24/7 multi-lingual coverage",
    tech: ["Claude 3.5 Sonnet", "GPT-4o", "pgvector", "Intercom/Zendesk API"],
  },
  {
    icon: Zap,
    title: "Intelligent Inbound Lead Routing & Qualification",
    tagline: "Convert high-intent leads in real time",
    challenge:
      "Sales inquiries sit in spreadsheets for hours before SDRs manually verify company size and assign them to the right account executive.",
    solution:
      "An automated pipeline that triggers immediately upon form submission, enriches company data via Clearbit or Apollo, scores ICP fit with deterministic LLM rules, and assigns calendar invites to appropriate account executives instantly.",
    outcome: "Zero lead abandonment · 4x faster lead-to-meeting velocity · 38% higher conversion",
    tech: ["HubSpot API", "Salesforce", "Python Microservices", "Slack Webhooks"],
  },
  {
    icon: FileSpreadsheet,
    title: "Intelligent Document Processing (IDP) & Invoice OCR",
    tagline: "Transform messy PDFs into validated SQL records",
    challenge:
      "Operations and finance teams waste hundreds of hours manually entering data from vendor invoices, receipts, bills of lading, and legal contracts.",
    solution:
      "Vision-enabled LLM extraction pipelines that parse PDFs, scan structured line items, validate mathematical totals against database purchase orders, and sync directly to your ERP or accounting software.",
    outcome: "99.4% extraction accuracy · 90% reduction in processing turnaround · Audit-ready logs",
    tech: ["GPT-4o Vision", "Tesseract OCR", "PostgreSQL", "QuickBooks / Xero API"],
  },
  {
    icon: Workflow,
    title: "Cross-Platform Workflow & ERP Synchronization",
    tagline: "End-to-end data pipelines without manual rekeying",
    challenge:
      "Different software tools (CRM, billing, inventory, fulfillment) operate as siloed data islands requiring tedious manual syncing.",
    solution:
      "Resilient event-driven automation pipelines connecting internal databases with SaaS tools via webhooks, automated idempotency guards, and automatic retry queues.",
    outcome: "Elimination of human data-entry errors · Real-time cross-system visibility",
    tech: ["Node.js / Python", "Redis BullMQ", "AWS Lambda", "Webhook Queues"],
  },
  {
    icon: BarChart3,
    title: "Executive Anomaly Detection & Daily Intelligence Bots",
    tagline: "Actionable business metrics delivered to Slack",
    challenge:
      "Founders and executives drown in static dashboards and miss critical revenue drops, churn spikes, or inventory shortages.",
    solution:
      "Autonomous analytical agents that query your production database daily, run statistical anomaly detection, and deliver concise, natural-language briefings and alerts directly to executive Slack channels.",
    outcome: "Immediate alerting on churn anomalies · Zero manual weekly spreadsheet compilation",
    tech: ["PostgreSQL Analytics", "Python Pandas", "OpenAI API", "Slack Block Kit"],
  },
];

const GUARDRAILS = [
  {
    icon: Lock,
    title: "Enterprise Zero Data Retention",
    desc: "Your proprietary customer and business data is never used to train public AI models. We enforce strict SOC2, GDPR, and UK GDPR data isolation standards.",
  },
  {
    icon: ShieldAlert,
    title: "Deterministic Validation & Schema Enforcement",
    desc: "Every LLM output is strictly validated against TypeScript/Pydantic schemas before writing to your database. Hallucinations are intercepted before they touch production.",
  },
  {
    icon: Server,
    title: "Retrieval-Augmented Generation (RAG)",
    desc: "Responses are strictly grounded in your verified internal documentation and knowledge base with vector embeddings, citing source links for human review.",
  },
  {
    icon: Cpu,
    title: "Full Code & Infrastructure Ownership",
    desc: "We deploy pipelines directly into your private cloud infrastructure (AWS, Vercel, Supabase). You retain 100% intellectual property and API ownership.",
  },
];

const FAQS = [
  {
    question: "Why should we hire LIMINIQ as our AI automation agency in India?",
    answer:
      "Most self-proclaimed 'AI agencies' simply string together fragile Zapier templates or generic ChatGPT wrappers that break under real enterprise workloads. LIMINIQ is a full-stack engineering consultancy based in Delhi, India. We engineer production-grade AI pipelines with custom Python/TypeScript microservices, deterministic validation schemas (Zod/Pydantic), error-handling queues, and private vector databases. You get enterprise reliability at 50% lower cost than US/UK agencies, with direct senior engineer access and daily timezone overlap.",
  },
  {
    question: "How do you ensure AI agents do not hallucinate false information?",
    answer:
      "We utilize a multi-layered verification architecture: (1) Retrieval-Augmented Generation (RAG) strictly bounds the model to your verified source data; (2) Strict schema enforcement rejects unstructured or malformed outputs; (3) Multi-agent consensus reviews critical outputs before database writes; and (4) Fallback routing automatically directs ambiguous or low-confidence queries to human team members with full context.",
  },
  {
    question: "Is our proprietary company data secure and compliant with GDPR?",
    answer:
      "Yes. We configure enterprise zero-data-retention agreements where your data is never stored or used for model training. All data transmissions are encrypted via TLS 1.3, databases use AES-256 encryption at rest, and all architectures strictly adhere to GDPR, UK GDPR, and CCPA requirements.",
  },
  {
    question: "What is the typical timeline and cost for deploying an AI automation project?",
    answer:
      "Focused automation pipelines (such as intelligent document extraction or automated lead routing) are typically delivered in 3 to 6 weeks, with fixed-price engagements starting at $2,500 (₹1,25,000). Larger multi-agent enterprise systems or custom internal AI platforms are structured in 2-week milestone sprints.",
  },
  {
    question: "Can these AI workflows integrate with our existing software and legacy databases?",
    answer:
      "Yes. Our engineering team specializes in custom API integrations, webhook handlers, and database connectors for PostgreSQL, MySQL, Microsoft SQL Server, MongoDB, Salesforce, HubSpot, Zendesk, QuickBooks, and proprietary internal REST APIs.",
  },
  {
    question: "Do you offer a free initial automation audit?",
    answer:
      "Yes! We offer a free 30-minute technical automation audit where our senior architects evaluate your current operational bottlenecks, review your software stack, and provide an actionable roadmap detailing which workflows can be automated to save 50%+ manual hours.",
  },
];

export default function AiAutomationAgencyIndiaPage() {
  const serviceData = serviceSchema({
    name: "AI Automation Agency India",
    slug: "ai-automation-agency-india",
    serviceType: "AI Automation & Autonomous Agents",
    description:
      "India's leading engineering-first AI automation agency. We architect autonomous LLM workflows, document OCR pipelines, and custom enterprise integrations.",
  });

  const faqData = faqPageSchema(FAQS);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <JsonLd data={serviceData} />
      {faqData && <JsonLd data={faqData} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "AI Automation Agency India", path: "/services/ai-automation-agency-india" },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B1F3A] pt-28 pb-20 text-white lg:pt-36 lg:pb-28">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-35"
          style={{
            backgroundImage: "radial-gradient(circle at 75% 25%, rgba(59,130,246,0.35) 0%, transparent 60%)",
          }}
        />

        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-200 backdrop-blur">
                <Brain size={13} className="text-blue-300" />
                Engineering-First AI Studio
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-blue-200/80 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                US, UK, UAE &amp; Global Enterprise Coverage
              </span>
            </div>

            <h1 className="mb-6 font-[family-name:var(--font-heading)] text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              AI Automation Agency in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-300">
                India
              </span>
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-blue-100/90 sm:text-xl font-normal">
              Cut manual operations by 50%+ with production-grade AI agents, intelligent document processing (IDP),
              and autonomous CRM workflows. Engineered by senior developers with zero-data-retention guarantees.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
              >
                Claim Free Automation Audit
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/services/ai-automation"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                Explore Enterprise AI Services
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4">
              <div>
                <span className="block font-mono text-2xl font-bold text-white">50%+</span>
                <span className="text-xs text-blue-200/70">Manual Labor Reduction</span>
              </div>
              <div>
                <span className="block font-mono text-2xl font-bold text-white">3–6 Wks</span>
                <span className="text-xs text-blue-200/70">Production Delivery</span>
              </div>
              <div>
                <span className="block font-mono text-2xl font-bold text-white">Zero</span>
                <span className="text-xs text-blue-200/70">Model Data Retention</span>
              </div>
              <div>
                <span className="block font-mono text-2xl font-bold text-white">100%</span>
                <span className="text-xs text-blue-200/70">Source Code Transfer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Overview */}
      <section className="border-b border-slate-200/80 bg-white py-16">
        <div className="section-container max-w-4xl">
          <div className="space-y-6 text-base leading-relaxed text-slate-700 sm:text-lg">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-slate-900 sm:text-3xl">
              Moving Beyond Fragile AI Demos to Production Reliability
            </h2>
            <p>
              Generative AI is transforming enterprise efficiency, but off-the-shelf chatbots and brittle no-code workflows
              often fail in production due to hallucinations, unstructured data responses, and security vulnerabilities.
            </p>
            <p>
              As India&apos;s leading engineering-first AI automation agency, LIMINIQ bridges cutting-edge foundation models
              (Claude 3.5, GPT-4o, Llama 3) with hardened enterprise software architectures. We build deterministic pipelines
              with strict validation schemas, automated fallback escalation, and bi-directional API synchronizations that
              reliably handle hundreds of thousands of operations without human intervention.
            </p>
          </div>
        </div>
      </section>

      {/* 5 Concrete Use Cases */}
      <section className="py-20 bg-slate-50">
        <div className="section-container">
          <div className="mb-14 max-w-2xl">
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              Enterprise Use Cases
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Concrete Workflows We Automate
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Proven, high-impact automations delivering measurable operational hours saved from month one.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl">
            {USE_CASES.map((uc) => {
              const Icon = uc.icon;
              return (
                <div
                  key={uc.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs transition hover:border-blue-300 hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Icon size={22} />
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-slate-900">
                          {uc.title}
                        </h3>
                        <span className="font-mono text-xs text-blue-600 font-semibold">{uc.tagline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-slate-600">
                    <p>
                      <strong className="text-slate-800">Problem:</strong> {uc.challenge}
                    </p>
                    <p>
                      <strong className="text-slate-800">Engineered Solution:</strong> {uc.solution}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                      <CheckCircle2 size={15} className="text-emerald-500" />
                      <span>{uc.outcome}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {uc.tech.map((t) => (
                        <span key={t} className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600">
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

      {/* Engineering Guardrails */}
      <section className="border-y border-slate-200 bg-white py-20">
        <div className="section-container">
          <div className="mb-14 max-w-2xl">
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              Security &amp; Governance
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Enterprise Guardrails &amp; Data Security
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Production-ready AI requires zero compromise on security, compliance, and hallucination management.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {GUARDRAILS.map((g) => {
              const Icon = g.icon;
              return (
                <div key={g.title} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100/70 text-blue-700">
                    <Icon size={20} />
                  </div>
                  <h3 className="mb-2 font-[family-name:var(--font-heading)] text-base font-bold text-slate-900">
                    {g.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-600">{g.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cross-linking to Services & Case Studies */}
      <section className="py-20 bg-slate-50">
        <div className="section-container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                Case Study Proof
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-slate-900 sm:text-4xl">
                See Autonomous AI in Action: LeadFlow AI
              </h2>
              <div className="mt-6 space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Explore how we engineered <strong>LeadFlow AI</strong>, our flagship autonomous lead qualification and
                  routing platform. The system processes inbound enterprise leads via webhooks, enriches company data,
                  evaluates ICP fit with LLMs, and routes leads to matching sales reps with 100% audit visibility.
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <Link
                    href="/portfolio/leadflow-ai"
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
                  >
                    Read LeadFlow AI Case Study
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="mb-4 font-[family-name:var(--font-heading)] text-xl font-bold text-slate-900">
                Explore Related Services
              </h3>
              <div className="space-y-3">
                <Link
                  href="/services/ai-automation"
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-400 hover:bg-blue-50/50"
                >
                  <span className="font-semibold text-slate-900 text-sm">AI Automation &amp; Autonomous Agents</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>
                <Link
                  href="/services/custom-software-saas"
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-400 hover:bg-blue-50/50"
                >
                  <span className="font-semibold text-slate-900 text-sm">Custom Software &amp; SaaS</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>
                <Link
                  href="/services/custom-software-development-delhi"
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-400 hover:bg-blue-50/50"
                >
                  <span className="font-semibold text-slate-900 text-sm">Custom Software in Delhi</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>
                <Link
                  href="/services/saas-mvp-development-india"
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-400 hover:bg-blue-50/50"
                >
                  <span className="font-semibold text-slate-900 text-sm">SaaS MVP Development India</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-slate-200 bg-white py-20">
        <div className="section-container max-w-4xl">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              Direct Answers
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Frequently Asked Questions About AI Automation in India
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-slate-200 p-6 bg-slate-50/60">
                <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-slate-900 sm:text-lg">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}

