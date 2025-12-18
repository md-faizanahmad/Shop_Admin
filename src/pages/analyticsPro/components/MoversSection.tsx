// src/components/analytics/MoversSection.tsx
import InsightCard from "./InsightCard";
import type { Product } from "@/types/analytics";
import { Zap, Clock, Skull, AlertTriangle } from "lucide-react";

interface Props {
  fastMovers: number;
  slowMovers: number;
  deadStock: Product[];
  lowStock: Product[];
}

export default function MoversSection({
  fastMovers,
  slowMovers,
  deadStock,
  lowStock,
}: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <InsightCard
        icon={<Zap className="w-10 h-10" />}
        label="Fast Movers"
        value={fastMovers.toString()}
        color="text-yellow-600 bg-yellow-50"
      />

      <InsightCard
        icon={<Clock className="w-10 h-10" />}
        label="Slow Movers"
        value={slowMovers.toString()}
        color="text-orange-600 bg-orange-50"
      />

      <InsightCard
        icon={<Skull className="w-10 h-10" />}
        label="Dead Stock"
        value={deadStock.length.toString()}
        color="text-red-600 bg-red-50"
      />

      <InsightCard
        icon={<AlertTriangle className="w-10 h-10" />}
        label="Low Stock"
        value={lowStock.length.toString()}
        color="text-purple-600 bg-purple-50"
      />
    </div>
  );
}
