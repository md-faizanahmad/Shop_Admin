import { Skull, AlertTriangle, CheckCircle } from "lucide-react";
import type { Product } from "@/types/analytics";
import StatsProductCard from "./StatsProductCard";

interface Props {
  title: string;
  products: Product[];
}

export default function StockSection({ title, products }: Props) {
  if (products.length === 0) return null;

  const status = products[0].stockStatus; // all same category in section

  const styles = {
    dead: {
      bg: "bg-red-50 border-red-300",
      icon: <Skull className="w-9 h-9 text-red-600" />,
      badge: "bg-red-600",
    },
    low: {
      bg: "bg-orange-50 border-orange-300",
      icon: <AlertTriangle className="w-9 h-9 text-orange-600" />,
      badge: "bg-orange-600",
    },
    positive: {
      bg: "bg-green-50 border-green-300",
      icon: <CheckCircle className="w-9 h-9 text-green-600" />,
      badge: "bg-green-600",
    },
  }[status];

  return (
    <div className={`rounded-2xl border-2 p-6 shadow-sm ${styles.bg}`}>
      <div className="flex items-center gap-3 mb-6">
        {styles.icon}
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>

        <span
          className={`ml-auto px-5 py-2 rounded-full text-white font-bold ${styles.badge}`}
        >
          {products.length}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {products.map((p) => (
          <StatsProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
