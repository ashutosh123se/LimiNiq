import { notFound } from "next/navigation";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicePageView } from "@/components/sections/services/ServicePageView";
import { SERVICES } from "@/lib/data/services";
import { getServiceExtension } from "@/lib/data/serviceExtensions";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const extension = getServiceExtension(slug);

  if (!service) return { title: "Service Not Found" };

  return {
    title: extension?.metaTitle ?? service.title,
    description: extension?.metaDescription ?? service.subtitle,
    keywords: extension?.metaKeywords,
    alternates: { canonical: `https://liminiq.com/services/${slug}` },
  };
}

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const extension = getServiceExtension(slug);

  if (!service) notFound();

  const serviceSchema = extension
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        serviceType: extension.serviceType,
        provider: {
          "@type": "Organization",
          name: "LIMINIQ",
          url: "https://liminiq.com",
        },
        description: extension.metaDescription,
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        url: `https://liminiq.com/services/${slug}`,
      }
    : null;

  return (
    <>
      {serviceSchema && <JsonLd data={serviceSchema} />}
      <ServicePageView
        service={{
          slug: service.slug,
          title: service.title,
          shortTitle: service.shortTitle,
          subtitle: service.subtitle,
          description: service.description,
          features: service.features,
          process: service.process,
          coverImage: service.coverImage,
          color: service.color,
        }}
        extension={
          extension
            ? {
                metaDescription: extension.metaDescription,
                expandedIntro: extension.expandedIntro,
                caseStudies: extension.caseStudies,
                techStack: extension.techStack,
                industries: extension.industries,
                faqs: extension.faqs,
                internalLinks: extension.internalLinks,
                seoForSaasNote: extension.seoForSaasNote,
              }
            : null
        }
      />
    </>
  );
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}
