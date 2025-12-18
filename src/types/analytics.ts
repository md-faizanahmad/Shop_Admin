// -------------------------
// Product Base Type
// -------------------------
export interface Product {
  _id: string;
  name: string;
  price: number;
  costPrice: number;
  stock: number;
  imageUrl: string;
  category?: string;
  lastSoldAt?: string | null;

  // NEW — backend returns this now
  stockStatus: StockStatus;
}

// -------------------------
// Stock Status Type
// -------------------------
export type StockStatus = "dead" | "low" | "positive";

// -------------------------
// Inventory Overview Response
// -------------------------
export interface InventoryStats {
  totalProducts: number;
  totalStockUnits: number;
  totalInventoryValue: number;
  totalPotentialRevenue: number;
  totalPotentialProfit: number;
}

export interface InventoryResponse {
  success: boolean;
  stats: InventoryStats;
  products: Product[];
}

// -------------------------
// Profit Summary Response
// -------------------------
export interface TopProfitableProduct {
  _id: string;
  name: string;
  profit: number;
  margin: number;
  unitsSold: number;
}

export interface ProfitSummaryResponse {
  totalInvestment: number;
  totalRevenue: number;
  totalProfit: number;
  profitMargin: number;
  topProfitableProducts?: TopProfitableProduct[];
}

// -------------------------
// Monthly Profit Data Point
// -------------------------
export interface MonthlyDataPoint {
  month: string;
  investment: number;
  revenue: number;
  profit: number;
}

// -------------------------
// Stock Status Groups (NEW)
// -------------------------
export interface StockStatusResponse {
  success: boolean;
  dead: Product[];
  low: Product[];
  positive: Product[];
  counts: {
    dead: number;
    low: number;
    positive: number;
  };
}
