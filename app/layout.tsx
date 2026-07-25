import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { SmoothScrollProvider } from "@/app/providers/SmoothScrollProvider";
import { SitewideSchema } from "@/components/seo/SitewideSchema";
import { CookieGatedAnalytics } from "@/components/layout/CookieGatedAnalytics";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { HOME_SEO } from "@/lib/seo/homeMetadata";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "700"],
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#05060A",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_SEO.title,
    template: "%s | LIMINIQ",
  },
  description: HOME_SEO.description,
  keywords: [
    "custom software development company India",
    "enterprise software development company",
    "SaaS development company India",
    "SEO agency India",
    "digital marketing agency India",
    "software development agency",
    "ERP CRM development India",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
  },
  icons: {
    icon: [{ url: "/icon", type: "image/png", sizes: "48x48" }],
    shortcut: [{ url: "/icon", type: "image/png", sizes: "48x48" }],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <SitewideSchema />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      >
        <SmoothScrollProvider>
          <Providers>{children}</Providers>
        </SmoothScrollProvider>
        <CookieGatedAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
