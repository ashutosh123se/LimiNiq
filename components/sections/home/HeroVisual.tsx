"use client";

import dynamic from "next/dynamic";

const HeroBlueprint = dynamic(
  () => import("@/components/sections/home/HeroBlueprint").then((m) => m.HeroBlueprint),
  { ssr: false }
);

export function HeroVisual() {
  return <HeroBlueprint />;
}
