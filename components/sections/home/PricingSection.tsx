import { StartingPriceGrid } from "../pricing/StartingPriceGrid";
import { HomeRateBoard } from "./HomeRateBoard";

export function PricingSection({ showFAQ = false, compact = false }: { showFAQ?: boolean; compact?: boolean }) {
  if (compact) return <HomeRateBoard />;
  return <StartingPriceGrid showFAQ={showFAQ} />;
}
