"use client";

import { useEffect, useState } from "react";
import { STARTING_PRICES, type StartingPriceItem } from "@/lib/data/startingPrices";
import { getStartingPriceIcon } from "@/lib/startingPriceIcons";
import type { StartingPriceRecord } from "@/lib/startingPricesDb";

export function useStartingPrices() {
  const [items, setItems] = useState<StartingPriceItem[]>(STARTING_PRICES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/starting-prices")
      .then((r) => r.json())
      .then((data: StartingPriceRecord[]) => {
        if (!Array.isArray(data) || data.length === 0) return;
        setItems(
          data.map((row) => ({
            id: row.id,
            slug: row.slug,
            title: row.title,
            shortLabel: row.shortLabel,
            startingPrice: row.startingPrice,
            priceNote: row.priceNote,
            summary: row.summary,
            highlights: row.highlights,
            color: row.color,
            icon: getStartingPriceIcon(row.iconKey),
            featured: row.featured,
          }))
        );
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}
