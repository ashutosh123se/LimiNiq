import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ExitIntentPopup } from "@/components/layout/ExitIntentPopup";
import { FloatingContactBar } from "@/components/layout/FloatingContactBar";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      {/* <WhatsAppButton /> Replaced by FloatingContactBar */}
      <FloatingContactBar />
      <ExitIntentPopup />
    </>
  );
}
