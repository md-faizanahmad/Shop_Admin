// src/pages/InventoryAnalyticsPro.tsx
import { useEffect, useState } from "react";

import {
  getInventoryOverview,
  getProfitSummary,
  getMonthlyProfit,
  getStockStatus, // ⭐ NEW API
} from "@/lib/api";

import { safeArray } from "@/helpers/array";

import LoadingScreen from "@/ui/LoadingScreen";
import AnalyticsStatsGrid from "./components/AnalyticsStatsGrid";
import MoversSection from "./components/MoversSection";
import ProfitTrendChart from "./components/ProfitTrendChart";
import CategoryProfitChart from "./components/CategoryProfitChart";
import TopProfitableList from "./components/TopProfitableList";
import AnalyticsInfoBox from "./components/AnalyticsInfoBox";
import StockSection from "./components/StockSection";

import type {
  InventoryResponse,
  ProfitSummaryResponse,
  MonthlyDataPoint,
  Product,
  InventoryStats,
  StockStatusResponse,
} from "@/types/analytics";

export default function InventoryAnalyticsPro() {
  const [inventory, setInventory] = useState<InventoryResponse | null>(null);
  const [profitSummary, setProfitSummary] =
    useState<ProfitSummaryResponse | null>(null);

  const [monthly, setMonthly] = useState<MonthlyDataPoint[]>([]);

  // ⭐ NEW Stock groups from backend
  const [deadStock, setDeadStock] = useState<Product[]>([]);
  const [lowStock, setLowStock] = useState<Product[]>([]);
  const [positiveStock, setPositiveStock] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  // Fetch all analytics
  useEffect(() => {
    Promise.all([
      getInventoryOverview(),
      getProfitSummary(),
      getMonthlyProfit(12),
      getStockStatus(), // ⭐ pulled from backend
    ])
      .then(([inv, profit, monthlyResp, stockResp]) => {
        setInventory(inv);
        setProfitSummary(profit);
        setMonthly(safeArray(monthlyResp));

        const stock = stockResp as StockStatusResponse;

        // ⭐ Use backend-prepared groups
        setDeadStock(safeArray(stock.dead));
        setLowStock(safeArray(stock.low));
        setPositiveStock(safeArray(stock.positive));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingScreen />;

  // Safe extraction
  const stats: InventoryStats = inventory?.stats ?? {
    totalProducts: 0,
    totalStockUnits: 0,
    totalInventoryValue: 0,
    totalPotentialRevenue: 0,
    totalPotentialProfit: 0,
  };

  const products = safeArray(inventory?.products);
  const topProducts = safeArray(profitSummary?.topProfitableProducts);

  const totalInvestment =
    profitSummary?.totalInvestment ?? stats.totalInventoryValue;

  const totalRevenue =
    profitSummary?.totalRevenue ?? stats.totalPotentialRevenue;

  const totalProfit = profitSummary?.totalProfit ?? stats.totalPotentialProfit;

  const profitMargin = totalRevenue
    ? ((totalProfit / totalRevenue) * 100).toFixed(1)
    : "0";

  // -------------------------
  // ⭐ Movers (based on lastSoldAt)
  // -------------------------
  const calculateDays = (p: Product): number => {
    if (!p.lastSoldAt) return 9999;
    return (Date.now() - new Date(p.lastSoldAt).getTime()) / 86400000;
  };

  const fastMovers = products.filter((p) => calculateDays(p) <= 7);
  const slowMovers = products.filter((p) => {
    const days = calculateDays(p);
    return days > 7 && days <= 90;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Dashboard Stats */}
        <AnalyticsStatsGrid
          totalInvestment={totalInvestment}
          totalRevenue={totalRevenue}
          totalProfit={totalProfit}
          profitMargin={profitMargin}
          totalUnits={stats.totalStockUnits}
        />

        {/* Info Box / Accordion */}
        <AnalyticsInfoBox />

        {/* Movers Section */}
        <MoversSection
          lowStock={lowStock}
          deadStock={deadStock}
          fastMovers={fastMovers.length}
          slowMovers={slowMovers.length}
        />

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8">
          <ProfitTrendChart data={monthly} />
          <CategoryProfitChart products={products} />
        </div>

        {/* Top Profitable Products */}
        {topProducts.length > 0 && <TopProfitableList products={topProducts} />}

        {/* Stock Sections */}
        {deadStock.length > 0 && (
          <StockSection title="Dead Stock (Critical)" products={deadStock} />
        )}

        {lowStock.length > 0 && (
          <StockSection
            title="Low Stock (Needs Attention)"
            products={lowStock}
          />
        )}

        {positiveStock.length > 0 && (
          <StockSection title="Healthy Stock" products={positiveStock} />
        )}
      </div>
    </div>
  );
}
