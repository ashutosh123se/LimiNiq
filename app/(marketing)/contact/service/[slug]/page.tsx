import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactPage } from "@/components/sections/ContactPage";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  CONTACT_SERVICE_SLUG_MAP,
  CONTACT_SERVICE_SLUGS,
  isContactServiceSlug,
} from "@/lib/contactServices";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CONTACT_SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isContactServiceSlug(slug)) {
    return buildPageMetadata({
      title: "Contact Us",
      description: "Get in touch with LIMINIQ.",
      path: "/contact",
    });
  }

  const serviceName = CONTACT_SERVICE_SLUG_MAP[slug];
  return buildPageMetadata({
    title: `Contact — ${serviceName}`,
    description: `Request a quote for ${serviceName} from LIMINIQ. Free discovery call and tailored proposal within 24 hours.`,
    path: `/contact/service/${slug}`,
  });
}

export default async function ContactServicePage({ params }: Props) {
  const { slug } = await params;
  if (!isContactServiceSlug(slug)) notFound();
  return <ContactPage initialServiceSlug={slug} />;
}
