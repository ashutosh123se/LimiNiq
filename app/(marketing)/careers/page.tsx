import type { Metadata } from "next";
import { Globe2, Layers, Sparkles, Clock3 } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CareersForm } from "@/components/sections/careers/CareersForm";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Careers",
  description:
    "LIMINIQ is a small, senior, remote-friendly studio. No open roles right now — send us your details and we'll reach out when there's a fit.",
  path: "/careers",
});

const CULTURE_POINTS = [
  {
    icon: Globe2,
    title: "Remote-friendly",
    desc: "Work from wherever you do your best work — we care about output, not hours logged at a desk.",
  },
  {
    icon: Layers,
    title: "Senior craft",
    desc: "Every hire ships production work from day one. No busywork, no bloated approval chains.",
  },
  {
    icon: Sparkles,
    title: "Real ownership",
    desc: "Small team, direct client exposure — you see your work go live and hear the feedback firsthand.",
  },
  {
    icon: Clock3,
    title: "Async-first",
    desc: "Deep work over back-to-back meetings. We write things down and respect focus time.",
  },
];

export default function CareersPage() {
  return (
    <div className="cr-page">
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Build <span className="text-gradient">with us.</span>
          </>
        }
        description="LIMINIQ is a small, senior, remote-friendly studio building software, web, and growth systems for clients across India. We hire slowly and only for craft."
      />

      <section className="section-container cr-culture">
        <div className="cr-culture-grid">
          {CULTURE_POINTS.map((point) => (
            <div key={point.title} className="cr-culture-card glass-card">
              <div className="cr-culture-icon">
                <point.icon size={20} strokeWidth={1.6} />
              </div>
              <h3>{point.title}</h3>
              <p>{point.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding cr-form-section">
        <div className="section-container">
          <div className="cr-no-roles">
            <span className="cr-kicker">Open roles</span>
            <h2 className="cr-headline">There are no open roles right now.</h2>
            <p>
              We hire in small batches, only when a project genuinely needs another senior builder. We're
              always interested in meeting exceptional engineers, designers, and marketers — leave your
              details below and we'll reach out the moment there's a fit.
            </p>
          </div>

          <CareersForm />
        </div>
      </section>

      <style>{`
        .cr-page {
          background: var(--bg-primary);
          overflow-x: clip;
        }
        .cr-culture {
          padding-bottom: clamp(2.5rem, 5vw, 4rem);
        }
        .cr-culture-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.85rem;
        }
        .cr-culture-card {
          padding: 1.5rem;
          border-radius: 18px;
        }
        .cr-culture-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          color: var(--accent);
          background: var(--accent-muted);
        }
        .cr-culture-card h3 {
          font-family: var(--font-heading);
          font-size: 1.02rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 0.5rem;
        }
        .cr-culture-card p {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }
        .cr-form-section {
          padding-top: 0;
        }
        .cr-no-roles {
          max-width: 640px;
          margin: 0 auto 2.5rem;
          text-align: center;
        }
        .cr-kicker {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--signal);
          margin-bottom: 0.75rem;
        }
        .cr-headline {
          font-family: var(--font-heading);
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin: 0 0 0.85rem;
        }
        .cr-no-roles p {
          font-size: 0.98rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0;
        }

        @media (min-width: 700px) {
          .cr-culture-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .cr-culture-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </div>
  );
}
