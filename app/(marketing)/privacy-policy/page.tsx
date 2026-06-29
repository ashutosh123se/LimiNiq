import { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How LIMINIQ collects, uses, stores, and protects your personal information when you use our website and services.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div style={{ paddingTop: "8rem", paddingBottom: "6rem", background: "var(--bg-primary)", minHeight: "100vh" }}>
      <div className="section-container" style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        <div style={{ marginBottom: "3rem" }}>
          <div className="pill-badge" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
            <span style={{ color: "var(--accent-primary)" }}>✦</span> Legal
          </div>
          <h1 className="text-hero" style={{ letterSpacing: "-0.04em", fontSize: "clamp(3rem, 6vw, 4.5rem)", marginBottom: "1rem" }}>
            Privacy <span style={{ color: "var(--text-secondary)" }}>Policy</span>
          </h1>
          <p style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)", letterSpacing: "0.05em", textTransform: "uppercase", fontSize: "0.85rem" }}>
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <div className="prose" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)", lineHeight: 1.8, fontSize: "1.05rem" }}>
          <p style={{ marginBottom: "1.5rem" }}>
            At LIMINIQ, accessible from liminiq.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by LIMINIQ and how we use it.
          </p>
          
          <p style={{ marginBottom: "2.5rem" }}>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:hello@liminiq.com" style={{ color: "var(--accent-primary)", textDecoration: "none" }}>hello@liminiq.com</a>.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)", fontSize: "1.75rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem" }}>
            1. Information We Collect
          </h2>
          <p style={{ marginBottom: "1.5rem" }}>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
          </p>
          <p style={{ marginBottom: "2.5rem" }}>
            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)", fontSize: "1.75rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem" }}>
            2. How We Use Your Information
          </h2>
          <p style={{ marginBottom: "1rem" }}>We use the information we collect in various ways, including to:</p>
          <ul style={{ listStyleType: "circle", paddingLeft: "1.5rem", marginBottom: "2.5rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>Provide, operate, and maintain our website and services</li>
            <li style={{ marginBottom: "0.5rem" }}>Improve, personalize, and expand our website</li>
            <li style={{ marginBottom: "0.5rem" }}>Understand and analyze how you use our website</li>
            <li style={{ marginBottom: "0.5rem" }}>Develop new products, services, features, and functionality</li>
            <li style={{ marginBottom: "0.5rem" }}>Communicate with you for customer service and updates</li>
            <li style={{ marginBottom: "0.5rem" }}>Send you emails and marketing communications</li>
            <li style={{ marginBottom: "0.5rem" }}>Find and prevent fraud</li>
          </ul>

          <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)", fontSize: "1.75rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem" }}>
            3. Log Files
          </h2>
          <p style={{ marginBottom: "2.5rem" }}>
            LIMINIQ follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&apos; analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)", fontSize: "1.75rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem" }}>
            4. Cookies and Web Beacons
          </h2>
          <p style={{ marginBottom: "2.5rem" }}>
            Like any other website, LIMINIQ uses &apos;cookies&apos;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
          </p>

          <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)", fontSize: "1.75rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem" }}>
            5. Third Party Privacy Policies
          </h2>
          <p style={{ marginBottom: "2.5rem" }}>
            LIMINIQ&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>

          <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <p style={{ marginBottom: "1rem" }}>
              For any privacy-related concerns or data deletion requests, please email us directly:
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
