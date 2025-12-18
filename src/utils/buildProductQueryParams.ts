import type { MainCategory } from "@/types/category";

export interface ProductQueryParams {
  page: number;
  limit: number;
  admin: boolean;
  sort: string;
  q?: string;
  category?: string;
  subcategory?: string;
}

/**
 * Build clean query params for /v1/products
 * Handles:
 * - main category
 * - subcategory
 * - search
 * - pagination
 */
export function buildProductQueryParams(
  page: number,
  limit: number,
  sortBy: string,
  searchQuery: string,
  categoryFilter: string,
  mainCategories: MainCategory[]
): ProductQueryParams {
  const params: ProductQueryParams = {
    page,
    limit,
    admin: true,
    sort: sortBy,
  };

  // search
  const trimmedQ = searchQuery.trim();
  if (trimmedQ) {
    params.q = trimmedQ;
  }

  // Category vs Subcategory detection
  if (categoryFilter) {
    const isMain = mainCategories.some((m) => m._id === categoryFilter);

    if (isMain) {
      params.category = categoryFilter; // main category
    } else {
      const isSub = mainCategories.some((m) =>
        m.subcategories?.some((sub) => sub._id === categoryFilter)
      );

      if (isSub) {
        params.subcategory = categoryFilter; // subcategory
      }
    }
  }

  return params;
}
