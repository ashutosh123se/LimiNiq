import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroActions() {
  return (
    <div className="hero-actions">
      <Link href="/contact" className="btn-primary" data-cursor="cta">
        Start Your Project
        <ArrowRight size={16} strokeWidth={2} />
      </Link>
      <Link href="/portfolio" className="btn-secondary" data-cursor="link">
        View Our Work
      </Link>
    </div>
  );
}
