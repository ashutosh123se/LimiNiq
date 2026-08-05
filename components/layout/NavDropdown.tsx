"use client";

import { useState } from "react";
import type { NavDropdownItem } from "@/data/navigation";
import { FlyoutRow, FlyoutShell } from "./FlyoutShell";

interface NavDropdownProps {
  title?: string;
  items: NavDropdownItem[];
  footer?: { label: string; href: string };
  onNavigate?: () => void;
}

/** Compact flyout — same premium shell as Services mega. */
export function NavDropdown({ title, items, footer, onNavigate }: NavDropdownProps) {
  const [hoverKey, setHoverKey] = useState(items[0]?.href ?? "");
  const layoutId = `flyout-${title?.toLowerCase().replace(/\s+/g, "-") ?? "menu"}`;

  return (
    <FlyoutShell
      kicker={title ?? "Explore"}
      title={title ?? "Explore"}
      footer={footer}
      onNavigate={onNavigate}
      className="w-full"
    >
      <ul className="flex max-h-[min(70vh,440px)] flex-col overflow-y-auto">
        {items.map((item, i) => (
          <li key={`${item.href}-${item.label}`}>
            <FlyoutRow
              item={item}
              index={i}
              onNavigate={onNavigate}
              layoutId={layoutId}
              active={hoverKey === `${item.href}-${item.label}`}
              onHover={() => setHoverKey(`${item.href}-${item.label}`)}
            />
          </li>
        ))}
      </ul>
    </FlyoutShell>
  );
}
