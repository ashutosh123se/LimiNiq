import { SITE_CONTACT, SITE_NAME } from "@/lib/site";

/** Server-rendered NAP block — visible phone & address for local SEO crawlers. */
export function SiteNap() {
  return (
    <div className="site-nap" itemScope itemType="https://schema.org/LocalBusiness">
      <meta itemProp="name" content={SITE_NAME} />
      <p className="site-nap-text">
        <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <span itemProp="streetAddress">{SITE_CONTACT.streetAddress}</span>,{" "}
          <span itemProp="addressLocality">{SITE_CONTACT.addressLocality}</span>,{" "}
          <span itemProp="addressRegion">{SITE_CONTACT.addressRegion}</span>{" "}
          <span itemProp="postalCode">{SITE_CONTACT.postalCode}</span>,{" "}
          <span itemProp="addressCountry">India</span>
        </span>
        {" · "}
        Phone: <a href={`tel:${SITE_CONTACT.phoneTel}`} itemProp="telephone">{SITE_CONTACT.phone}</a>
        {" · "}
        Email: <a href={`mailto:${SITE_CONTACT.email}`} itemProp="email">{SITE_CONTACT.email}</a>
      </p>
      <style>{`
        .site-nap {
          border-top: 1px solid rgba(255,255,255,0.06);
          background: rgba(0,0,0,0.25);
          padding: 0.65rem 0;
        }
        .site-nap-text {
          margin: 0;
          max-width: var(--container-max, 1200px);
          margin-inline: auto;
          padding: 0 1.25rem;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          line-height: 1.5;
          color: rgba(255,255,255,0.45);
          text-align: center;
        }
        .site-nap-text a {
          color: rgba(255,255,255,0.65);
          text-decoration: none;
        }
        .site-nap-text a:hover {
          color: #fff;
        }
      `}</style>
    </div>
  );
}
