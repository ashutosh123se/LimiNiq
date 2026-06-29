import { HOME_SEO } from "@/lib/seo/homeMetadata";
import { SITE_CONTACT, SITE_NAME } from "@/lib/site";

/** Crawlable homepage summary — in DOM for bots, visually hidden for users. */
export function HomeCrawlableIntro() {
  return (
    <section className="home-crawl-intro" aria-label={`About ${SITE_NAME}`}>
      <p>
        <strong>{SITE_NAME}</strong> is a custom software and SaaS development company in India,
        founded in {SITE_CONTACT.foundingYear}. We build web apps, mobile products, and enterprise
        systems — backed by SEO and digital marketing. 150+ projects delivered. 4.9 client rating.
        Based in {SITE_CONTACT.addressLocality}, {SITE_CONTACT.addressRegion}, serving clients globally.
        Contact: {SITE_CONTACT.phone} · {SITE_CONTACT.email}.
      </p>
      <p>{HOME_SEO.description}</p>
      <style>{`
        .home-crawl-intro {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </section>
  );
}
