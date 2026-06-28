import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using LIMINIQ's digital agency services.",
  alternates: { canonical: "https://liminiq.com/terms-of-service" },
};

export default function TermsOfServicePage() {
  return (
    <div style={{ paddingTop: "8rem", paddingBottom: "6rem", background: "var(--bg-primary)", minHeight: "100vh" }}>
      <div className="section-container" style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        <div style={{ marginBottom: "3rem" }}>
          <div className="pill-badge" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
            <span style={{ color: "var(--accent-teal)" }}>✦</span> Legal
          </div>
          <h1 className="text-hero" style={{ letterSpacing: "-0.04em", fontSize: "clamp(3rem, 6vw, 4.5rem)", marginBottom: "1rem" }}>
            Terms of <span style={{ color: "var(--text-secondary)" }}>Service</span>
          </h1>
          <p style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)", letterSpacing: "0.05em", textTransform: "uppercase", fontSize: "0.85rem" }}>
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <div className="prose" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)", lineHeight: 1.8, fontSize: "1.05rem" }}>
          <p style={{ marginBottom: "2.5rem" }}>
            Welcome to LIMINIQ. These terms and conditions outline the rules and regulations for the use of LIMINIQ&apos;s Website, located at liminiq.com, and the digital services we provide.
          </p>
          
          <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)", fontSize: "1.75rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem" }}>
            1. Acceptance of Terms
          </h2>
          <p style={{ marginBottom: "2.5rem" }}>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use LIMINIQ if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)", fontSize: "1.75rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem" }}>
            2. Intellectual Property Rights
          </h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Unless otherwise stated, LIMINIQ and/or its licensors own the intellectual property rights for all material on LIMINIQ. All intellectual property rights are reserved. You may access this from LIMINIQ for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          <p style={{ marginBottom: "1rem" }}>You must not:</p>
          <ul style={{ listStyleType: "circle", paddingLeft: "1.5rem", marginBottom: "2.5rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>Republish material from LIMINIQ without permission</li>
            <li style={{ marginBottom: "0.5rem" }}>Sell, rent or sub-license material from LIMINIQ</li>
            <li style={{ marginBottom: "0.5rem" }}>Reproduce, duplicate or copy material from LIMINIQ</li>
            <li style={{ marginBottom: "0.5rem" }}>Redistribute content from LIMINIQ</li>
          </ul>

          <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)", fontSize: "1.75rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem" }}>
            3. Client Services & Deliverables
          </h2>
          <p style={{ marginBottom: "1.5rem" }}>
            When engaging LIMINIQ for web development, marketing, or design services, specific terms regarding deliverables, timelines, and payment schedules will be outlined in a separate Master Services Agreement (MSA) or Statement of Work (SOW) provided to the client. 
          </p>
          <p style={{ marginBottom: "2.5rem" }}>
            In the event of a conflict between these general website terms and a signed MSA, the signed MSA shall take precedence.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)", fontSize: "1.75rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem" }}>
            4. Limitation of Liability
          </h2>
          <p style={{ marginBottom: "2.5rem" }}>
            In no event shall LIMINIQ, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. LIMINIQ, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)", fontSize: "1.75rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem" }}>
            5. Governing Law & Jurisdiction
          </h2>
          <p style={{ marginBottom: "2.5rem" }}>
            These Terms will be governed by and interpreted in accordance with the laws of the jurisdiction in which LIMINIQ operates, and you submit to the non-exclusive jurisdiction of the state and federal courts located therein for the resolution of any disputes.
          </p>

          <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <p style={{ marginBottom: "1rem" }}>
              If you have any questions regarding our Terms of Service, please contact us:
            </p>
            <Link href="mailto:hello@liminiq.com" className="btn-primary" style={{ display: "inline-flex" }}>
              hello@liminiq.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
