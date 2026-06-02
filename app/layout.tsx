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
    default: "LIMINIQ — Website Development, SEO & Digital Marketing Agency",
    template: "%s | LIMINIQ",
  },
  description:
    "LIMINIQ is a next-gen software development agency that builds high-performance websites, drives organic growth through precision SEO, and executes data-backed digital marketing strategies for ambitious brands.",
  keywords: [
    "web development agency",
    "SEO agency India",
    "digital marketing agency",
    "next.js development",
    "website development",
    "seo services",
    "ppc advertising",
    "ecommerce development",
    "liminiq",
  ],
  authors: [{ name: "LIMINIQ", url: "https://liminiq.com" }],
  creator: "LIMINIQ",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://liminiq.com",
    siteName: "LIMINIQ",
    title: "LIMINIQ — Website Development, SEO & Digital Marketing Agency",
    description:
      "Next-gen software development agency. High-performance websites, precision SEO, and data-backed digital marketing.",
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
    title: "LIMINIQ — Website Development, SEO & Digital Marketing Agency",
    description:
      "Next-gen software development agency. High-performance websites, precision SEO, and data-backed digital marketing.",
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
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91 9431471654",
                contactType: "customer service",
                availableLanguage: "English",
              },
              sameAs: [
                "https://linkedin.com/company/liminiq",
                "https://twitter.com/liminiq",
                "https://instagram.com/liminiq",
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
