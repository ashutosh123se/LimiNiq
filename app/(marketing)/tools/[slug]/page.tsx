import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolShell } from "@/components/tools/ToolShell";
import { TOOL_COMPONENTS } from "@/components/tools/registry";
import { TOOLS, getToolBySlug } from "@/data/tools";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool Not Found" };

  return buildPageMetadata({
    title: tool.name,
    description: tool.description,
    path: `/tools/${slug}`,
  });
}

export default async function ToolPage({ params }: { params: Params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  const ToolComponent = TOOL_COMPONENTS[slug];
  if (!tool || !ToolComponent) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: tool.name, path: `/tools/${slug}` },
        ])}
      />
      <ToolShell tool={tool}>
        <ToolComponent />
      </ToolShell>
    </>
  );
}
