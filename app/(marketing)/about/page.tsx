import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  TrendingUp,
  ShieldCheck,
  UserCheck,
  MapPin,
  Quote,
  Building2,
  Globe2,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { LinkedInIcon } from "@/components/ui/SocialIcons";
import { PageHero } from "@/components/sections/PageHero";
import { InternationalWorkflow } from "@/components/sections/InternationalWorkflow";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { TEAM } from "@/data/team";
import { SITE_CONTACT, SITE_SOCIAL } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About Our Senior Engineering Team | LIMINIQ",
  description:
    "Meet LIMINIQ — an engineering-first software and AI automation studio based in Delhi, delivering custom software, SaaS architectures, and autonomous AI agents for global clients across the US, UK, Europe, and UAE.",
  path: "/about",
});

const MILESTONES = [
  {
    year: "2019",
    title: "Founded in Delhi",
    detail: "LIMINIQ begins as a boutique, engineering-first software studio focused on custom platforms and multi-tenant architectures.",
  },
  {
    year: "2021–2023",
    title: "Global Client Expansion",
    detail: "Expanded partnerships to international founders across North America and Europe with milestone-based delivery and live timezone overlap.",
  },
  {
    year: "Today",
    title: "AI Automation & Custom Software Core",
    detail: "150+ software, AI automation, and growth builds shipped. Senior architects directly leading every client engagement.",
  },
];

const VALUES = [
  {
    icon: Code2,
    title: "Clean Architecture",
    desc: "Strict TypeScript typing, modular database schemas, and exhaustive peer code reviews on every single sprint.",
  },
  {
    icon: TrendingUp,
    title: "Measurable Business ROI",
    desc: "We focus on operational metrics that matter: manual hours saved, conversion rates, and pipeline revenue, not vanity fluff.",
  },
  {
    icon: ShieldCheck,
    title: "100% Code & IP Ownership",
    desc: "You own all code, repositories, models, and cloud accounts upon milestone signoff. Zero vendor lock-in, guaranteed.",
  },
  {
    icon: UserCheck,
    title: "Senior-Only Delivery",
    desc: "You collaborate directly with the lead engineers writing your code — no bait-and-switch, no junior relay layers.",
  },
];

export default function AboutPage() {
  return (
    <div className="ab-page">
      <PageHero
        eyebrow="About LIMINIQ"
        title={
          <>
            Engineering-First Mindset.
            <br />
            <span className="text-gradient">Senior Delivery Velocity.</span>
          </>
        }
        description="We are a software-led studio of senior full-stack engineers and AI automation specialists based in Delhi, building high-impact systems for clients across North America, Europe, the Middle East, and Asia."
      >
        <Link href="/contact" className="btn-primary">
          Work with our team <ArrowRight size={16} />
        </Link>
        <a href="#team" className="btn-secondary">
          Meet the engineers
        </a>
      </PageHero>

      {/* Studio Story */}
      <section className="section-container ab-story">
        <div className="ab-story-icon glass-card">
          <Quote size={24} strokeWidth={1.6} />
        </div>
        <p className="ab-story-copy">
          LIMINIQ was founded in 2019 on a simple premise: traditional agency models are broken. They sell you with senior executives, then hand off your project to junior developers while marking up hours with layers of bureaucracy. We do the exact opposite — our clients work directly with senior architects who specify, code, test, and ship the product with 100% intellectual property transfer.
        </p>
      </section>

      {/* Timeline */}
      <section className="section-padding ab-timeline">
        <div className="section-container">
          <div className="ab-section-head">
            <span className="ab-kicker">Our trajectory</span>
            <h2 className="ab-headline">
              How we built our <span className="text-gradient">engineering standard</span>
            </h2>
          </div>
          <div className="ab-timeline-track">
            {MILESTONES.map((m) => (
              <div key={m.year} className="ab-milestone glass-card-premium">
                <span className="ab-milestone-year">{m.year}</span>
                <h3>{m.title}</h3>
                <p>{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding ab-values">
        <div className="section-container">
          <div className="ab-section-head">
            <span className="ab-kicker">The LIMINIQ Engineering Bar</span>
            <h2 className="ab-headline">
              What we never <span className="text-gradient">compromise on</span>
            </h2>
          </div>
          <div className="ab-values-grid">
            {VALUES.map((val) => (
              <div key={val.title} className="ab-value glass-card">
                <div className="ab-value-icon">
                  <val.icon size={20} strokeWidth={1.6} />
                </div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Engineering Team */}
      <section id="team" className="section-padding ab-team">
        <div className="section-container">
          <div className="ab-section-head ab-section-head--center">
            <span className="ab-kicker">Core Leadership</span>
            <h2 className="ab-headline">
              Senior Engineers & <span className="text-gradient">Strategists</span>
            </h2>
            <p className="ab-team-sub">
              Direct access to technical leads with verified industry experience. No intermediaries.
            </p>
          </div>
          <div className="ab-team-grid">
            {TEAM.map((member) => (
              <article key={member.name} className="ab-member glass-card-premium">
                <div className="ab-member-photo relative">
                  <Image
                    src={member.photoSrc}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 mt-2">
                  <h3>{member.name}</h3>
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${member.name} on LinkedIn`}
                      className="text-text-muted hover:text-[var(--accent)] transition-colors"
                    >
                      <LinkedInIcon className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <span className="ab-member-role">{member.role}</span>
                <span className="inline-block font-mono text-[11px] font-semibold text-[var(--signal)] mb-2">
                  {member.experience}
                </span>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {member.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="rounded-full bg-white/5 border border-[var(--border-subtle)] px-2 py-0.5 text-[10px] text-text-muted"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <p className="ab-member-bio">{member.bio}</p>
                <p className="ab-member-quote">&ldquo;{member.quote}&rdquo;</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* International Client Operations */}
      <InternationalWorkflow />

      {/* Corporate Registration & Physical Headquarters Details */}
      <section className="section-container my-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Corporate Entity Verification */}
          <div className="glass-card-premium p-7 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Building2 size={20} className="text-[var(--accent)]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-text-muted">
                  Corporate Verification & Governance
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-text-primary">
                Registered Commercial Entity
              </h3>
              <p className="mt-2 text-xs text-text-secondary leading-relaxed">
                Operating under standard commercial registrations and tax compliance:
              </p>

              <ul className="mt-4 flex flex-col gap-2 text-xs text-text-secondary">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={13} className="text-[var(--signal)] shrink-0 mt-0.5" />
                  <span><strong>Entity:</strong> [LEGAL_COMPANY_NAME: LIMINIQ TECHNOLOGIES]</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={13} className="text-[var(--signal)] shrink-0 mt-0.5" />
                  <span><strong>Tax / Registration ID:</strong> [LEGAL_REGISTRATION_NUMBER / GSTIN]</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={13} className="text-[var(--signal)] shrink-0 mt-0.5" />
                  <span><strong>Legal Contracts:</strong> Institutional US/UK/International MSAs & Mutual NDAs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={13} className="text-[var(--signal)] shrink-0 mt-0.5" />
                  <span><strong>Official Inquiries:</strong> {SITE_CONTACT.email}</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
              <span className="font-mono text-[11px] text-text-muted">
                D-U-N-S / Corporate verification details available for enterprise procurement upon request.
              </span>
            </div>
          </div>

          {/* Physical Engineering Office */}
          <div className="glass-card-premium p-7 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={20} className="text-[var(--signal)]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-text-muted">
                  Engineering Studio
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-text-primary">
                Delhi Engineering Studio
              </h3>
              <p className="mt-2 text-xs text-text-secondary leading-relaxed">
                {SITE_CONTACT.streetAddress}, {SITE_CONTACT.addressLocality} {SITE_CONTACT.postalCode}, India
              </p>

              <div className="mt-4 flex flex-col gap-2 text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <Globe2 size={13} className="text-[var(--accent)]" />
                  <span><strong>Synchronous Overlap:</strong> US East (EST), UK (GMT), Gulf (GST)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={13} className="text-[var(--accent)]" />
                  <span><strong>Studio Visits:</strong> By appointment for enterprise partners</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(SITE_CONTACT.mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs"
              >
                View on Google Maps <ArrowRight size={13} />
              </a>
              <Link href="/contact" className="btn-primary text-xs">
                Schedule Studio Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />

      <style>{`
        .ab-page {
          background: var(--bg-primary);
          overflow-x: clip;
        }
        .ab-story {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          padding-bottom: clamp(2rem, 4vw, 3rem);
        }
        .ab-story-icon {
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
        }
        .ab-story-copy {
          font-family: var(--font-heading);
          font-size: clamp(1.15rem, 2.5vw, 1.45rem);
          font-weight: 600;
          line-height: 1.6;
          color: var(--text-primary);
          margin: 0;
        }
        .ab-timeline {
          padding-top: 0;
        }
        .ab-section-head {
          margin-bottom: 2.5rem;
        }
        .ab-section-head--center {
          text-align: center;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .ab-kicker {
          display: inline-block;
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 0.4rem;
        }
        .ab-headline {
          font-family: var(--font-heading);
          font-size: clamp(1.85rem, 4vw, 2.75rem);
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.15;
          margin: 0;
        }
        .ab-timeline-track {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 768px) {
          .ab-timeline-track {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .ab-milestone {
          padding: 2rem 1.75rem;
          border-radius: 20px;
        }
        .ab-milestone-year {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 0.75rem;
        }
        .ab-milestone h3 {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 0.5rem;
        }
        .ab-milestone p {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }
        .ab-values {
          padding-top: 0;
        }
        .ab-values-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 640px) {
          .ab-values-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .ab-values-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .ab-value {
          padding: 1.75rem;
          border-radius: 20px;
        }
        .ab-value-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--accent-muted);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .ab-value h3 {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 0.5rem;
        }
        .ab-value p {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }
        .ab-team {
          padding-top: 0;
        }
        .ab-team-sub {
          font-size: 1rem;
          color: var(--text-secondary);
          margin-top: 0.75rem;
        }
        .ab-team-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-top: 2.5rem;
        }
        @media (min-width: 640px) {
          .ab-team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .ab-team-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .ab-member {
          padding: 1.5rem;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
        }
        .ab-member-photo {
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 1rem;
          background: #eff6ff;
        }
        .ab-member h3 {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }
        .ab-member-role {
          display: block;
          font-size: 0.82rem;
          color: var(--accent);
          font-weight: 600;
          margin: 0.15rem 0 0.25rem;
        }
        .ab-member-bio {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin: 0 0 0.75rem;
        }
        .ab-member-quote {
          font-size: 0.82rem;
          font-style: italic;
          color: var(--text-muted);
          line-height: 1.5;
          margin: auto 0 0;
          border-top: 1px solid var(--border-subtle);
          padding-top: 0.75rem;
        }
      `}</style>
    </div>
  );
}
