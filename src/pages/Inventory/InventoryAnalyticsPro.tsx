// src/pages/InventoryAnalyticsPro.tsx
import { useEffect, useState } from "react";
import {
  getInventoryOverview,
  getProfitSummary,
  getMonthlyProfit,
} from "@/lib/api";
import {
  Package,
  IndianRupee,
  TrendingUp,
  AlertTriangle,
  Skull,
  Zap,
  Clock,
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
  topProfitableProducts?: TopProduct[] | null;
};

type MonthlyDataPoint = {
  month: string;
  investment: number;
  revenue: number;
  profit: number;
};

// ────── Helpers ──────
const formatINR = (value: number): string =>
  `₹${value.toLocaleString("en-IN")}`;

const safeArray = <T,>(arr: T[] | null | undefined): T[] =>
  Array.isArray(arr) ? arr : [];

export default function InventoryAnalyticsPro() {
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
        setMonthlyData(Array.isArray(monthly) ? monthly : []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingScreen />;

  // ────── Safe Data Extraction ──────
  const stats = inventory?.stats ?? ({} as InventoryStats);
  const allProducts = safeArray(inventory?.products);
  const lowStock = safeArray(inventory?.lowStockProducts);
  const topProducts = safeArray(profitSummary?.topProfitableProducts);

  const totalInvestment =
    profitSummary?.totalInvestment ?? stats.totalInventoryValue ?? 0;
  const totalRevenue =
    profitSummary?.totalRevenue ?? stats.totalPotentialRevenue ?? 0;
  const totalProfit =
    profitSummary?.totalProfit ?? stats.totalPotentialProfit ?? 0;
  const profitMargin =
    totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : "0.0";
  const turnoverRatio =
    totalInvestment > 0 ? (totalRevenue / totalInvestment).toFixed(2) : "0.00";

  // Dead Stock: no sale in 90+ days
  //  90 days
  const deadStock = allProducts.filter((p) => {
    if (!p.lastSoldAt) return true;
    const days =
      (Date.now() - new Date(p.lastSoldAt).getTime()) / (1000 * 60 * 60 * 24);
    return days > 90;
  });

  // Profit by Category for Pie Chart
  const categoryProfit = allProducts.reduce((acc, p) => {
    const cat = p.category?.name || "Uncategorized";
    const profitPerUnit = p.price - (p.costPrice ?? p.price);
    acc[cat] = (acc[cat] || 0) + profitPerUnit * p.stock;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryProfit)
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Hero Section */}
        <div className="text-center py-12 bg-linear-to-r from-blue-600 to-sky-600 rounded-3xl text-white shadow-2xl">
          <h1 className="text-6xl font-bold">{formatINR(totalProfit)}</h1>
          <p className="text-2xl mt-3 opacity-90">Total Profit This Month</p>
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-lg font-medium">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-7 h-7" />
              <span>Turnover: {turnoverRatio}x</span>
            </div>
            <div className="flex items-center gap-2">
              <IndianRupee className="w-7 h-7" />
              <span>{profitMargin}% Margin</span>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Investment"
            value={formatINR(totalInvestment)}
            subtitle="Cost × Stock"
            icon={<IndianRupee className="w-9 h-9" />}
            color="bg-blue-600"
          />
          <StatCard
            title="Potential Revenue"
            value={formatINR(totalRevenue)}
            subtitle="Price × Stock"
            icon={<IndianRupee className="w-9 h-9" />}
            color="bg-sky-600"
          />
          <StatCard
            title="Estimated Profit"
            value={formatINR(totalProfit)}
            subtitle={`${profitMargin}% margin`}
            icon={<TrendingUp className="w-9 h-9" />}
            color="bg-emerald-600"
            highlight
          />
          <StatCard
            title="Total Units"
            value={stats.totalStockUnits?.toLocaleString() || "0"}
            subtitle="Across all products"
            icon={<Package className="w-9 h-9" />}
            color="bg-indigo-600"
          />
        </div>

        {/* Movers Overview */}
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
            value={lowStock.length.toString()}
            color="text-purple-600 bg-purple-50"
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Profit Trend */}
          <div className="bg-white rounded-2xl shadow-xl border p-6">
            <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">
              <Calendar className="w-7 h-7 text-blue-600" />
              Profit Trend (12 Months)
            </h2>
            <ResponsiveContainer width="100%" height={340}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 13 }} />
                <YAxis tick={{ fontSize: 13 }} />
                <Tooltip formatter={(v: number) => formatINR(v)} />
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
                  dot={{ r: 5 }}
                  name="Profit"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Profit by Category */}
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
        </div>

        {/* Top 5 Profitable Products */}
        {topProducts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl border p-6">
            <h2 className="text-2xl font-bold mb-6">
              Top 5 Most Profitable Products
            </h2>
            <div className="space-y-4">
              {topProducts.slice(0, 5).map((p, i) => (
                <div
                  key={p._id}
                  className="flex items-center justify-between p-5 bg-linear-to-r from-blue-50 to-sky-50 rounded-xl border border-blue-100 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex-center font-bold text-lg">
                      {i + 1}
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
        )}

        {/* Critical Alerts */}
        {(lowStock.length > 0 || deadStock.length > 0) && (
          <div className="space-y-8">
            {/* Low Stock */}
            {lowStock.length > 0 && (
              <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-9 h-9 text-orange-600" />
                  <h2 className="text-2xl font-bold text-orange-800">
                    Low Stock Alert
                  </h2>
                  <span className="ml-auto bg-orange-600 text-white px-5 py-2 rounded-full font-bold">
                    {lowStock.length} Products
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                  {lowStock.slice(0, 12).map((p) => (
                    <ProductCard key={p._id} product={p} alert="low" />
                  ))}
                </div>
              </div>
            )}

            {/* Dead Stock */}
            {deadStock.length > 0 && (
              <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Skull className="w-9 h-9 text-red-600" />
                  <h2 className="text-red-800">Dead Stock Alert</h2>
                  <span className="ml-auto bg-red-600 text-white px-5 py-2 rounded-full font-bold">
                    {deadStock.length} Items
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                  {deadStock.slice(0, 12).map((p) => (
                    <ProductCard key={p._id} product={p} alert="dead" />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Components
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

function ProductCard({
  product,
  alert,
}: {
  product: Product;
  alert: "low" | "dead";
}) {
  const isDead = alert === "dead";
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center border">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-20 h-20 mx-auto rounded-lg object-cover border mb-3"
      />
      <p className="font-medium text-sm line-clamp-2">{product.name}</p>
      <p
        className={`text-2xl font-bold mt-2 ${
          isDead ? "text-red-600" : "text-orange-600"
        }`}
      >
        {product.stock}
      </p>
      <p className="text-xs text-gray-600">
        {isDead ? "dead stock" : "units left"}
      </p>
      {isDead && (
        <p className="text-xs text-gray-500 mt-1">
          {formatINR((product.costPrice ?? product.price) * product.stock)} tied
        </p>
      )}
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto" />
        <p className="mt-6 text-2xl font-bold text-blue-600">
          Loading Pro Analytics...
        </p>
      </div>
    </div>
  );
}
