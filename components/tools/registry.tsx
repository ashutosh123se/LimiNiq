import type { ComponentType } from "react";
import { WebsiteAuditTool } from "@/components/tools/WebsiteAuditTool";
import { RoasCalculator } from "@/components/tools/RoasCalculator";
import { MetaTagPreview } from "@/components/tools/MetaTagPreview";
import { FaviconGenerator } from "@/components/tools/FaviconGenerator";
import { InvoiceGenerator } from "@/components/tools/InvoiceGenerator";
import { QrGenerator } from "@/components/tools/QrGenerator";
import { JsonFormatter } from "@/components/tools/JsonFormatter";
import { BusinessNameGenerator } from "@/components/tools/BusinessNameGenerator";
import { OgPreview } from "@/components/tools/OgPreview";
import { PasswordGenerator } from "@/components/tools/PasswordGenerator";
import { WordCounter } from "@/components/tools/WordCounter";
import { ColorPaletteExtractor } from "@/components/tools/ColorPaletteExtractor";

/** Maps each @/data/tools slug to the client component that renders its interactive UI. */
export const TOOL_COMPONENTS: Record<string, ComponentType> = {
  "website-audit": WebsiteAuditTool,
  "roas-calculator": RoasCalculator,
  "meta-tag-preview": MetaTagPreview,
  "favicon-generator": FaviconGenerator,
  "invoice-generator": InvoiceGenerator,
  "qr-generator": QrGenerator,
  "json-formatter": JsonFormatter,
  "business-name-generator": BusinessNameGenerator,
  "og-preview": OgPreview,
  "password-generator": PasswordGenerator,
  "word-counter": WordCounter,
  "color-palette-extractor": ColorPaletteExtractor,
};
