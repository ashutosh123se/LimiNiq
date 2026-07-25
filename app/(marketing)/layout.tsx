import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { MarketingChrome } from "@/components/layout/MarketingChrome";
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
      <Nav />
      <main className="relative z-10">{children}</main>
      <SiteNap />
      <Footer />
      <MarketingChrome />
    </>
  );
}
