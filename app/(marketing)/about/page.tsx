import { Metadata } from "next";
import { AboutPageView } from "@/components/sections/about/AboutPageView";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Meet LIMINIQ — founded in 2019, a software-led studio of engineers, designers, and growth strategists building custom products and data-driven marketing from India for global clients.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageView />;
}
