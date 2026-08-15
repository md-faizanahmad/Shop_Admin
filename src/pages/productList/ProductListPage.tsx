// ProductListPage.tsx
import { useState, useEffect, useCallback, useRef } from "react";
import type { ProductBrief } from "@/types/product";
import type { MainCategory } from "@/types/category";

import { api } from "@/lib/api";
import { toast } from "react-toastify";
import ProductTableWrapper from "./components/ProductTableWrapper";
import ProductListToolbar from "./components/ProductListToolbar";
import {
  buildProductQueryParams,
  type ProductQueryParams,
} from "@/utils/buildProductQueryParams";

export default function ProductListPage() {
  const [products, setProducts] = useState<ProductBrief[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // ===== Fetch categories =====
  const fetchCategories = useCallback(async () => {
    setCategoriesLoading(true);
    try {
      const res = await api.get("/v1/categories", {
        params: { admin: true, grouped: true },
      });

      if (res.data.success) {
        setMainCategories(
          res.data.categories.filter((c: MainCategory) => !c.isDeleted)
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories");
      setMainCategories([]);
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // ===== Fetch products (race-safe) =====
  const requestIdRef = useRef(0);

  const fetchProducts = useCallback(async () => {
    const reqId = ++requestIdRef.current;
    setLoading(true);

    try {
      const params: ProductQueryParams = buildProductQueryParams(
        page,
        20,
        sortBy,
        searchQuery,
        categoryFilter,
        mainCategories
      );

      // const res = await api.get("/v1/products", { params }); // old one which required admin query
      const res = await api.get("/v1/admin/products", { params });

      if (reqId !== requestIdRef.current) return;

      const data = res.data;
      setProducts(data.products || []);
      setTotalPages(data.meta?.totalPages || 1);
    } catch (err) {
      if (reqId !== requestIdRef.current) return;

      console.error("Failed to fetch products", err);
      toast.error("Failed to load products");
      setProducts([]);
      setTotalPages(1);
    } finally {
      if (reqId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [page, sortBy, searchQuery, categoryFilter, mainCategories]);

  // Auto-fetch when filters/page change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Debounce search input → reset page
  useEffect(() => {
    const t = setTimeout(() => setPage(1), 400);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Reset filters
  const handleReset = () => {
    setSearchQuery("");
    setCategoryFilter("");
    setSortBy("newest");
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <ProductListToolbar
        totalProducts={products.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        mainCategories={mainCategories}
        categoriesLoading={categoriesLoading}
        onSearch={() => {
          setPage(1);
          fetchProducts();
        }}
        onReset={handleReset}
      />

      <ProductTableWrapper
        products={products}
        setProducts={setProducts}
        loading={loading}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        fetchProducts={fetchProducts}
      />
    </div>
  );
}
