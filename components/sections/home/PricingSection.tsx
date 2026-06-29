import { StartingPriceGrid } from "../pricing/StartingPriceGrid";

export function PricingSection({ showFAQ = false, compact = false }: { showFAQ?: boolean; compact?: boolean }) {
  return <StartingPriceGrid showFAQ={showFAQ} compact={compact} />;
}
