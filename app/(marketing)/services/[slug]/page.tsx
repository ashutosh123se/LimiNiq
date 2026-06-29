import { notFound } from "next/navigation";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicePageView } from "@/components/sections/services/ServicePageView";
import { SERVICES } from "@/lib/data/services";
import { getServiceExtension } from "@/lib/data/serviceExtensions";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const extension = getServiceExtension(slug);

  if (!service) return { title: "Service Not Found" };

  return buildPageMetadata({
    title: extension?.metaTitle ?? service.title,
    description: extension?.metaDescription ?? service.subtitle,
    path: `/services/${slug}`,
    keywords: extension?.metaKeywords,
  });
}

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const extension = getServiceExtension(slug);

  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: service.title,
          slug,
          serviceType: extension?.serviceType ?? service.title,
          description: extension?.metaDescription ?? service.subtitle,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.shortTitle, path: `/services/${slug}` },
        ])}
      />
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
