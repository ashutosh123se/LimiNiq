import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Briefcase,
  Building2,
  Code2,
  Cpu,
  FileText,
  Globe,
  GraduationCap,
  HeartPulse,
  HelpCircle,
  Home,
  Landmark,
  Palette,
  PenTool,
  Rocket,
  ShoppingBag,
  Smartphone,
  Sparkles,
  TrendingUp,
  UtensilsCrossed,
} from "lucide-react";

/**
 * Maps `icon` string names (as stored in @/data/*) to their lucide-react
 * component. Keeps data files framework-agnostic (serializable strings)
 * while views resolve the actual React component on demand.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  BarChart3,
  Briefcase,
  Building2,
  Code2,
  Cpu,
  FileText,
  Globe,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  Palette,
  PenTool,
  Rocket,
  ShoppingBag,
  Smartphone,
  Sparkles,
  TrendingUp,
  UtensilsCrossed,
};

/** Fallback icon used when a name isn't found in the map. */
export const DEFAULT_ICON: LucideIcon = HelpCircle;

/** Resolve a lucide icon string name (e.g. "Code2") to its component. */
export function getIcon(name?: string | null): LucideIcon {
  if (!name) return DEFAULT_ICON;
  return ICON_MAP[name] ?? DEFAULT_ICON;
}
