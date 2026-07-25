import type { Metadata } from "next";
import { ContactPage } from "@/components/sections/ContactPage";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us",
  description:
    "Let's build something worth shipping. Get in touch with LIMINIQ for custom software, SaaS, web development, SEO, or digital marketing — tailored quote within 24 hours.",
  path: "/contact",
});

export default function Contact() {
  return <ContactPage />;
}
