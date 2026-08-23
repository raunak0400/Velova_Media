import type { Market } from "@/types";

interface MarketCardProps {
  market: Market;
}

/** No flag icons — a small mono market code instead. See Design Architecture §8. */
export function MarketCard({ market }: MarketCardProps) {
  return (
    <div className="corner-card bg-bg p-8 flex flex-col gap-4 border border-border">
      <div className="flex items-center gap-3">
        <span className="text-data font-mono font-semibold text-accent-text text-xl">{market.code}</span>
        <h3 className="font-display text-h4 text-text">{market.name}</h3>
        {market.isHome && <span className="text-small text-text-2 border border-border px-2 py-0.5">Home market</span>}
      </div>
      <p className="text-body text-text-2 leading-relaxed">{market.note}</p>
    </div>
  );
}
