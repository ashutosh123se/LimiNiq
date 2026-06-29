import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Syne } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { SocialProofToast } from "@/components/layout/SocialProofToast";
import { SmoothScrollProvider } from "@/app/providers/SmoothScrollProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { ClientErrorBoundary } from "@/components/ui/ClientErrorBoundary";
import { organizationSchema } from "@/lib/seo/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { HOME_SEO } from "@/lib/seo/homeMetadata";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const syne = Syne({ subsets: ["latin"], variable: "--font-heading" });

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
    icon: [{ url: '/icon', type: 'image/png', sizes: '48x48' }],
    shortcut: [{ url: '/icon', type: 'image/png', sizes: '48x48' }],
    apple: [{ url: '/apple-icon', type: 'image/png', sizes: '180x180' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} ${syne.variable}`}>
        <JsonLd data={organizationSchema()} />
        <SmoothScrollProvider>
          <Providers>
            <ClientErrorBoundary>
              <LoadingScreen />
            </ClientErrorBoundary>
            <ClientErrorBoundary>
              <CustomCursor />
            </ClientErrorBoundary>
            <ClientErrorBoundary>
              <SocialProofToast />
            </ClientErrorBoundary>
            {children}
          </Providers>
        </SmoothScrollProvider>
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
