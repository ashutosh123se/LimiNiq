"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { hasAnalyticsConsent } from "@/components/layout/CookieBar";

export function CookieGatedAnalytics() {
  const [allow, setAllow] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    setAllow(hasAnalyticsConsent());
    const onConsent = () => setAllow(hasAnalyticsConsent());
    window.addEventListener("liminiq:cookie-consent", onConsent);
    return () => window.removeEventListener("liminiq:cookie-consent", onConsent);
  }, []);

  if (!allow || !gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="lazyOnload" />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}
