import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Tool } from "@/data/tools";
import { getServiceBySlug } from "@/data/services";

interface ToolShellProps {
  tool: Tool;
  children: ReactNode;
}

/** Consistent chrome around every /tools/[slug] page: breadcrumb, tool UI slot, and a related-service CTA. */
export function ToolShell({ tool, children }: ToolShellProps) {
  const relatedService = tool.relatedServiceSlug ? getServiceBySlug(tool.relatedServiceSlug) : null;

  return (
    <div className="tool-shell">
      <div className="section-container tool-shell-breadcrumb">
        <Link href="/tools" className="tool-shell-back">
          <ArrowLeft size={15} /> All Tools
        </Link>
        <span className="pill-badge">{tool.category}</span>
      </div>

      <div className="section-container" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
        {children}
      </div>

      <section className="tool-shell-cta-section">
        <div className="section-container">
          <div className="tool-shell-cta glass-card-premium">
            <div>
              <h3>Want this handled for you?</h3>
              <p>
                {relatedService
                  ? `Our ${relatedService.name} team can turn this into a real, implemented result — not just a snapshot.`
                  : "Talk to LIMINIQ and we'll help you act on what this tool just showed you."}
              </p>
            </div>
            <Link href={relatedService ? `/services/${relatedService.slug}` : "/contact"} className="btn-primary">
              Talk to LIMINIQ <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
