import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ExitIntentPopup } from "@/components/layout/ExitIntentPopup";
import { FloatingContactBar } from "@/components/layout/FloatingContactBar";
import { SiteNap } from "@/components/seo/SiteNap";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mesh-gradient" aria-hidden>
        <div className="orb-1" />
        <div className="orb-2" />
        <div className="orb-3" />
        <div className="orb-4" />
      </div>
      <div className="grid-overlay" aria-hidden />
      <Navbar />
      <main>{children}</main>
      <SiteNap />
      <Footer />
      {/* <WhatsAppButton /> Replaced by FloatingContactBar */}
      <FloatingContactBar />
      <ExitIntentPopup />
    </>
  );
}
