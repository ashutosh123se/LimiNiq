import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  CreditCard,
  Lock,
  ChevronRight,
  Code2,
  Layers,
  BarChart,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, serviceSchema, faqPageSchema } from "@/lib/seo/schema";
import { SITE_CONTACT, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "SaaS MVP Development Company in India | LIMINIQ",
  description:
    "Launch your SaaS MVP in 4 to 6 weeks with India's leading engineering studio. Production-grade Next.js architecture, Stripe billing, auth, and 100% code ownership.",
  path: "/services/saas-mvp-development-india",
});

const SPRINT_PHASES = [
  {
    week: "Sprint 01",
    title: "Scope Scoping, Data Modeling & Interactive Wireframes",
    desc: "We extract the essential 'must-have' core value loop of your SaaS. We map user onboarding, define PostgreSQL database schemas, and create interactive Figma/Tailwind wireframes so the full experience is validated before code is committed.",
  },
  {
    week: "Sprint 02",
    title: "Authentication, Multi-Tenancy & Core Feature Engine",
    desc: "We establish the Next.js 15 full-stack foundation with enterprise authentication (NextAuth/Auth0/Supabase Auth), organization workspaces, role-based access controls (RBAC), and build out the primary value driver of your product.",
  },
  {
    week: "Sprint 03",
    title: "Subscription Billing, Email Pipelines & Third-Party APIs",
    desc: "We integrate Stripe Customer Portal (supporting recurring monthly/annual plans, usage metering, and invoice PDFs), transactional email systems (Resend), and bi-directional API webhooks with strict error handling.",
  },
  {
    week: "Sprint 04",
    title: "Testing, Observability, Analytics & Production Go-Live",
    desc: "Full automated end-to-end testing, responsive cross-device verification, Core Web Vitals optimization, and deployment to high-availability infrastructure (Vercel/Cloudflare) with post-launch analytics (PostHog/Plausible).",
  },
];

const MVP_PILLARS = [
  {
    icon: Rocket,
    title: "4-Week Rapid Time-to-Market",
    desc: "Avoid spending 9 months in development limbo. We compress the product cycle into disciplined 4-week milestones so you can start acquiring real paying customers immediately.",
  },
  {
    icon: CreditCard,
    title: "Turnkey Billing & Subscriptions",
    desc: "Production Stripe or Lemon Squeezy integration supporting localized currencies (USD, EUR, GBP, INR), free trials, coupon codes, and automated failed payment dunning.",
  },
  {
    icon: Lock,
    title: "100% Source Code & IP Ownership",
    desc: "Zero revenue share, zero equity demands. You own all GitHub repositories, intellectual property, production database credentials, and cloud infrastructure from day one.",
  },
  {
    icon: Layers,
    title: "Production Architecture That Scales",
    desc: "Built with Next.js, TypeScript, and PostgreSQL. We do not use fragile no-code builders. Your MVP is built on the same engineering foundation used by modern venture-backed startups.",
  },
  {
    icon: BarChart,
    title: "Built-In Conversion Tracking",
    desc: "Instrumented with custom event tracking, funnel drop-off analytics, and automated onboarding email triggers to ensure new signups convert into active retained users.",
  },
  {
    icon: Sparkles,
    title: "AI-Ready Feature Hooks",
    desc: "Seamless integration points for OpenAI, Claude, or local LLMs to add automated summarization, generative workflows, or intelligent assistant features directly into your core product.",
  },
];

const FAQS = [
  {
    question: "What is included in a 4-week SaaS MVP sprint with LIMINIQ?",
    answer:
      "Our 4-week sprint delivers a fully functional, production-ready SaaS application: custom UI/UX design, Next.js 15 full-stack codebase, PostgreSQL relational database, authentication with multi-tenancy support, Stripe subscription billing, transactional email alerts, automated deployment to Vercel/Cloudflare, and full GitHub repository handover with documentation.",
  },
  {
    question: "Why should international founders build their SaaS MVP in India with LIMINIQ?",
    answer:
      "Building your SaaS MVP with our senior engineering team in India gives you Silicon Valley engineering quality at a fraction of Western agency rates. While US and UK development firms routinely charge $35,000 to $70,000 for an MVP, our focused sprints start at $3,500 with transparent fixed-price milestones. You get direct daily Slack communication, senior architects with 5+ years experience, and 4–6 hours of synchronous US/UK timezone overlap.",
  },
  {
    question: "How do you help prevent scope creep during an MVP build?",
    answer:
      "We apply a ruthless prioritization framework during technical discovery. Together, we identify the single 'core value loop' that solves your user's primary pain point. Ancillary or non-essential features are documented into a Phase 2 backlog. This ensures your MVP ships on schedule within 4 weeks and within your exact budget.",
  },
  {
    question: "Can this MVP handle thousands of users after launch?",
    answer:
      "Yes. Because we engineer on a modern Next.js and PostgreSQL foundation with serverless edge caching, your MVP can comfortably handle thousands of concurrent users and hundreds of thousands of monthly page views without requiring an expensive architectural rewrite.",
  },
  {
    question: "What happens after the MVP is launched?",
    answer:
      "You have complete autonomy. Because you own 100% of the code and documentation, you can manage the application internally, hire in-house engineers, or continue partnering with LIMINIQ on a dedicated monthly rolling engineering pod to ship Phase 2 features based on customer feedback.",
  },
  {
    question: "What pricing models do you offer for SaaS MVP development?",
    answer:
      "We offer transparent fixed-price sprints starting at $3,500 (or ₹1,75,000) for standard 4-week MVP deliverables. Milestone payments are typically divided into 3 equal tranches: kickoff, feature freeze/staging review, and final production handover.",
  },
];

export default function SaasMvpIndiaPage() {
  const serviceData = serviceSchema({
    name: "SaaS MVP Development India",
    slug: "saas-mvp-development-india",
    serviceType: "SaaS MVP Engineering",
    description:
      "Rapid 4-to-6 week SaaS MVP development in India. Production-ready web applications, Stripe billing, authentication, and full intellectual property transfer.",
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
          { name: "SaaS MVP Development India", path: "/services/saas-mvp-development-india" },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B1F3A] pt-28 pb-20 text-white lg:pt-36 lg:pb-28">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at 75% 25%, rgba(59,130,246,0.35) 0%, transparent 60%)",
          }}
        />

        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-200 backdrop-blur">
                <Rocket size={13} className="text-blue-300" />
                Rapid Venture Launchpad
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-blue-200/80 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Fixed 4-Week Milestone Delivery
              </span>
            </div>

            <h1 className="mb-6 font-[family-name:var(--font-heading)] text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              SaaS MVP Development Company in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-300">
                India
              </span>
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-blue-100/90 sm:text-xl font-normal">
              Turn your product concept into a revenue-generating SaaS in 4 to 6 weeks. Built on production-grade Next.js,
              PostgreSQL, and Stripe by India&apos;s senior full-stack engineering team. 100% code ownership.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
              >
                Book MVP Scoping Session
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                View Transparent Pricing
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4">
              <div>
                <span className="block font-mono text-2xl font-bold text-white">4 Weeks</span>
                <span className="text-xs text-blue-200/70">Concept to Launch</span>
              </div>
              <div>
                <span className="block font-mono text-2xl font-bold text-white">$3,500</span>
                <span className="text-xs text-blue-200/70">Fixed Sprint Starting</span>
              </div>
              <div>
                <span className="block font-mono text-2xl font-bold text-white">0%</span>
                <span className="text-xs text-blue-200/70">Equity or Rev-Share</span>
              </div>
              <div>
                <span className="block font-mono text-2xl font-bold text-white">100%</span>
                <span className="text-xs text-blue-200/70">IP &amp; Repo Transfer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Content */}
      <section className="border-b border-slate-200/80 bg-white py-16">
        <div className="section-container max-w-4xl">
          <div className="space-y-6 text-base leading-relaxed text-slate-700 sm:text-lg">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-slate-900 sm:text-3xl">
              Why 90% of First-Time SaaS Founders Get Bogged Down
            </h2>
            <p>
              Most early-stage software founders spend months debating database schemas, testing unstable no-code tools,
              or managing offshore freelancer marketplaces with unpredictable results. By the time their product reaches
              the market, their runway is depleted, and the opportunity has shifted.
            </p>
            <p>
              LIMINIQ delivers a different model: disciplined, sprint-based engineering led by senior architects in India.
              We treat your MVP not as a disposable prototype, but as the foundational architecture of your long-term business.
              With automated testing, clean modular code, and integrated payments, you launch with confidence and begin
              onboarding paying subscribers from week four.
            </p>
          </div>
        </div>
      </section>

      {/* MVP Pillars */}
      <section className="py-20 bg-slate-50">
        <div className="section-container">
          <div className="mb-14 max-w-2xl">
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              Founder Advantage
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Everything Your SaaS Needs to Accept First Payments
            </h2>
            <p className="mt-3 text-base text-slate-600">
              No missing pieces. Every core operational capability is built, tested, and configured before handover.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MVP_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={24} />
                  </div>
                  <h3 className="mb-2 font-[family-name:var(--font-heading)] text-lg font-bold text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4-Week Sprint Schedule */}
      <section className="border-y border-slate-200 bg-white py-20">
        <div className="section-container">
          <div className="mb-14 max-w-2xl">
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              Sprint Roadmap
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-slate-900 sm:text-4xl">
              The 4-Week Production Sprint Schedule
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Disciplined weekly milestones with live staging demonstrations at every step.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl">
            {SPRINT_PHASES.map((phase) => (
              <div
                key={phase.week}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition hover:bg-slate-50"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xl font-extrabold text-blue-600 shrink-0">{phase.week}</span>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-slate-900 sm:text-lg">
                      {phase.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 max-w-2xl">{phase.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-linking to Services & Case Studies */}
      <section className="py-20 bg-slate-50">
        <div className="section-container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                Next Steps
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Scale Your SaaS With Embedded Engineering Pods
              </h2>
              <div className="mt-6 space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Once your MVP is live and gathering real user traction, our engineering pods can transition into
                  continuous product development. We help you build multi-tenant analytics, advanced user permissions,
                  and AI workflow automations on rolling monthly milestones.
                </p>
                <p>
                  Review our flagship case study, <strong>LeadFlow AI</strong>, to see how we engineered an enterprise lead
                  routing SaaS platform from scratch to production in just 6 weeks.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="mb-4 font-[family-name:var(--font-heading)] text-xl font-bold text-slate-900">
                Explore Core Services &amp; Case Studies
              </h3>
              <div className="space-y-3">
                <Link
                  href="/services/custom-software-saas"
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-400 hover:bg-blue-50/50"
                >
                  <span className="font-semibold text-slate-900 text-sm">Custom Software &amp; SaaS Systems</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>
                <Link
                  href="/services/ai-automation"
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-400 hover:bg-blue-50/50"
                >
                  <span className="font-semibold text-slate-900 text-sm">AI Automation &amp; Agents</span>
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
                  href="/pricing"
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-400 hover:bg-blue-50/50"
                >
                  <span className="font-semibold text-slate-900 text-sm">Transparent Pricing &amp; Sprints</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200 bg-white py-20">
        <div className="section-container max-w-4xl">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              FAQ
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Frequently Asked Questions About SaaS MVP Development in India
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

