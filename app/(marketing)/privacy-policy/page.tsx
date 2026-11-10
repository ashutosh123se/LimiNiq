import { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, type LegalSection } from "@/components/sections/legal/LegalLayout";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { SITE_CONTACT } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | GDPR & CCPA Compliance",
  description:
    "How LIMINIQ collects, processes, protects, and retains your personal information in compliance with GDPR, UK GDPR, and CCPA/CPRA regulations.",
  path: "/privacy-policy",
});

const SECTIONS: LegalSection[] = [
  { id: "scope-overview", title: "1. Scope & Overview" },
  { id: "information-we-collect", title: "2. Information We Collect" },
  { id: "lawful-basis-processing", title: "3. Lawful Basis for Processing (GDPR / UK GDPR)" },
  { id: "how-we-use-information", title: "4. How We Use Your Data" },
  { id: "cookies-tracking", title: "5. Cookies, Analytics & Consent Mode" },
  { id: "data-retention", title: "6. Data Retention Schedules" },
  { id: "international-transfers", title: "7. International Data Transfers" },
  { id: "your-privacy-rights", title: "8. Your Rights (GDPR & CCPA/CPRA)" },
  { id: "security-safeguards", title: "9. Technical & Security Safeguards" },
  { id: "contact-data-requests", title: "10. Contact for Data Protection Requests" },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Legal & Compliance"
      title={
        <>
          Privacy <span style={{ color: "var(--text-secondary)" }}>Policy</span>
        </>
      }
      lastUpdated={new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      sections={SECTIONS}
    >
      <p>
        At <strong>LIMINIQ</strong> (&ldquo;LIMINIQ&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), we take the privacy and confidentiality of our website visitors, prospective partners, and international clients seriously. This Privacy Policy details our operational commitments under the European General Data Protection Regulation (<strong>GDPR</strong>), the <strong>UK GDPR</strong>, the California Consumer Privacy Act as amended by the California Privacy Rights Act (<strong>CCPA/CPRA</strong>), and applicable Indian data protection laws.
      </p>

      <h2 id="scope-overview">1. Scope & Overview</h2>
      <p>
        This policy applies to information gathered through <code>liminiq.com</code>, our interactive engineering tools (including the Website Audit Scanner, ROAS Calculator, and Favicon Generator), scheduling integrations, and direct commercial correspondence.
      </p>

      <h2 id="information-we-collect">2. Information We Collect</h2>
      <p>We collect data under two primary classifications:</p>
      <ul>
        <li>
          <strong>Information You Explicitly Provide:</strong> Name, work email address, phone number, company name, target project budget, architectural briefs, and URLs submitted into our Website Audit tool.
        </li>
        <li>
          <strong>Automated Technical Telemetry:</strong> Anonymized or pseudonymized IP addresses (processed via Cloudflare to resolve geographical region without storing raw identifiers), browser version, operating system, referring URL, time spent per route, and Core Web Vitals telemetry.
        </li>
      </ul>

      <h2 id="lawful-basis-processing">3. Lawful Basis for Processing (GDPR / UK GDPR)</h2>
      <p>We process personal data only when an established legal basis under Article 6 of the GDPR applies:</p>
      <ul>
        <li>
          <strong>Contractual Necessity (Art. 6(1)(b)):</strong> To prepare technical discovery proposals, execute Master Services Agreements (MSAs), fulfill Statements of Work (SOW), and deliver software milestones.
        </li>
        <li>
          <strong>Consent (Art. 6(1)(a)):</strong> For non-essential cookies, technical audit PDF reports delivered via email, and subscription to engineering newsletters. You may revoke consent at any time.
        </li>
        <li>
          <strong>Legitimate Interests (Art. 6(1)(f)):</strong> To secure our infrastructure against DDoS attacks, brute-force exploits, SSRF attempts, and bot spam, as well as to improve application performance.
        </li>
      </ul>

      <h2 id="how-we-use-information">4. How We Use Your Data</h2>
      <p>Your data is processed strictly for legitimate engineering and commercial operations:</p>
      <ul>
        <li>Evaluating technical feasibility and providing milestone quotes.</li>
        <li>Generating and delivering automated website audit and security reports.</li>
        <li>Coordinating live discovery sessions across US, UK, European, and Gulf time zones.</li>
        <li>Detecting, preventing, and mitigating security threats and unauthorized access.</li>
        <li><strong>We do not sell, rent, trade, or monetize your personal data. Ever.</strong></li>
      </ul>

      <h2 id="cookies-tracking">5. Cookies, Analytics & Consent Mode</h2>
      <p>
        We employ Google Consent Mode v2 and granular local consent flags. We categorize cookies into:
      </p>
      <ul>
        <li>
          <strong>Strictly Necessary:</strong> Essential for CSRF token validation, security session maintenance, and rate-limiting. These cannot be disabled.
        </li>
        <li>
          <strong>Analytics & Performance:</strong> Aggregated, privacy-respecting metrics (PageSpeed, bounce rates). Loaded strictly upon affirmative consent.
        </li>
        <li>
          <strong>Marketing Signals:</strong> Conversion tracking pixels (Google Ads, Meta). Only activated if you select &ldquo;Accept All&rdquo; in our cookie preferences dialog.
        </li>
      </ul>

      <h2 id="data-retention">6. Data Retention Schedules</h2>
      <p>
        We retain personal data only for as long as necessary to fulfill the purposes outlined herein:
      </p>
      <ul>
        <li>
          <strong>Inquiries & Briefs:</strong> Kept for up to 24 months to support prospective project scoping, after which records are purged or anonymized.
        </li>
        <li>
          <strong>Client Engagement Data:</strong> Governed by our signed Master Services Agreement (MSA) and Mutual NDA. Code repositories, staging databases, and production credentials are transferred or purged upon contract conclusion.
        </li>
        <li>
          <strong>Website Audit Scans:</strong> Cached in memory for rate-limiting purposes and purged within 24 hours.
        </li>
      </ul>

      <h2 id="international-transfers">7. International Data Transfers</h2>
      <p>
        As a global software engineering partner, we collaborate with clients in North America, Europe, Australia, and the Middle East. Where data is transferred across international borders, we implement Standard Contractual Clauses (SCCs) approved by the European Commission, UK International Data Transfer Agreements (IDTAs), and robust cryptographic encryption (TLS 1.3 in transit, AES-256 at rest).
      </p>

      <h2 id="your-privacy-rights">8. Your Rights (GDPR & CCPA/CPRA)</h2>
      <p>Depending on your jurisdiction, you have enforceable statutory rights regarding your personal data:</p>
      <ul>
        <li><strong>Right to Access & Portability:</strong> Request a machine-readable export of all data we maintain about you.</li>
        <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete records.</li>
        <li><strong>Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> Request immediate deletion of your personal records from our databases.</li>
        <li><strong>Right to Restrict or Object to Processing:</strong> Opt out of analytical processing or marketing communications.</li>
        <li><strong>Non-Discrimination (CCPA):</strong> We never deny services, charge different prices, or alter service quality for exercising your statutory privacy rights.</li>
      </ul>

      <h2 id="security-safeguards">9. Technical & Security Safeguards</h2>
      <p>
        We apply defense-in-depth security engineering to protect all handled information:
      </p>
      <ul>
        <li>HSTS-enforced HTTPS transport with strict TLS 1.2+ cipher suites.</li>
        <li>Strict Content Security Policy (CSP), Permissions-Policy, COOP, and CORP headers.</li>
        <li>Zero-trust SSRF validation on all URL-fetching endpoints.</li>
        <li>Automated IP-based and token-based rate limiting on all public endpoints.</li>
      </ul>

      <h2 id="contact-data-requests">10. Contact for Data Protection Requests</h2>
      <p>
        To exercise any of your data rights or submit inquiries regarding our privacy standards, contact our Data Protection Lead:
      </p>
      <div style={{ marginTop: "1.5rem", padding: "1.5rem", borderRadius: "16px", background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
        <p style={{ margin: "0 0 0.5rem", fontWeight: 700 }}>Data Protection Officer / Privacy Operations</p>
        <p style={{ margin: "0 0 0.25rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Email: <a href="mailto:hello@liminiq.com" style={{ color: "var(--accent)" }}>hello@liminiq.com</a> (Attn: Privacy / DPO)
        </p>
        <p style={{ margin: "0 0 0.25rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Registered Address: {SITE_CONTACT.streetAddress}, {SITE_CONTACT.addressLocality} {SITE_CONTACT.postalCode}, India
        </p>
        <p style={{ margin: "0.75rem 0 0", color: "var(--text-muted)", fontSize: "0.8rem" }}>
          Statutory Response SLA: All verifiable data deletion, access, or export requests are fulfilled within 30 calendar days.
        </p>
      </div>
    </LegalLayout>
  );
}
