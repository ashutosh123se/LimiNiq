"use client";

const LINE_1 = "SOFTWARE ENGINEERING • SAAS PRODUCT • CLOUD ARCHITECTURE • ";
const LINE_2 = "SEO STRATEGY • PERFORMANCE MARKETING • BRAND & DESIGN • ";

export function TextMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-[var(--border-subtle)] py-8 sm:py-10" aria-hidden>
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee-track">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="txm-fill mx-4 whitespace-nowrap font-heading font-black uppercase leading-none"
              >
                {LINE_1}
              </span>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee-track-reverse">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="txm-outline mx-4 whitespace-nowrap font-heading font-black uppercase leading-none"
              >
                {LINE_2}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .txm-fill,
        .txm-outline {
          font-size: clamp(2rem, 7vw, 4.5rem);
          letter-spacing: -0.02em;
        }
        .txm-fill {
          color: var(--text-primary);
        }
        .txm-outline {
          color: transparent;
          -webkit-text-stroke: 1.5px var(--border-strong);
        }
      `}</style>
    </section>
  );
}
