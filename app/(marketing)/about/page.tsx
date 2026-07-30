import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2, TrendingUp, ShieldCheck, UserCheck, MapPin, Quote } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { TEAM } from "@/data/team";
import { SITE_CONTACT } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Meet LIMINIQ — founded in 2019 in Delhi, a software-led studio of engineers, designers, and growth strategists building custom products and data-driven marketing for clients across India.",
  path: "/about",
});

const MILESTONES = [
  {
    year: "2019",
    title: "Founded in Delhi",
    detail: "LIMINIQ starts as a lean, engineering-first studio building custom software for early-stage founders.",
  },
  {
    year: "2020–2023",
    title: "Full-stack delivery",
    detail: "Added web development and data-driven marketing as complementary disciplines, while custom software stayed the core.",
  },
  {
    year: "Today",
    title: "150+ projects, software-led",
    detail: "150+ projects delivered across software, web, and marketing — still a senior-only team, still software-led.",
  },
];

const VALUES = [
  {
    icon: Code2,
    title: "Code quality",
    desc: "Clean architecture, typed codebases, and code reviews on every project — not just the ones we show off.",
  },
  {
    icon: TrendingUp,
    title: "Measurable ROI",
    desc: "Every engagement ties back to a number that matters — pipeline, conversion, or revenue, not vanity metrics.",
  },
  {
    icon: ShieldCheck,
    title: "Transparency",
    desc: "Weekly progress, honest timelines, and pricing that's scoped up front — no surprise invoices.",
  },
  {
    icon: UserCheck,
    title: "Senior-only delivery",
    desc: "You work directly with the people building your product — no junior handoffs, no account-manager relay.",
  },
];

export default function AboutPage() {
  return (
    <div className="ab-page">
      <PageHero
        eyebrow="About LIMINIQ"
        title={
          <>
            Driven By Data.
            <br />
            <span className="text-gradient">Built By Builders.</span>
          </>
        }
        description="We're a software-led studio of engineers, designers, and growth strategists — based in Delhi, building for clients across India and beyond."
      >
        <Link href="/contact" className="btn-primary">
          Work with us
          <ArrowRight size={16} />
        </Link>
        <a href="#team" className="btn-secondary">
          Meet the team
        </a>
      </PageHero>

      <section className="section-container ab-story">
        <div className="ab-story-icon glass-card">
          <Quote size={24} strokeWidth={1.6} />
        </div>
        <p className="ab-story-copy">
          LIMINIQ was founded in 2019 in Delhi on a simple premise: most agencies treat software as an
          afterthought and marketing as guesswork. We build the opposite way — software-led, with web and
          growth marketing delivered by the same senior team that ships the product. That focus is why
          founders and operators keep coming back for their next build.
        </p>
      </section>

      <section className="section-padding ab-timeline">
        <div className="section-container">
          <div className="ab-section-head">
            <span className="ab-kicker">Our journey</span>
            <h2 className="ab-headline">
              How we got <span className="text-gradient">here</span>
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

      <section className="section-padding ab-values">
        <div className="section-container">
          <div className="ab-section-head">
            <span className="ab-kicker">What we won&apos;t compromise on</span>
            <h2 className="ab-headline">
              The <span className="text-gradient">LIMINIQ standard</span>
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

      <section id="team" className="section-padding ab-team">
        <div className="section-container">
          <div className="ab-section-head ab-section-head--center">
            <span className="ab-kicker">Leadership</span>
            <h2 className="ab-headline">
              The people <span className="text-gradient">behind the work</span>
            </h2>
            <p className="ab-team-sub">
              A small, senior team — engineers, strategists, and creatives who ship every project themselves.
            </p>
          </div>
          <div className="ab-team-grid">
            {TEAM.map((member) => (
              <article key={member.name} className="ab-member glass-card-premium">
                <div className="ab-member-photo">
                  <Image
                    src={member.photoSrc}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover object-top"
                  />
                </div>
                <h3>{member.name}</h3>
                <span className="ab-member-role">{member.role}</span>
                <p className="ab-member-bio">{member.bio}</p>
                <p className="ab-member-quote">&ldquo;{member.quote}&rdquo;</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container ab-office">
        <div className="ab-office-card glass-card-premium">
          <div className="ab-office-icon">
            <MapPin size={22} strokeWidth={1.6} />
          </div>
          <div>
            <span className="ab-kicker">Our office</span>
            <h3 className="ab-office-title">Paschim Vihar, Delhi</h3>
            <p className="ab-office-address">
              {SITE_CONTACT.streetAddress}, {SITE_CONTACT.addressLocality} {SITE_CONTACT.postalCode}
            </p>
          </div>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(SITE_CONTACT.mapsQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary ab-office-link"
          >
            Get directions
          </a>
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
          background: var(--accent-muted);
        }
        .ab-story-copy {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.8;
          max-width: 56rem;
          margin: 0.4rem 0 0;
        }
        .ab-kicker {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.65rem;
        }
        .ab-section-head { margin-bottom: 2.5rem; }
        .ab-section-head--center {
          text-align: center;
          max-width: 560px;
          margin-inline: auto;
        }
        .ab-headline {
          font-family: var(--font-heading);
          font-size: clamp(1.6rem, 3.4vw, 2.4rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin: 0;
        }
        .ab-team-sub {
          margin: 0.85rem 0 0;
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .ab-timeline { padding-top: 0; }
        .ab-timeline-track {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        .ab-milestone {
          position: relative;
          padding: 1.75rem;
          border-radius: 20px;
        }
        .ab-milestone-year {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent);
          padding: 0.35rem 0.65rem;
          border-radius: 8px;
          background: var(--accent-muted);
          border: 1px solid var(--border-subtle);
          margin-bottom: 0.9rem;
        }
        .ab-milestone h3 {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 0.5rem;
        }
        .ab-milestone p {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0;
        }

        .ab-values-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.85rem;
        }
        .ab-value {
          padding: 1.5rem;
          border-radius: 18px;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .ab-value:hover {
          transform: translateY(-3px);
          border-color: var(--border-hover);
        }
        .ab-value-icon {
          width: 46px; height: 46px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          color: var(--accent);
          background: var(--accent-muted);
        }
        .ab-value h3 {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 0.5rem;
        }
        .ab-value p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0;
        }

        .ab-team-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        .ab-member {
          padding: 0;
          border-radius: 22px;
          text-align: center;
          overflow: hidden;
        }
        .ab-member-photo {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          background: var(--accent-muted);
          margin-bottom: 0;
        }
        .ab-member h3 {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 1.1rem 1rem 0.3rem;
        }
        .ab-member-role {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.9rem;
          padding: 0 1rem;
        }
        .ab-member-bio {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0 0 1rem;
          padding: 0 1.25rem;
        }
        .ab-member-quote {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 0.85rem;
          color: var(--text-tertiary);
          line-height: 1.5;
          margin: 0;
          padding: 1rem 1.25rem 1.5rem;
          border-top: 1px dashed var(--border-subtle);
        }

        .ab-office {
          padding-bottom: clamp(3rem, 6vw, 5rem);
        }
        .ab-office-card {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1.5rem;
          padding: clamp(1.75rem, 3vw, 2.25rem);
          border-radius: 22px;
        }
        .ab-office-icon {
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          background: var(--accent-muted);
        }
        .ab-office-card > div {
          flex: 1;
          min-width: 200px;
        }
        .ab-office-title {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 0.35rem;
        }
        .ab-office-address {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }
        .ab-office-link {
          flex-shrink: 0;
        }

        @media (min-width: 700px) {
          .ab-values-grid { grid-template-columns: repeat(2, 1fr); }
          .ab-timeline-track { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 900px) {
          .ab-team-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </div>
  );
}
