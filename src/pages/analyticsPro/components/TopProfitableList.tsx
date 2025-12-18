// src/components/analytics/TopProfitableList.tsx

import { formatINR } from "@/helpers/format";
import type { TopProduct } from "@/types/analytics";

interface Props {
  products: TopProduct[];
}

export default function TopProfitableList({ products }: Props) {
  const list = products.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-xl border p-6">
      <h2 className="text-2xl font-bold mb-6">
        Top 5 Most Profitable Products
      </h2>

      <div className="space-y-4">
        {list.map((p, index) => (
          <div
            key={p._id}
            className="flex items-center justify-between p-5 bg-linear-to-r from-blue-50 to-sky-50 
            rounded-xl border border-blue-100 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex-center font-bold text-lg">
                {index + 1}
              </div>

              <div>
                <p className="font-semibold text-gray-900">{p.name}</p>
                <p className="text-sm text-gray-600">
                  {p.unitsSold} units sold
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-emerald-600">
                {formatINR(p.profit)}
              </p>
              <p className="text-sm text-gray-600">
                {p.margin.toFixed(1)}% margin
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
