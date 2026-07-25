import { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, type LegalSection } from "@/components/sections/legal/LegalLayout";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How LIMINIQ collects, uses, stores, and protects your personal information when you use our website and services.",
  path: "/privacy-policy",
});

const SECTIONS: LegalSection[] = [
  { id: "information-we-collect", title: "1. Information We Collect" },
  { id: "how-we-use-your-information", title: "2. How We Use Your Information" },
  { id: "log-files", title: "3. Log Files" },
  { id: "cookies-and-web-beacons", title: "4. Cookies and Web Beacons" },
  { id: "third-party-privacy-policies", title: "5. Third Party Privacy Policies" },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title={
        <>
          Privacy <span style={{ color: "var(--text-secondary)" }}>Policy</span>
        </>
      }
      lastUpdated={new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      sections={SECTIONS}
    >
      <p>
        At LIMINIQ, accessible from liminiq.com, one of our main priorities is the privacy of our visitors. This
        Privacy Policy document contains types of information that is collected and recorded by LIMINIQ and how we
        use it.
      </p>

      <p>
        If you have additional questions or require more information about our Privacy Policy, do not hesitate to
        contact us at{" "}
        <a href="mailto:hello@liminiq.com">hello@liminiq.com</a>.
      </p>

      <h2 id="information-we-collect">1. Information We Collect</h2>
      <p>
        The personal information that you are asked to provide, and the reasons why you are asked to provide it,
        will be made clear to you at the point we ask you to provide your personal information.
      </p>
      <p>
        If you contact us directly, we may receive additional information about you such as your name, email
        address, phone number, the contents of the message and/or attachments you may send us, and any other
        information you may choose to provide.
      </p>

      <h2 id="how-we-use-your-information">2. How We Use Your Information</h2>
      <p>We use the information we collect in various ways, including to:</p>
      <ul>
        <li>Provide, operate, and maintain our website and services</li>
        <li>Improve, personalize, and expand our website</li>
        <li>Understand and analyze how you use our website</li>
        <li>Develop new products, services, features, and functionality</li>
        <li>Communicate with you for customer service and updates</li>
        <li>Send you emails and marketing communications</li>
        <li>Find and prevent fraud</li>
      </ul>

      <h2 id="log-files">3. Log Files</h2>
      <p>
        LIMINIQ follows a standard procedure of using log files. These files log visitors when they visit websites.
        All hosting companies do this and a part of hosting services&apos; analytics. The information collected by
        log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and
        time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information
        that is personally identifiable.
      </p>

      <h2 id="cookies-and-web-beacons">4. Cookies and Web Beacons</h2>
      <p>
        Like any other website, LIMINIQ uses &apos;cookies&apos;. These cookies are used to store information
        including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The
        information is used to optimize the users&apos; experience by customizing our web page content based on
        visitors&apos; browser type and/or other information.
      </p>

      <h2 id="third-party-privacy-policies">5. Third Party Privacy Policies</h2>
      <p>
        LIMINIQ&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to
        consult the respective Privacy Policies of these third-party ad servers for more detailed information. It
        may include their practices and instructions about how to opt-out of certain options.
      </p>

      <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <p style={{ marginBottom: "1rem" }}>
          For any privacy-related concerns or data deletion requests, please email us directly:
        </p>
        <Link href="mailto:hello@liminiq.com" className="btn-primary" style={{ display: "inline-flex" }}>
          hello@liminiq.com
        </Link>
      </div>
    </LegalLayout>
  );
}
