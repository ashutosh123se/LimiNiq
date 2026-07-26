"use client";

import Link from "next/link";
import { ArrowUpRight, Circle } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { NavDropdownItem } from "@/data/navigation";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

function getIcon(name?: string): IconComponent {
  if (!name) return Circle;
  const icons = LucideIcons as unknown as Record<string, IconComponent>;
  return icons[name] ?? Circle;
}

interface NavDropdownProps {
  title?: string;
  items: NavDropdownItem[];
  footer?: { label: string; href: string };
  onNavigate?: () => void;
}

/** Compact flyout used by Work / Industries / Tools / About / Blog / Pricing. */
export function NavDropdown({ title, items, footer, onNavigate }: NavDropdownProps) {
  return (
    <div className="w-[340px] max-w-[92vw] overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
      {title && (
        <div className="border-b border-border-subtle px-5 py-3">
          <p className="font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
            {title}
          </p>
        </div>
      )}
      <ul className="flex max-h-[70vh] flex-col gap-0.5 overflow-y-auto p-2">
        {items.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <li key={`${item.href}-${item.label}`}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-accent/10 text-accent transition-transform group-hover:scale-105">
                  <Icon size={15} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-text-primary group-hover:text-accent">
                    {item.label}
                  </span>
                  {item.description && (
                    <span className="mt-0.5 block text-xs leading-snug text-text-muted">
                      {item.description}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      {footer && (
        <div className="border-t border-border-subtle px-5 py-3">
          <Link
            href={footer.href}
            onClick={onNavigate}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-opacity hover:opacity-80"
          >
            {footer.label}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
