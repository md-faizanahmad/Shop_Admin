// src/components/analytics/LowStockAlert.tsx
// src/components/analytics/LowStockAlert.tsx
import type { Product } from "@/types/analytics";
import ProductCard from "./StatsProductCard";
import { AlertTriangle } from "lucide-react";

interface Props {
  products: Product[];
}

export default function LowStockAlert({ products }: Props) {
  return (
    <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-9 h-9 text-orange-600" />
        <h2 className="text-2xl font-bold text-orange-800">Low Stock Alert</h2>
        <span className="ml-auto bg-orange-600 text-white px-5 py-2 rounded-full font-bold">
          {products.length}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {products.slice(0, 12).map((p) => (
          <ProductCard key={p._id} product={p} alert="low" />
        ))}
      </div>
    </div>
  );
}
