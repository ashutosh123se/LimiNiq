"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(
  () => import("@/components/layout/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false }
);
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

/** Client-only chrome shared across marketing pages: cursor, consent, mobile CTA, chat, and ⌘K search. */
export function MarketingChrome() {
  return (
    <>
      <CustomCursor />
      <CookieBar />
      <StickyMobileCTA />
      <ChatWidget />
      <CommandPalette />
    </>
  );
}
