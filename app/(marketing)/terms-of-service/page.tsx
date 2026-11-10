import { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, type LegalSection } from "@/components/sections/legal/LegalLayout";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { SITE_CONTACT } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service | Commercial & Engineering Standards",
  description:
    "Standard commercial terms governing LIMINIQ client engagements, milestone billing, IP ownership, confidentiality, and warranties.",
  path: "/terms-of-service",
});

const SECTIONS: LegalSection[] = [
  { id: "acceptance-of-terms", title: "1. Acceptance of Terms" },
  { id: "client-engagements-msa", title: "2. Client Engagements, MSA & SOW" },
  { id: "intellectual-property", title: "3. 100% Code & IP Ownership" },
  { id: "milestone-billing", title: "4. Milestone Billing & Multi-Currency Terms" },
  { id: "acceptance-testing", title: "5. Milestone Acceptance & Review Window" },
  { id: "warranty-support", title: "6. Post-Launch Warranty & Maintenance SLAs" },
  { id: "confidentiality-nda", title: "7. Confidentiality & Mutual NDA" },
  { id: "limitation-of-liability", title: "8. Limitation of Liability" },
  { id: "governing-law", title: "9. Governing Law & Dispute Resolution" },
  { id: "contact-inquiries", title: "10. Legal Inquiries & Notices" },
];

export default function TermsOfServicePage() {
  return (
    <LegalLayout
      eyebrow="Legal & Commercial Terms"
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
        These Terms of Service govern your use of the website located at <code>liminiq.com</code>, our software demonstration environments, and commercial engineering engagements delivered by <strong>LIMINIQ</strong>.
      </p>

      <h2 id="acceptance-of-terms">1. Acceptance of Terms</h2>
      <p>
        By accessing our website, tools, or initiating a commercial technical discovery session, you agree to comply with these terms. For enterprise software development, SaaS builds, and AI automation retainers, the specific terms of your executed Master Services Agreement (MSA) and Statement of Work (SOW) supersede general website terms.
      </p>

      <h2 id="client-engagements-msa">2. Client Engagements, MSA & SOW</h2>
      <p>
        Every bespoke client delivery is governed by a legally binding Statement of Work (SOW) incorporating our standard Master Services Agreement (MSA). The SOW explicitly enumerates:
      </p>
      <ul>
        <li>Functional specifications and architecture requirements.</li>
        <li>Milestone deliverables, staging delivery deadlines, and test acceptance criteria.</li>
        <li>Fixed milestone investment figures or sprint pod monthly rates.</li>
        <li>Third-party API, hosting, and cloud infrastructure dependencies.</li>
      </ul>

      <h2 id="intellectual-property">3. 100% Code & IP Ownership</h2>
      <p>
        We operate on an absolute work-for-hire philosophy. <strong>Upon receipt of final milestone payment:</strong>
      </p>
      <ul>
        <li>
          <strong>100% Intellectual Property Rights:</strong> All source code, database schemas, custom LLM prompt architectures, trained agent weights, UI designs, and documentation transfer unencumbered to the client.
        </li>
        <li>
          <strong>Zero Vendor Lock-In:</strong> All repositories, cloud environments (AWS, Vercel, Supabase, Cloudflare), and deployment pipelines are registered directly under the client&apos;s accounts.
        </li>
        <li>
          <strong>Open Standards:</strong> We build using open-source, industry-standard stacks (TypeScript, Next.js, Python, PostgreSQL, Prisma) ensuring any senior engineering team can continue maintenance seamlessly.
        </li>
      </ul>

      <h2 id="milestone-billing">4. Milestone Billing & Multi-Currency Terms</h2>
      <p>
        To ensure total alignment and mitigate client risk, engagements are structured with milestone-gated billing:
      </p>
      <ul>
        <li>
          <strong>Standard Milestones:</strong> Typically 30% kickoff and architecture signoff, 40% functional staging build demo, and 30% final production deployment and code transfer.
        </li>
        <li>
          <strong>Multi-Currency Settlement:</strong> Invoices are issued in USD, GBP, EUR, AUD, CAD, or INR. Payments are settled via Wise, Stripe, international bank wire (SWIFT, ACH, SEPA), or PayPal.
        </li>
        <li>
          <strong>Dedicated Sprint Pods:</strong> Invoiced on a predictable monthly rolling cycle, cancelable with 14 calendar days&apos; written notice.
        </li>
      </ul>

      <h2 id="acceptance-testing">5. Milestone Acceptance & Review Window</h2>
      <p>
        Upon staging release of any milestone, the client is granted a <strong>10-business-day inspection window</strong> to review deliverables against the agreed acceptance criteria. Any functional defects or divergences from the SOW reported within this window are remediated at zero additional cost prior to milestone signoff.
      </p>

      <h2 id="warranty-support">6. Post-Launch Warranty & Maintenance SLAs</h2>
      <p>
        We stand firmly behind our engineering quality:
      </p>
      <ul>
        <li>
          <strong>30–60 Day Production Warranty:</strong> Every custom software engagement includes an explicit warranty covering bug fixes and regression remediation at no charge.
        </li>
        <li>
          <strong>Retainer & SLA Options:</strong> For mission-critical production systems, we provide ongoing maintenance retainers with guaranteed 4-hour SLA responses for Sev-1 blockers.
        </li>
      </ul>

      <h2 id="confidentiality-nda">7. Confidentiality & Mutual NDA</h2>
      <p>
        We treat all client concepts, proprietary data, customer lists, and system architectures as strictly confidential. Prior to reviewing sensitive technical specifications, we execute our standard mutual Non-Disclosure Agreement (NDA) or gladly sign the client&apos;s institutional NDA.
      </p>

      <h2 id="limitation-of-liability">8. Limitation of Liability</h2>
      <p>
        Except in cases of gross negligence, willful misconduct, or breach of confidentiality obligations, neither party shall be liable for indirect, incidental, or consequential damages. LIMINIQ&apos;s aggregate liability under any engagement shall not exceed the total fees paid by the client under the applicable Statement of Work.
      </p>

      <h2 id="governing-law">9. Governing Law & Dispute Resolution</h2>
      <p>
        These terms and individual client contracts are governed by the commercial laws specified in the signed Master Services Agreement (typically the laws of the client&apos;s incorporation state/country, or Singapore International Arbitration Centre / Indian Commercial Courts as agreed by both parties).
      </p>

      <h2 id="contact-inquiries">10. Legal Inquiries & Notices</h2>
      <p>
        Formal legal notices or contractual inquiries should be submitted to:
      </p>
      <div style={{ marginTop: "1.5rem", padding: "1.5rem", borderRadius: "16px", background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
        <p style={{ margin: "0 0 0.5rem", fontWeight: 700 }}>LIMINIQ Legal Operations & Contracts</p>
        <p style={{ margin: "0 0 0.25rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Email: <a href="mailto:hello@liminiq.com" style={{ color: "var(--accent)" }}>hello@liminiq.com</a> (Attn: Legal & Contracts)
        </p>
        <p style={{ margin: "0 0 0.25rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Headquarters: {SITE_CONTACT.streetAddress}, {SITE_CONTACT.addressLocality} {SITE_CONTACT.postalCode}, India
        </p>
      </div>
    </LegalLayout>
  );
}
