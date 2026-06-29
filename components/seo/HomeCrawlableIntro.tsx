import { HOME_SEO } from "@/lib/seo/homeMetadata";
import { SITE_CONTACT, SITE_NAME } from "@/lib/site";

/** Crawlable homepage summary — plain HTML for bots that skip heavy JS rendering. */
export function HomeCrawlableIntro() {
  return (
    <section className="home-crawl-intro" aria-label={`About ${SITE_NAME}`}>
      <div className="section-container">
        <p>
          <strong>{SITE_NAME}</strong> is a custom software and SaaS development company in India,
          founded in {SITE_CONTACT.foundingYear}. We build web apps, mobile products, and enterprise
          systems — backed by SEO and digital marketing. 150+ projects delivered. 4.9 client rating.
          Based in {SITE_CONTACT.addressLocality}, {SITE_CONTACT.addressRegion}, serving clients globally.
          Contact: {SITE_CONTACT.phone} · {SITE_CONTACT.email}.
        </p>
        <p className="home-crawl-intro-sub">{HOME_SEO.description}</p>
      </div>
      <style>{`
        .home-crawl-intro {
          padding: 1.25rem 0 0.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .home-crawl-intro p {
          margin: 0 0 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.88rem;
          line-height: 1.65;
          color: var(--text-secondary);
          max-width: 52rem;
        }
        .home-crawl-intro-sub {
          font-size: 0.82rem !important;
          color: var(--text-tertiary) !important;
        }
        @media (max-width: 768px) {
          .home-crawl-intro { display: none; }
        }
      `}</style>
    </section>
  );
}
