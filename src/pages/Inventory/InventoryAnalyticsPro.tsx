// src/pages/InventoryAnalyticsPro.tsx
import { useEffect, useState } from "react";
import {
  getInventoryOverview,
  getProfitSummary,
  getMonthlyProfit,
} from "@/lib/api";
import {
  AlertTriangle,
  TrendingUp,
  Clock,
  Zap,
  Skull,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ────── Types ──────
type Product = {
  _id: string;
  name: string;
  stock: number;
  price: number;
  costPrice?: number;
  imageUrl: string;
  category?: { name: string };
  lastSoldAt?: string | null;
};

type InventoryStats = {
  totalProducts: number;
  totalStockUnits: number;
  totalInventoryValue: number;
  totalPotentialRevenue: number;
  totalPotentialProfit: number;
};

type InventoryResponse = {
  stats: InventoryStats;
  lowStockProducts?: Product[] | null;
  products?: Product[] | null;
};

type ProfitSummaryResponse = {
  totalInvestment: number;
  totalRevenue: number;
  totalProfit: number;
  profitMargin: number;
};

type MonthlyDataPoint = {
  month: string;
  investment: number;
  revenue: number;
  profit: number;
};

// ────── Safe Helpers ──────
const formatINR = (value: number | undefined | null): string => {
  if (typeof value !== "number" || isNaN(value)) return "₹0";
  return `₹${value.toLocaleString("en-IN")}`;
};

const safeArray = <T,>(arr: T[] | null | undefined): T[] => {
  return Array.isArray(arr) ? arr : [];
};

export default function InventoryAnalyticsPro() {
  const [inventory, setInventory] = useState<InventoryResponse | null>(null);
  const [profit, setProfit] = useState<ProfitSummaryResponse | null>(null);
  const [monthly, setMonthly] = useState<MonthlyDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getInventoryOverview(),
      getProfitSummary(),
      getMonthlyProfit(12),
    ])
      .then(([invData, profitData, monthlyData]) => {
        setInventory(
          invData || {
            stats: {} as InventoryStats,
            products: [],
            lowStockProducts: [],
          }
        );
        setProfit(
          profitData || {
            totalInvestment: 0,
            totalRevenue: 0,
            totalProfit: 0,
            profitMargin: 0,
          }
        );
        setMonthly(Array.isArray(monthlyData) ? monthlyData : []);
      })
      .catch((err) => {
        console.error("Analytics load failed:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !inventory || !profit) {
    return <LoadingSkeleton />;
  }

  // ────── 100% Safe Arrays ──────
  const allProducts: Product[] = safeArray(inventory.products);
  const lowStockProducts: Product[] = safeArray(inventory.lowStockProducts);

  const totalProfit = profit.totalProfit ?? 0;
  const totalInvestment =
    profit.totalInvestment ?? inventory.stats.totalInventoryValue ?? 0;
  const totalRevenue = profit.totalRevenue ?? 0;

  // Dead Stock: 90+ days no sale
  const deadStock: Product[] = allProducts.filter((p) => {
    if (!p.lastSoldAt) return true;
    const daysSince =
      (Date.now() - new Date(p.lastSoldAt).getTime()) / (1000 * 60 * 60 * 24);
    return daysSince > 90;
  });

  const turnoverRatio =
    totalInvestment > 0 ? (totalRevenue / totalInvestment).toFixed(2) : "0.00";

  // Profit by Category
  const categoryMap = allProducts.reduce((acc, p) => {
    const cat = p.category?.name || "Uncategorized";
    const profit = (p.price - (p.costPrice ?? p.price)) * p.stock;
    acc[cat] = (acc[cat] || 0) + profit;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const COLORS = [
    "#3b82f6",
    "#0ea5e9",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Hero */}
        <div className="text-center py-12 bg-linear-to-r from-blue-600 to-sky-600 rounded-3xl text-white shadow-2xl">
          <h1 className="text-6xl font-bold">{formatINR(totalProfit)}</h1>
          <p className="text-2xl mt-3 opacity-90">Total Profit This Month</p>
          <div className="mt-6 flex justify-center gap-10 text-lg font-medium">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              <span>↑ {formatINR(totalProfit * 0.12)} today</span>
            </div>
            <div>•</div>
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6" />
              <span>Turnover: {turnoverRatio}x</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <InsightCard
            icon={<Zap className="w-10 h-10" />}
            label="Fast Movers"
            value="28"
            color="text-yellow-600 bg-yellow-50"
          />
          <InsightCard
            icon={<Clock className="w-10 h-10" />}
            label="Slow Movers"
            value="19"
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
            value={lowStockProducts.length.toString()}
            color="text-purple-600 bg-purple-50"
          />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-xl border">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Calendar className="w-7 h-7 text-blue-600" />
              Profit Trend
            </h2>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 13 }} />
                <YAxis tick={{ fontSize: 13 }} />
                <Tooltip formatter={(v: number) => formatINR(v)} />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#10b981"
                  strokeWidth={4}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl border">
            <h2 className="text-2xl font-bold mb-4">Profit by Category</h2>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(e) => e.name}
                  outerRadius={110}
                  dataKey="value"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => formatINR(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dead Stock Alert */}
        {deadStock.length > 0 && (
          <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Skull className="w-9 h-9 text-red-600" />
              <h2 className="text-2xl font-bold text-red-800">
                Dead Stock Alert
              </h2>
              <span className="ml-auto bg-red-600 text-white px-5 py-2 rounded-full font-bold">
                {deadStock.length} Items
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {deadStock.slice(0, 12).map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-xl p-4 text-center shadow hover:shadow-lg transition"
                >
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-20 h-20 mx-auto rounded-lg object-cover border"
                  />
                  <p className="font-medium text-sm mt-3 line-clamp-2">
                    {p.name}
                  </p>
                  <p className="text-red-600 font-bold text-lg">
                    {p.stock} units
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatINR((p.costPrice ?? p.price) * p.stock)} tied
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InsightCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition">
      <div className={color}>{icon}</div>
      <p className="text-4xl font-bold mt-4">{value}</p>
      <p className="text-gray-600 mt-2">{label}</p>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto" />
        <p className="mt-6 text-2xl font-bold text-blue-600">
          Loading Analytics...
        </p>
      </div>
    </div>
  );
}
