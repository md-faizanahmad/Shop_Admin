import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import type { Product } from "@/types/analytics";
import { formatINR } from "@/helpers/format";

const COLORS = [
  "#3b82f6",
  "#0ea5e9",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

interface Props {
  products: Product[];
}

export default function CategoryProfitChart({ products }: Props) {
  // Aggregate profit per category
  const categoryProfit = products.reduce((acc, p) => {
    const category = p.category || "Uncategorized";
    const profitPerUnit = p.price - p.costPrice;
    const subtotal = profitPerUnit * p.stock;

    acc[category] = (acc[category] || 0) + subtotal;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryProfit)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  return (
    <div className="bg-white rounded-2xl shadow-xl border p-6">
      <h2 className="text-2xl font-bold mb-5">Profit by Category</h2>

      <ResponsiveContainer width="100%" height={340}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={110}
            paddingAngle={5}
            dataKey="value"
            label={({ name }) => name}
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip formatter={(v: number) => formatINR(v)} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
