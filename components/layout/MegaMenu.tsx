"use client";

import { useState } from "react";
import { MEGA_MENU } from "@/data/navigation";
import { FlyoutRow, FlyoutShell, type FlyoutRowItem } from "./FlyoutShell";

/** Shorten long service names for clearer scanning — hrefs unchanged. */
function displayLabel(label: string) {
  return label
    .replace("Custom Software & SaaS Development", "Custom Software & SaaS")
    .replace("Website & E-commerce Development", "Website & E-commerce")
    .replace("SEO & Search Engine Marketing", "SEO & SEM")
    .replace("Content Creation & Copywriting", "Content & Copy")
    .replace("AI, Automation & Cloud Solutions", "AI, Automation & Cloud")
    .replace("UI/UX Design & Branding", "UI/UX & Branding")
    .replace("Graphic Design & Creative", "Graphic & Creative")
    .replace("Mobile App Development", "Mobile Apps")
    .replace("SaaS MVP Development", "SaaS MVP");
}

interface MegaMenuProps {
  onNavigate?: () => void;
  className?: string;
}

export function MegaMenu({ onNavigate, className }: MegaMenuProps) {
  const flat: FlyoutRowItem[] = MEGA_MENU.columns.flatMap((col) =>
    col.items.map((item) => ({
      label: displayLabel(item.label),
      href: item.href,
      description: col.title,
      icon: item.icon,
    }))
  );

  const [hoverKey, setHoverKey] = useState(
    flat[0] ? `${flat[0].href}-${flat[0].label}` : ""
  );
  const mid = Math.ceil(flat.length / 2);
  const left = flat.slice(0, mid);
  const right = flat.slice(mid);

  return (
    <FlyoutShell
      kicker="Services"
      title="Ten disciplines. One delivery team."
      footer={MEGA_MENU.footerCta}
      chip="150+ shipped"
      onNavigate={onNavigate}
      className={className}
    >
      <div className="grid gap-1 sm:grid-cols-2 sm:gap-2">
        <ul className="flex flex-col">
          {left.map((item, i) => {
            const key = `${item.href}-${item.label}`;
            return (
              <li key={`${key}-l`}>
                <FlyoutRow
                  item={item}
                  index={i}
                  onNavigate={onNavigate}
                  layoutId="flyout-mega"
                  active={hoverKey === key}
                  onHover={() => setHoverKey(key)}
                />
              </li>
            );
          })}
        </ul>
        <ul className="flex flex-col">
          {right.map((item, i) => {
            const key = `${item.href}-${item.label}`;
            return (
              <li key={`${key}-r`}>
                <FlyoutRow
                  item={item}
                  index={mid + i}
                  onNavigate={onNavigate}
                  layoutId="flyout-mega"
                  active={hoverKey === key}
                  onHover={() => setHoverKey(key)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </FlyoutShell>
  );
}
