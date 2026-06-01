import type { Metadata } from "next";
import { ContactPage } from "@/components/sections/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with LIMINIQ. Start your web development, SEO, or digital marketing project today. Free consultation available.",
  alternates: { canonical: "https://liminiq.com/contact" },
};

export default function Contact() {
  return <ContactPage />;
}
