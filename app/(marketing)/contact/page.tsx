import type { Metadata } from "next";
import { ContactPage } from "@/components/sections/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with LIMINIQ for custom software, SaaS, web development, SEO, or digital marketing. Free discovery call — tailored quote within 24 hours.",
  alternates: { canonical: "https://liminiq.com/contact" },
};

export default function Contact() {
  return <ContactPage />;
}
