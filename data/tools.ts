export interface Tool {
  slug: string;
  name: string;
  category: "SEO & Marketing" | "Productivity" | "Generators" | "Text & Code" | "Image";
  description: string;
  relatedServiceSlug?: string;
}

export const TOOLS: Tool[] = [
  {
    slug: "website-audit",
    name: "Instant Website Audit",
    category: "SEO & Marketing",
    description: "Live snapshot across performance, SEO, mobile, security, and accessibility.",
    relatedServiceSlug: "seo-search-engine-marketing",
  },
  {
    slug: "roas-calculator",
    name: "ROAS Calculator",
    category: "SEO & Marketing",
    description: "Calculate return on ad spend and break-even ROAS for your campaigns.",
    relatedServiceSlug: "digital-marketing",
  },
  {
    slug: "meta-tag-preview",
    name: "SEO Meta Tag Previewer",
    category: "SEO & Marketing",
    description: "Preview Google SERP and Open Graph cards from title, description, and URL.",
    relatedServiceSlug: "seo-search-engine-marketing",
  },
  {
    slug: "favicon-generator",
    name: "Favicon Generator",
    category: "Image",
    description: "Upload an image and generate multi-size favicon guidance + preview.",
    relatedServiceSlug: "website-ecommerce",
  },
  {
    slug: "invoice-generator",
    name: "Invoice Generator",
    category: "Productivity",
    description: "Fill a simple form and download a styled PDF invoice.",
    relatedServiceSlug: "custom-software-saas",
  },
  {
    slug: "qr-generator",
    name: "QR Code Generator",
    category: "Generators",
    description: "Generate a QR code from any URL or text instantly.",
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter / Validator",
    category: "Text & Code",
    description: "Format, validate, and minify JSON in the browser.",
  },
  {
    slug: "business-name-generator",
    name: "Business Name Generator",
    category: "Generators",
    description: "Combinatorial name suggestions from your keywords.",
    relatedServiceSlug: "ui-ux-design-branding",
  },
  {
    slug: "og-preview",
    name: "Open Graph Preview Tool",
    category: "SEO & Marketing",
    description: "See how your link may appear when shared on social platforms.",
    relatedServiceSlug: "seo-search-engine-marketing",
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    category: "Generators",
    description: "Create strong random passwords with length and charset controls.",
  },
  {
    slug: "word-counter",
    name: "Word / Character Counter",
    category: "Text & Code",
    description: "Count words, characters, sentences, and reading time.",
    relatedServiceSlug: "content-creation",
  },
  {
    slug: "color-palette-extractor",
    name: "Color Palette Extractor",
    category: "Image",
    description: "Extract a color palette from an uploaded image.",
    relatedServiceSlug: "graphic-design-creative",
  },
];

export function getToolBySlug(slug: string) {
  return TOOLS.find((t) => t.slug === slug);
}
