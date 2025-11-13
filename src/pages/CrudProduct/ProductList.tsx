// src/pages/CrudProduct/ProductList.tsx
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ProductTable, { type ProductBrief } from "./ProductTable";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PAGE_SIZE = 8;

export default function ProductListPage() {
  const API_URL = import.meta.env.VITE_API_URL ?? "";
  const navigate = useNavigate();

  const [products, setProducts] = useState<ProductBrief[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  // controls
  const [q, setQ] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [stockFilter, setStockFilter] = useState<"all" | "in" | "out">("all");
  const [page, setPage] = useState<number>(1);
  type StockFilter = "all" | "in" | "out";
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [pRes, cRes] = await Promise.all([
          axios.get(`${API_URL}/mystoreapi/products`, {
            withCredentials: true,
          }),
          axios.get(`${API_URL}/mystoreapi/categories`),
        ]);
        setProducts(pRes.data.products ?? []);
        setCategories(cRes.data.categories ?? []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    })();
  }, [API_URL]);

  // derived filtered list
  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (categoryFilter && p.category?._id !== categoryFilter) return false;
      if (stockFilter === "in" && p.stock <= 0) return false;
      if (stockFilter === "out" && p.stock > 0) return false;
      if (
        q &&
        !`${p.name} ${p.description ?? ""} ${p.category?.name ?? ""}`
          .toLowerCase()
          .includes(q.toLowerCase())
      )
        return false;
      return true;
    });
  }, [products, q, categoryFilter, stockFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  // actions
  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API_URL}/mystoreapi/products/${id}`, {
        withCredentials: true,
      });
      setProducts((p) => p.filter((x) => x._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  }

  async function handleToggleStock(p: ProductBrief) {
    try {
      const newStock = p.stock > 0 ? 0 : 1;
      await axios.put(
        `${API_URL}/mystoreapi/products/${p._id}`,
        { stock: newStock },
        { withCredentials: true }
      );
      setProducts((prev) =>
        prev.map((x) => (x._id === p._id ? { ...x, stock: newStock } : x))
      );
      toast.success(newStock === 0 ? "Marked out of stock" : "Marked in stock");
    } catch {
      toast.error("Update failed");
    }
  }

  const handleEdit = (id: string) => navigate(`/dashboard/products/edit/${id}`);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Products
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Search, filter, and manage products
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/dashboard/products/add"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            <Plus size={16} /> Add product
          </Link>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products..."
          className="p-2 border rounded bg-gray-50 dark:bg-gray-700"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border rounded bg-gray-50 dark:bg-gray-700"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={stockFilter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setStockFilter(e.target.value as StockFilter)
          }
          className="p-2 border rounded bg-gray-50 dark:bg-gray-700"
        >
          <option value="all">All stock</option>
          <option value="in">In stock</option>
          <option value="out">Out of stock</option>
        </select>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setQ("");
              setCategoryFilter("");
              setStockFilter("all");
            }}
            className="px-3 py-2 border rounded bg-gray-50 dark:bg-gray-700"
          >
            Reset
          </button>
          <div className="ml-auto text-sm text-gray-600 dark:text-gray-300">
            Showing {filtered.length} results
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6">
        {loading ? (
          <div className="p-6 text-center">Loading…</div>
        ) : (
          <ProductTable
            products={pageItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStock={handleToggleStock}
          />
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Page {page} of {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-3 py-1 border rounded bg-gray-50 dark:bg-gray-700"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="px-3 py-1 border rounded bg-gray-50 dark:bg-gray-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
