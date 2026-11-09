export interface TopCategory {
  _id: string;
  name: string;
  slug?: string;
  image?: string | null;
  subCount: number;
}

export interface Stats {
  totalOrders: number;
  todayOrders: number;
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  totalProducts: number;
  // new fields from backend:
  totalMainCategories?: number;
  totalSubcategories?: number;
  categoriesWithSubCount?: TopCategory[];
  topCategoriesBySubcount?: TopCategory[];
  totalUsers: number;
}
