// src/pages/products/components/ProductListToolbar.tsx

import { Link } from "react-router-dom";
import { Plus, Package, Search, Filter, X } from "lucide-react";
import type { MainCategory } from "@/types/category";

interface ProductListToolbarProps {
  totalProducts: number;

  searchQuery: string;
  setSearchQuery: (q: string) => void;

  categoryFilter: string;
  setCategoryFilter: (c: string) => void;

  sortBy: string;
  setSortBy: (s: string) => void;

  mainCategories: MainCategory[];
  categoriesLoading: boolean;

  onSearch: () => void;
  onReset: () => void;
}

export default function ProductListToolbar({
  totalProducts,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  sortBy,
  setSortBy,
  mainCategories,
  categoriesLoading,
  onSearch,
  onReset,
}: ProductListToolbarProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Package className="w-9 h-9 text-sky-600" />
            Products
          </h1>
          <p className="text-gray-600 mt-1">
            Total: {totalProducts} products (including archived)
          </p>
        </div>

        <Link
          to="/dashboard/products/add"
          className="inline-flex items-center gap-3 bg-linear-to-r from-black to-gray-800 text-white px-6 py-3.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="pl-12 pr-10 py-3.5 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) => {
              console.log("UI SELECT VALUE:", e.target.value);
              setCategoryFilter(e.target.value);
            }}
            disabled={categoriesLoading}
            className="px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none disabled:opacity-60"
          >
            <option value="">
              {categoriesLoading ? "Loading..." : "All Categories"}
            </option>
            {mainCategories.map((main) => (
              <optgroup key={main._id} label={main.name}>
                <option value={main._id}>All {main.name}</option>
                {main.subcategories
                  .filter((sub) => !sub.isDeleted)
                  .map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      &nbsp;&nbsp;{sub.name}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="popular">Most Popular</option>
            <option value="rating_desc">Highest Rated</option>
          </select>

          {/* Reset */}
          <button
            type="button"
            onClick={onReset}
            className="px-6 py-3.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Reset Filters
          </button>
        </form>
      </div>
    </div>
  );
}
