export interface InventoryProduct {
  _id: string;
  name: string;
  imageUrl?: string | null;
  price: number;
  costPrice: number;
  stock: number;

  profitUnit: number;
  totalInvestment: number;
  totalSellingValue: number;
  totalProfit: number;
  margin: number;

  category?: {
    _id: string;
    name: string;
    slug?: string;
  } | null;

  slug?: string | null;
}

export interface InventorySummary {
  totalProducts: number;
  totalInvestment: number;
  totalSellingValue: number;
  totalProfitPotential: number;
  marginPercent: number;
  lowStock: number;
  outOfStock: number;
  revenue: number;
}

export interface InventoryApiResponse {
  success: boolean;
  summary: InventorySummary;
  products: InventoryProduct[];
  topProducts: InventoryProduct[];
}
