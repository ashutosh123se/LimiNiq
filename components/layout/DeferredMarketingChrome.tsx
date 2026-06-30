"use client";

import dynamic from "next/dynamic";

const PageViewTracker = dynamic(
  () => import("@/components/tracking/PageViewTracker").then((m) => m.PageViewTracker),
  { ssr: false }
);
const FloatingContactBar = dynamic(
  () => import("@/components/layout/FloatingContactBar").then((m) => m.FloatingContactBar),
  { ssr: false }
);
const ExitIntentPopup = dynamic(
  () => import("@/components/layout/ExitIntentPopup").then((m) => m.ExitIntentPopup),
  { ssr: false }
);

export function DeferredMarketingChrome() {
  return (
    <>
      <PageViewTracker />
      <FloatingContactBar />
      <ExitIntentPopup />
    </>
  );
}
