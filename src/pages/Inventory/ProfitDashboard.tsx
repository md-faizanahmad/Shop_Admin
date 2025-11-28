import { getMonthlyProfit, getProfitSummary } from "@/lib/api";
import { useEffect, useState } from "react";

type BestSeller = {
  productId: string;
  name: string;
  soldUnits: number;
  revenue: number;
  profit: number;
  imageUrl?: string;
  category?: string;
};

export default function ProfitDashboard() {
  const [bestSellers, setBestSellers] = useState<BestSeller[]>([]);
  const [totals, setTotals] = useState<{
    totalRevenue: number;
    totalCostOfSold: number;
    totalProfit: number;
  } | null>(null);
  const [monthly, setMonthly] = useState<
    { month: string; totalRevenue: number }[]
  >([]);
  useEffect(() => {
    getProfitSummary()
      .then((res) => {
        setTotals(res.totals || null);
        setBestSellers(res.bestSelling || []);
      })
      .catch(() => {});
    getMonthlyProfit(12)
      .then((res) => setMonthly(res.months || []))
      .catch(() => {});
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profit & Business Insights</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card
          title="Revenue"
          value={totals ? `₹${totals.totalRevenue.toLocaleString()}` : "—"}
        />
        <Card
          title="Cost of Sold Items"
          value={totals ? `₹${totals.totalCostOfSold.toLocaleString()}` : "—"}
        />
        <Card
          title="Profit"
          value={totals ? `₹${totals.totalProfit.toLocaleString()}` : "—"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded p-4">
          <h3 className="font-semibold mb-3">Best Selling Products</h3>
          <div className="space-y-3">
            {bestSellers.map((b) => (
              <div key={b.productId} className="flex items-center gap-3">
                {b.imageUrl && (
                  <img
                    src={b.imageUrl}
                    className="w-12 h-12 object-cover rounded"
                    alt={b.name}
                  />
                )}
                <div>
                  <div className="font-semibold">{b.name}</div>
                  <div className="text-sm text-gray-600">
                    Sold: {b.soldUnits} • Revenue: ₹{b.revenue.toLocaleString()}
                  </div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-sm">Profit</div>
                  <div className="font-bold">₹{b.profit.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded p-4">
          <h3 className="font-semibold mb-3">
            Monthly Revenue (Last 12 months)
          </h3>
          <div className="space-y-2">
            {monthly.map((m) => (
              <div key={m.month} className="flex justify-between">
                <div className="text-sm">{m.month}</div>
                <div className="font-semibold">
                  ₹{m.totalRevenue.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white border rounded p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}
