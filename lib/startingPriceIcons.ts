import { Code2, Globe, TrendingUp, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const STARTING_PRICE_ICONS: Record<string, LucideIcon> = {
  Code2,
  Globe,
  TrendingUp,
  BarChart3,
};

export function getStartingPriceIcon(key: string): LucideIcon {
  return STARTING_PRICE_ICONS[key] ?? Code2;
}
