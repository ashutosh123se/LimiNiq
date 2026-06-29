import { Metadata } from "next";
import { AboutPageView } from "@/components/sections/about/AboutPageView";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet LIMINIQ — a software-led studio of engineers, designers, and growth strategists building custom products and data-driven marketing from India for global clients.",
  alternates: { canonical: "https://liminiq.com/about" },
};

export default function AboutPage() {
  return <AboutPageView />;
}
