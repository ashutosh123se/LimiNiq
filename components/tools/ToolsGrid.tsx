"use client";

import { useMemo, useState } from "react";
import {
  Braces,
  Calculator,
  ImageIcon,
  KeyRound,
  Palette,
  QrCode,
  Receipt,
  ScanSearch,
  Share2,
  Sparkles,
  Tag,
  Type,
  type LucideIcon,
} from "lucide-react";
import { ToolCard } from "@/components/tools/ToolCard";
import type { Tool } from "@/data/tools";
import { cn } from "@/lib/utils";

const TOOL_ICONS: Record<string, LucideIcon> = {
  "website-audit": ScanSearch,
  "roas-calculator": Calculator,
  "meta-tag-preview": Tag,
  "favicon-generator": ImageIcon,
  "invoice-generator": Receipt,
  "qr-generator": QrCode,
  "json-formatter": Braces,
  "business-name-generator": Sparkles,
  "og-preview": Share2,
  "password-generator": KeyRound,
  "word-counter": Type,
  "color-palette-extractor": Palette,
};

interface ToolsGridProps {
  tools: Tool[];
  categories: string[];
}

export function ToolsGrid({ tools, categories }: ToolsGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(
    () => (activeCategory ? tools.filter((tool) => tool.category === activeCategory) : tools),
    [tools, activeCategory]
  );

  return (
    <div>
      <div className="blog-chip-row" role="tablist" aria-label="Filter tools by category">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={cn("blog-chip", !activeCategory && "is-active")}
          aria-pressed={!activeCategory}
        >
          All Tools
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn("blog-chip", activeCategory === category && "is-active")}
            aria-pressed={activeCategory === category}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="tools-grid">
        {filtered.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} icon={TOOL_ICONS[tool.slug] ?? Sparkles} />
        ))}
      </div>

      <style>{`
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 1rem;
        }
        .tool-card {
          position: relative;
          padding: 1.75rem;
          border-radius: 20px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          min-height: 200px;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .tool-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-hover, var(--accent));
        }
        .tool-card-icon {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          background: var(--accent-muted);
          border: 1px solid var(--border-subtle);
          margin-bottom: 0.25rem;
        }
        .tool-card-title {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }
        .tool-card-copy {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
          flex: 1;
        }
        .tool-card-link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--accent);
        }
      `}</style>
    </div>
  );
}
