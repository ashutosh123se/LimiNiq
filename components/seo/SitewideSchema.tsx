import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, localBusinessJsonLd } from "@/lib/seo/schema";

/** Sitewide structured data — separate scripts for Organization + LocalBusiness. */
export function SitewideSchema() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={localBusinessJsonLd()} />
    </>
  );
}
