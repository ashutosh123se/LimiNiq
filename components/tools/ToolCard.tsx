import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Tool } from "@/data/tools";

interface ToolCardProps {
  tool: Tool;
  icon: LucideIcon;
}

export function ToolCard({ tool, icon: Icon }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`} className="tool-card glass-card-premium">
      <div className="tool-card-icon">
        <Icon size={22} strokeWidth={1.6} />
      </div>
      <h3 className="tool-card-title">{tool.name}</h3>
      <p className="tool-card-copy">{tool.description}</p>
      <span className="tool-card-link">
        Try it free <ArrowUpRight size={14} />
      </span>
    </Link>
  );
}
