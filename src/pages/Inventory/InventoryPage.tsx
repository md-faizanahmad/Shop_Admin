// src/pages/InventoryAnalytics.tsx
import { useEffect, useState } from "react";
import {
  getInventoryOverview,
  getProfitSummary,
  getMonthlyProfit,
} from "@/lib/api";
import { Package, IndianRupee, TrendingUp, AlertTriangle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Types (Safe & Exact)
type InventoryStats = {
  totalProducts: number;
  totalStockUnits: number;
  totalInventoryValue: number;
  totalPotentialRevenue: number;
  totalPotentialProfit: number;
};

type LowStockProduct = {
  _id: string;
  name: string;
  stock: number;
  price: number;
  costPrice?: number;
  imageUrl: string;
};

type InventoryResponse = {
  stats: InventoryStats;
  lowStockProducts: LowStockProduct[];
};

type TopProduct = {
  _id: string;
  name: string;
  unitsSold: number;
  profit: number;
  margin: number;
};

type ProfitSummaryResponse = {
  totalInvestment: number;
  totalRevenue: number;
  totalProfit: number;
  profitMargin: number;
  topProfitableProducts: TopProduct[];
};

type MonthlyDataPoint = {
  month: string; // e.g., "Jan 2025"
  investment: number;
  revenue: number;
  profit: number;
};

export default function InventoryAnalytics() {
  const [inventory, setInventory] = useState<InventoryResponse | null>(null);
  const [profitSummary, setProfitSummary] =
    useState<ProfitSummaryResponse | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getInventoryOverview(),
      getProfitSummary(),
      getMonthlyProfit(12),
    ])
      .then(([inv, profit, monthly]) => {
        setInventory(inv);
        setProfitSummary(profit);
        setMonthlyData(monthly);
      })
      .catch((err) => {
        console.error("Failed to load analytics:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto" />
          <p className="mt-6 text-xl font-medium text-gray-700">
            Loading Analytics...
          </p>
        </div>
      </div>
    );
  }

  // Safe array extraction
  const topProducts: TopProduct[] = Array.isArray(
    profitSummary?.topProfitableProducts
  )
    ? profitSummary.topProfitableProducts
    : [];

  const lowStockProducts: LowStockProduct[] = Array.isArray(
    inventory?.lowStockProducts
  )
    ? inventory.lowStockProducts
    : [];

  const totalInvestment =
    profitSummary?.totalInvestment ?? inventory?.stats.totalInventoryValue ?? 0;
  const totalRevenue =
    profitSummary?.totalRevenue ?? inventory?.stats.totalPotentialRevenue ?? 0;
  const totalProfit =
    profitSummary?.totalProfit ?? inventory?.stats.totalPotentialProfit ?? 0;
  const profitMargin =
    totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-4">
            <TrendingUp className="w-12 h-12 text-blue-600" />
            Inventory & Profit Analytics
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Real-time insights into your investment, revenue, and profit
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Investment"
            value={`₹${totalInvestment.toLocaleString("en-IN")}`}
            subtitle="Cost Price × Stock"
            icon={<IndianRupee className="w-8 h-8" />}
            color="bg-blue-600"
          />
          <StatCard
            title="Potential Revenue"
            value={`₹${totalRevenue.toLocaleString("en-IN")}`}
            subtitle="Selling Price × Stock"
            icon={<IndianRupee className="w-8 h-8" />}
            color="bg-sky-600"
          />
          <StatCard
            title="Estimated Profit"
            value={`₹${totalProfit.toLocaleString("en-IN")}`}
            subtitle={`${profitMargin}% margin`}
            icon={<TrendingUp className="w-8 h-8" />}
            color="bg-emerald-600"
            highlight
          />
          <StatCard
            title="Total Units in Stock"
            value={(inventory?.stats.totalStockUnits ?? 0).toLocaleString()}
            subtitle="All products combined"
            icon={<Package className="w-8 h-8" />}
            color="bg-indigo-600"
          />
        </div>

        {/* Profit Trend Chart */}
        {monthlyData.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Profit Trend (Last 12 Months)
            </h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 13 }} />
                  <YAxis tick={{ fontSize: 13 }} />
                  <Tooltip
                    formatter={(value: number) =>
                      `₹${value.toLocaleString("en-IN")}`
                    }
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="investment"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Investment"
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0ea5e9"
                    strokeWidth={3}
                    name="Revenue"
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#10b981"
                    strokeWidth={4}
                    name="Profit"
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Top Profitable Products */}
        {topProducts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Top 5 Most Profitable Products
            </h2>
            <div className="space-y-4">
              {topProducts.slice(0, 5).map((product, index) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between p-5 bg-linear-to-r from-blue-50 to-sky-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {product.unitsSold} units sold
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">
                      ₹{product.profit.toLocaleString("en-IN")}
                    </p>
                    <p className="text-sm text-gray-600">
                      {product.margin.toFixed(1)}% margin
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Critical Stock Alert */}
        {lowStockProducts.length > 0 && (
          <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <h2 className="text-2xl font-bold text-red-800">
                Low Stock Alert
              </h2>
              <span className="ml-auto bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm">
                {lowStockProducts.length} Products
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {lowStockProducts.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-xl shadow-md p-4 text-center border border-red-200 hover:shadow-lg transition-shadow"
                >
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-20 h-20 mx-auto rounded-lg object-cover mb-3 border"
                  />
                  <p className="font-semibold text-gray-900 text-sm line-clamp-2">
                    {p.name}
                  </p>
                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {p.stock}
                  </p>
                  <p className="text-xs text-gray-600">units left</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Stat Card
function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
  highlight = false,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition-all hover:shadow-2xl ${
        highlight
          ? "border-emerald-400 ring-4 ring-emerald-100"
          : "border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p
            className={`text-3xl font-bold mt-2 ${
              highlight ? "text-emerald-600" : "text-gray-900"
            }`}
          >
            {value}
          </p>
          <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
        </div>
        <div className={`${color} text-white p-4 rounded-2xl`}>{icon}</div>
      </div>
      {highlight && (
        <div className="mt-4 text-emerald-600 font-medium text-sm">
          Your highest profit potential
        </div>
      )}
    </div>
  );
}
