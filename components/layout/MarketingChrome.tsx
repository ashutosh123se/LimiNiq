"use client";

import dynamic from "next/dynamic";

const CookieBar = dynamic(
  () => import("@/components/layout/CookieBar").then((m) => m.CookieBar),
  { ssr: false }
);
const StickyMobileCTA = dynamic(
  () => import("@/components/layout/StickyMobileCTA").then((m) => m.StickyMobileCTA),
  { ssr: false }
);
const ChatWidget = dynamic(
  () => import("@/components/layout/ChatWidget").then((m) => m.ChatWidget),
  { ssr: false }
);
const CommandPalette = dynamic(
  () => import("@/components/layout/CommandPalette").then((m) => m.CommandPalette),
  { ssr: false }
);

/**
 * Custom cursor removed — mousemove + MutationObserver rebinding every DOM change
 * caused heavy desktop jank. Native cursor is fine.
 */
export function MarketingChrome() {
  return (
    <>
      <CookieBar />
      <StickyMobileCTA />
      <ChatWidget />
      <CommandPalette />
    </>
  );
}
