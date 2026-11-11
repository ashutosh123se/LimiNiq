import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Database,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Server,
  Zap,
  Building2,
  ChevronRight,
  FileCode,
  Users2,
  GitBranch,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, serviceSchema, faqPageSchema } from "@/lib/seo/schema";
import { SITE_CONTACT, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Custom Software Development Company in Delhi, India | LIMINIQ",
  description:
    "Top custom software development company in Delhi, India. We engineer production-ready web apps, enterprise cloud backends, and SaaS systems with senior engineers and fixed milestone delivery.",
  path: "/services/custom-software-development-delhi",
});

const CAPABILITIES = [
  {
    icon: Code2,
    title: "Full-Stack Web Applications",
    desc: "Production Next.js, React, and TypeScript architectures built for speed, SEO, and maintainability. We build responsive frontends paired with resilient APIs that perform under heavy concurrent user load.",
  },
  {
    icon: Database,
    title: "Scalable Cloud & Database Systems",
    desc: "Robust relational (PostgreSQL, MySQL) and modern document/vector databases engineered with normalized schemas, optimized indexing, automated migration pipelines, and sub-100ms response targets.",
  },
  {
    icon: Server,
    title: "API & Microservice Architectures",
    desc: "Secure RESTful and GraphQL APIs connecting disparate third-party services, legacy internal enterprise databases, payment gateways (Stripe, Razorpay, Wise), and real-time webhook subscribers.",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access Control & Security",
    desc: "Enterprise-grade authorization models (RBAC), multi-tenant isolation, encrypted data-at-rest and in-transit (AES-256 / TLS 1.3), rate limiting, and automated OWASP vulnerability prevention.",
  },
  {
    icon: Layers,
    title: "Internal Tooling & Operations Portals",
    desc: "Custom admin dashboards, operational pipelines, and workflow automation portals that eliminate spreadsheet sprawl and reduce manual overhead across operations, finance, and support teams.",
  },
  {
    icon: GitBranch,
    title: "Legacy Codebase Modernization",
    desc: "Disciplined refactoring and incremental migration of monolithic or fragile legacy codebases to modern TypeScript micro-frontends and serverless cloud architectures without service interruption.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Technical Discovery & Scope Definition",
    desc: "We analyze your operational workflows, user journeys, and data schemas to deliver an unambiguous Statement of Work (SOW), complete with database diagrams, technical stack choices, and fixed milestone deadlines.",
    timeline: "Week 1",
  },
  {
    step: "02",
    title: "System Architecture & High-Fidelity UI",
    desc: "Our engineering leads design clean database schemas and API specifications while our product designers build an interactive Tailwind-based prototype so you can review the complete user experience before code is written.",
    timeline: "Weeks 2–3",
  },
  {
    step: "03",
    title: "Milestone-Gated Sprint Delivery",
    desc: "We develop in transparent 2-week agile sprints. You receive staging previews, automated GitHub CI/CD deployments, and direct access to senior engineers in Slack and Linear. Nothing is hidden behind account managers.",
    timeline: "Weeks 4–8",
  },
  {
    step: "04",
    title: "QA Hardening, Security Audit & Launch",
    desc: "Rigorous automated integration tests, load testing, security review, and cross-browser verification. Once approved, we execute zero-downtime production deployment with full DNS and SSL configuration.",
    timeline: "Weeks 9–10",
  },
  {
    step: "05",
    title: "100% IP Transfer & Ongoing SLA Support",
    desc: "You own all source code, repository rights, cloud accounts, and intellectual property. We provide comprehensive documentation, recorded handover sessions, and optional monthly SLA maintenance.",
    timeline: "Post-Launch",
  },
];

const FAQS = [
  {
    question: "Why choose LIMINIQ over other software development companies in Delhi NCR?",
    answer:
      "Unlike traditional outsourced agencies in Delhi that rely on junior developers and layers of non-technical account managers, LIMINIQ is an engineering-first firm. Every project is architected and built by senior full-stack developers with 5+ years of production experience. We work in modern stacks (Next.js, TypeScript, PostgreSQL), offer fixed-milestone pricing, guarantee 100% code ownership, and provide 4–6 hours of daily synchronous overlap with US, UK, and European clients.",
  },
  {
    question: "What is the typical cost of custom software development in Delhi, India?",
    answer:
      "Custom software projects typically range from $3,500 to $15,000 (₹2,50,000 to ₹12,00,000+) depending on system complexity, number of user roles, third-party integrations, and performance requirements. Smaller MVP sprints or workflow automation pipelines start around $2,500 (₹1,50,000). We provide transparent, itemized fixed-price estimates after our initial technical discovery call.",
  },
  {
    question: "Do I retain full ownership of the intellectual property and code?",
    answer:
      "Yes, 100%. Upon completion of project milestones, all source code, database architectures, API credentials, and documentation belong entirely to your company under a strict intellectual property transfer agreement and mutual NDA.",
  },
  {
    question: "How do you manage communication and project management?",
    answer:
      "We integrate seamlessly into your workflow. Our team uses Slack or Microsoft Teams for daily asynchronous updates, Linear or Jira for sprint task tracking, and GitHub or GitLab for code reviews. We also conduct weekly synchronous sprint review demos via Zoom or Google Meet.",
  },
  {
    question: "Where is LIMINIQ located in Delhi?",
    answer:
      "Our core engineering office is located in Paschim Vihar, West Delhi (Delhi 110063, India). We serve clients across Delhi NCR (including Gurgaon and Noida), pan-India, as well as international enterprises across North America, the UK, Europe, and the Middle East.",
  },
  {
    question: "What tech stack do you recommend for enterprise web applications?",
    answer:
      "We primarily architect systems using Next.js 15, TypeScript, React, Tailwind CSS, Node.js, and PostgreSQL (via Prisma or Drizzle ORM). For background jobs and caching, we utilize Redis and BullMQ; for cloud infrastructure, we deploy to Vercel, AWS, or Cloudflare with strict CI/CD pipelines.",
  },
];

export default function CustomSoftwareDelhiPage() {
  const serviceData = serviceSchema({
    name: "Custom Software Development in Delhi",
    slug: "custom-software-development-delhi",
    serviceType: "Software Development",
    description:
      "Production-grade custom software development, web applications, and SaaS engineering delivered by senior engineers in Delhi, India.",
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
          { name: "Custom Software Development Delhi", path: "/services/custom-software-development-delhi" },
        ])}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0B1F3A] pt-28 pb-20 text-white lg:pt-36 lg:pb-28">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at 80% 20%, rgba(59,130,246,0.35) 0%, transparent 60%)",
          }}
        />

        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-200 backdrop-blur">
                <Sparkles size={13} className="text-blue-300" />
                Delhi NCR Engineering Center
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-blue-200/80 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Serving Delhi, Pan-India &amp; Global Clients
              </span>
            </div>

            <h1 className="mb-6 font-[family-name:var(--font-heading)] text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              Custom Software Development Company in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-300">
                Delhi, India
              </span>
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-blue-100/90 sm:text-xl font-normal">
              Cut manual operations and scale your revenue with resilient, production-grade web applications,
              multi-tenant SaaS architectures, and custom enterprise software engineered by senior developers in Delhi.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
              >
                Schedule Technical Discovery
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                View Delhi &amp; Global Case Studies
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4">
              <div>
                <span className="block font-mono text-2xl font-bold text-white">100%</span>
                <span className="text-xs text-blue-200/70">Code Ownership</span>
              </div>
              <div>
                <span className="block font-mono text-2xl font-bold text-white">5+ Yrs</span>
                <span className="text-xs text-blue-200/70">Senior Engineer Avg</span>
              </div>
              <div>
                <span className="block font-mono text-2xl font-bold text-white">4–6h</span>
                <span className="text-xs text-blue-200/70">Global Timezone Overlap</span>
              </div>
              <div>
                <span className="block font-mono text-2xl font-bold text-white">Fixed</span>
                <span className="text-xs text-blue-200/70">Milestone Contracts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Context */}
      <section className="border-b border-slate-200/80 bg-white py-16">
        <div className="section-container max-w-4xl">
          <div className="space-y-6 text-base leading-relaxed text-slate-700 sm:text-lg">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-slate-900 sm:text-3xl">
              Engineering Software That Solves Real Operational Bottlenecks
            </h2>
            <p>
              In today&apos;s competitive market, off-the-shelf software and bloated SaaS subscriptions often force your
              business into rigid workflows that hamper efficiency. At LIMINIQ, based in Delhi, India, we architect bespoke
              software applications tailor-made to your exact business rules, data schemas, and growth trajectories.
            </p>
            <p>
              Whether you are an established Delhi NCR enterprise seeking to automate internal logistics and inventory,
              or an international founder from the US, UK, or UAE looking for a high-velocity development pod in India,
              we bridge the gap between business strategy and robust software engineering. We write clean, testable code
              designed to scale seamlessly without recurring technical debt.
            </p>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 bg-slate-50">
        <div className="section-container">
          <div className="mb-14 max-w-2xl">
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              Technical Capabilities
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-slate-900 sm:text-4xl">
              What We Build at Our Delhi Engineering Studio
            </h2>
            <p className="mt-3 text-base text-slate-600">
              From high-traffic consumer portals to secure enterprise databases, here is how we engineer your vision.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={24} />
                  </div>
                  <h3 className="mb-2 font-[family-name:var(--font-heading)] text-lg font-bold text-slate-900">
                    {cap.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Pipeline */}
      <section className="border-y border-slate-200 bg-white py-20">
        <div className="section-container">
          <div className="mb-14 max-w-2xl">
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              Predictable Delivery
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Our 5-Stage Engineering Methodology
            </h2>
            <p className="mt-3 text-base text-slate-600">
              No black-box handoffs or unexpected billing surprises. Transparent milestone sprints with clear visibility.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition hover:bg-slate-50"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-2xl font-extrabold text-blue-600">{step.step}</span>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-slate-900 sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 max-w-2xl">{step.desc}</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-xs font-semibold text-slate-700 shadow-2xs">
                  {step.timeline}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Advantage / Why Delhi */}
      <section className="py-20 bg-slate-50">
        <div className="section-container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                Strategic Advantage
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-slate-900 sm:text-4xl">
                The Advantage of Partnering With a Senior Delhi Engineering Team
              </h2>
              <div className="mt-6 space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Delhi NCR represents India&apos;s most mature technology corridor, boasting top-tier engineering talent,
                  world-class educational institutions, and a thriving SaaS ecosystem. By selecting LIMINIQ as your software
                  development partner, you benefit from:
                </p>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Senior Hands-On Talent:</strong> You work directly with architects
                      and developers who write production code daily, eliminating bureaucratic management overhead.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Capital-Efficient Scaling:</strong> Get Silicon Valley grade
                      engineering quality at 40–60% lower expenditure compared to onshore US or UK software agencies.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Strict IP Protection:</strong> Standardized mutual NDAs and legal
                      guarantees ensuring complete code and data ownership transfers upon milestone completion.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Timezone Agility:</strong> Full synchronous coordination with
                      European (CET), UK (GMT), and North American (EST) workdays.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="mb-4 font-[family-name:var(--font-heading)] text-xl font-bold text-slate-900">
                Explore Related Disciplines &amp; Case Studies
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Discover how we integrate custom engineering with autonomous AI automation and rapid MVP development:
              </p>
              <div className="space-y-3">
                <Link
                  href="/services/ai-automation"
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-400 hover:bg-blue-50/50"
                >
                  <span className="font-semibold text-slate-900 text-sm">AI Automation &amp; Autonomous Agents</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>
                <Link
                  href="/services/saas-mvp-development"
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-400 hover:bg-blue-50/50"
                >
                  <span className="font-semibold text-slate-900 text-sm">SaaS MVP Development Sprint</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>
                <Link
                  href="/portfolio/leadflow-ai"
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-400 hover:bg-blue-50/50"
                >
                  <span className="font-semibold text-slate-900 text-sm">LeadFlow AI — SaaS Case Study</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-400 hover:bg-blue-50/50"
                >
                  <span className="font-semibold text-slate-900 text-sm">Engineering &amp; Architecture Blog</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-slate-200 bg-white py-20">
        <div className="section-container max-w-4xl">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              Clear Answers
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Frequently Asked Questions About Software Development in Delhi
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
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

