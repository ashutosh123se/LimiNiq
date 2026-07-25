import { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, type LegalSection } from "@/components/sections/legal/LegalLayout";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description: "Terms and conditions governing use of the LIMINIQ website, services, and client engagements.",
  path: "/terms-of-service",
});

const SECTIONS: LegalSection[] = [
  { id: "acceptance-of-terms", title: "1. Acceptance of Terms" },
  { id: "intellectual-property-rights", title: "2. Intellectual Property Rights" },
  { id: "client-services-deliverables", title: "3. Client Services & Deliverables" },
  { id: "limitation-of-liability", title: "4. Limitation of Liability" },
  { id: "governing-law-jurisdiction", title: "5. Governing Law & Jurisdiction" },
];

export default function TermsOfServicePage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      accentColor="var(--accent-teal)"
      title={
        <>
          Terms of <span style={{ color: "var(--text-secondary)" }}>Service</span>
        </>
      }
      lastUpdated={new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      sections={SECTIONS}
    >
      <p>
        Welcome to LIMINIQ. These terms and conditions outline the rules and regulations for the use of
        LIMINIQ&apos;s Website, located at liminiq.com, and the digital services we provide.
      </p>

      <h2 id="acceptance-of-terms">1. Acceptance of Terms</h2>
      <p>
        By accessing this website we assume you accept these terms and conditions. Do not continue to use LIMINIQ if
        you do not agree to take all of the terms and conditions stated on this page.
      </p>

      <h2 id="intellectual-property-rights">2. Intellectual Property Rights</h2>
      <p>
        Unless otherwise stated, LIMINIQ and/or its licensors own the intellectual property rights for all material
        on LIMINIQ. All intellectual property rights are reserved. You may access this from LIMINIQ for your own
        personal use subjected to restrictions set in these terms and conditions.
      </p>
      <p>You must not:</p>
      <ul>
        <li>Republish material from LIMINIQ without permission</li>
        <li>Sell, rent or sub-license material from LIMINIQ</li>
        <li>Reproduce, duplicate or copy material from LIMINIQ</li>
        <li>Redistribute content from LIMINIQ</li>
      </ul>

      <h2 id="client-services-deliverables">3. Client Services & Deliverables</h2>
      <p>
        When engaging LIMINIQ for web development, marketing, or design services, specific terms regarding
        deliverables, timelines, and payment schedules will be outlined in a separate Master Services Agreement
        (MSA) or Statement of Work (SOW) provided to the client.
      </p>
      <p>In the event of a conflict between these general website terms and a signed MSA, the signed MSA shall take precedence.</p>

      <h2 id="limitation-of-liability">4. Limitation of Liability</h2>
      <p>
        In no event shall LIMINIQ, nor any of its officers, directors and employees, be held liable for anything
        arising out of or in any way connected with your use of this Website whether such liability is under
        contract. LIMINIQ, including its officers, directors and employees shall not be held liable for any
        indirect, consequential or special liability arising out of or in any way related to your use of this
        Website.
      </p>

      <h2 id="governing-law-jurisdiction">5. Governing Law & Jurisdiction</h2>
      <p>
        These Terms will be governed by and interpreted in accordance with the laws of the jurisdiction in which
        LIMINIQ operates, and you submit to the non-exclusive jurisdiction of the state and federal courts located
        therein for the resolution of any disputes.
      </p>

      <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <p style={{ marginBottom: "1rem" }}>If you have any questions regarding our Terms of Service, please contact us:</p>
        <Link href="mailto:hello@liminiq.com" className="btn-primary" style={{ display: "inline-flex" }}>
          hello@liminiq.com
        </Link>
      </div>
    </LegalLayout>
  );
}
