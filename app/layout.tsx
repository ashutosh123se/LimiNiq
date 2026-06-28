import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { SocialProofToast } from "@/components/layout/SocialProofToast";
import { SmoothScrollProvider } from "@/app/providers/SmoothScrollProvider";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const syne = Syne({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  metadataBase: new URL("https://liminiq.com"),
  title: {
    default: "LIMINIQ — Custom Software, SaaS & Enterprise Development Company in India",
    template: "%s | LIMINIQ",
  },
  description:
    "LIMINIQ builds custom software, SaaS platforms, and enterprise systems for growing businesses — and drives their growth with data-backed SEO and digital marketing. 150+ projects delivered, 4.9/5 rated.",
  keywords: [
    "custom software development company India",
    "enterprise software development company",
    "SaaS development company India",
    "SEO agency India",
    "digital marketing agency India",
    "software development agency",
    "ERP CRM development India",
  ],
  authors: [{ name: "LIMINIQ", url: "https://liminiq.com" }],
  creator: "LIMINIQ",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://liminiq.com",
    siteName: "LIMINIQ",
    title: "LIMINIQ — Custom Software, SaaS & Enterprise Development Company in India",
    description:
      "Next-gen software & SaaS development company — backed by data-driven SEO and marketing. High-performance websites, precision SEO, and data-backed digital marketing.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "LIMINIQ Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@liminiq",
    creator: "@liminiq",
    title: "LIMINIQ — Custom Software, SaaS & Enterprise Development Company in India",
    description:
      "Next-gen software & SaaS development company — backed by data-driven SEO and marketing. High-performance websites, precision SEO, and data-backed digital marketing.",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "https://liminiq.com" },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
  },
  icons: {
    icon: "/images/logo-clean.png",
    shortcut: "/images/logo-clean.png",
    apple: "/images/logo-clean.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "LIMINIQ",
              url: "https://liminiq.com",
              logo: "https://liminiq.com/images/logo-clean.png",
              description:
                "Custom software, SaaS, and enterprise development company also offering SEO and digital marketing services.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91 9431471654",
                contactType: "customer service",
                availableLanguage: "English",
              },
              sameAs: [
                "https://www.linkedin.com/company/124623896",
                "https://www.instagram.com/liminiq_com",
                "https://twitter.com/liminiq",
                "https://github.com/liminiq",
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} ${syne.variable}`}>
        <SmoothScrollProvider>
          <Providers>
            <LoadingScreen />
            <CustomCursor />
            <SocialProofToast />
            {children}
          </Providers>
        </SmoothScrollProvider>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
