// // src/pages/CrudProduct/ProductList.tsx
// import { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import ProductTable, { type ProductBrief } from "./ProductTable";
// import { Plus } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const PAGE_SIZE = 8;

// export default function ProductListPage() {
//   const API_URL = import.meta.env.VITE_API_URL ?? "";
//   const navigate = useNavigate();

//   const [products, setProducts] = useState<ProductBrief[]>([]);
//   const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
//     []
//   );
//   const [loading, setLoading] = useState<boolean>(true);

//   // controls
//   const [q, setQ] = useState<string>("");
//   const [categoryFilter, setCategoryFilter] = useState<string>("");
//   const [stockFilter, setStockFilter] = useState<"all" | "in" | "out">("all");
//   const [page, setPage] = useState<number>(1);
//   type StockFilter = "all" | "in" | "out";
//   useEffect(() => {
//     (async () => {
//       setLoading(true);
//       try {
//         const [pRes, cRes] = await Promise.all([
//           axios.get(`${API_URL}/api/products`, {
//             withCredentials: true,
//           }),
//           axios.get(`${API_URL}/api/categories`),
//         ]);
//         setProducts(pRes.data.products ?? []);
//         setCategories(cRes.data.categories ?? []);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [API_URL]);

//   // derived filtered list
//   const filtered = useMemo(() => {
//     return products.filter((p) => {
//       if (categoryFilter && p.category?._id !== categoryFilter) return false;
//       if (stockFilter === "in" && p.stock <= 0) return false;
//       if (stockFilter === "out" && p.stock > 0) return false;
//       if (
//         q &&
//         !`${p.name} ${p.description ?? ""} ${p.category?.name ?? ""}`
//           .toLowerCase()
//           .includes(q.toLowerCase())
//       )
//         return false;
//       return true;
//     });
//   }, [products, q, categoryFilter, stockFilter]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
//   useEffect(() => {
//     if (page > totalPages) setPage(1);
//   }, [totalPages]);

//   const pageItems = useMemo(() => {
//     const start = (page - 1) * PAGE_SIZE;
//     return filtered.slice(start, start + PAGE_SIZE);
//   }, [filtered, page]);

//   // actions
//   async function handleDelete(id: string) {
//     if (!confirm("Delete this product?")) return;
//     try {
//       await axios.delete(`${API_URL}/api/products/${id}`, {
//         withCredentials: true,
//       });
//       setProducts((p) => p.filter((x) => x._id !== id));
//       toast.success("Deleted");
//     } catch {
//       toast.error("Delete failed");
//     }
//   }

//   async function handleToggleStock(p: ProductBrief) {
//     try {
//       const newStock = p.stock > 0 ? 0 : 1;
//       await axios.put(
//         `${API_URL}/api/products/${p._id}`,
//         { stock: newStock },
//         { withCredentials: true }
//       );
//       setProducts((prev) =>
//         prev.map((x) => (x._id === p._id ? { ...x, stock: newStock } : x))
//       );
//       toast.success(newStock === 0 ? "Marked out of stock" : "Marked in stock");
//     } catch {
//       toast.error("Update failed");
//     }
//   }

//   const handleEdit = (id: string) => navigate(`/dashboard/products/edit/${id}`);

//   return (
//     <div className="p-6">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-black ">Products</h1>
//           <p className="text-sm text-gray-500 ">
//             Search, filter, and manage products
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <Link
//             to="/dashboard/products/add"
//             className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
//           >
//             <Plus size={16} /> Add product
//           </Link>
//         </div>
//       </div>

//       {/* Controls */}
//       <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
//         <input
//           value={q}
//           onChange={(e) => setQ(e.target.value)}
//           placeholder="Search products..."
//           className="p-2 border rounded bg-gray-50 dark:bg-gray-700"
//         />
//         <select
//           value={categoryFilter}
//           onChange={(e) => setCategoryFilter(e.target.value)}
//           className="p-2 border rounded bg-gray-50 dark:bg-gray-700"
//         >
//           <option value="">All categories</option>
//           {categories.map((c) => (
//             <option key={c._id} value={c._id}>
//               {c.name}
//             </option>
//           ))}
//         </select>
//         <select
//           value={stockFilter}
//           onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
//             setStockFilter(e.target.value as StockFilter)
//           }
//           className="p-2 border rounded bg-gray-50 dark:bg-gray-700"
//         >
//           <option value="all">All stock</option>
//           <option value="in">In stock</option>
//           <option value="out">Out of stock</option>
//         </select>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => {
//               setQ("");
//               setCategoryFilter("");
//               setStockFilter("all");
//             }}
//             className="px-3 py-2 border rounded bg-gray-50 dark:bg-gray-700"
//           >
//             Reset
//           </button>
//           <div className="ml-auto text-sm text-gray-600 dark:text-gray-300">
//             Showing {filtered.length} results
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="mt-6">
//         {loading ? (
//           <div className="p-6 text-center">Loading…</div>
//         ) : (
//           <ProductTable
//             products={pageItems}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//             onToggleStock={handleToggleStock}
//           />
//         )}
//       </div>

//       {/* Pagination */}
//       <div className="mt-6 flex items-center justify-between">
//         <div className="text-sm text-gray-600 dark:text-gray-300">
//           Page {page} of {totalPages}
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             disabled={page <= 1}
//             className="px-3 py-1 border rounded bg-gray-50 dark:bg-gray-700"
//           >
//             Prev
//           </button>
//           <button
//             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//             disabled={page >= totalPages}
//             className="px-3 py-1 border rounded bg-gray-50 dark:bg-gray-700"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
///////////////////// Updates ui
// src/pages/CrudProduct/ProductList.tsx
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ProductTable, { type ProductBrief } from "./ProductTable";
import { Plus, Search, Filter, X, Package } from "lucide-react";
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

  // Filters
  const [q, setQ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stockFilter, setStockFilter] = useState<"all" | "in" | "out">("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [pRes, cRes] = await Promise.all([
          axios.get(`${API_URL}/api/products`, { withCredentials: true }),
          axios.get(`${API_URL}/api/categories`),
        ]);
        setProducts(pRes.data.products ?? []);
        setCategories(cRes.data.categories ?? []);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    })();
  }, [API_URL]);

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

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product permanently?")) return;
    try {
      await axios.delete(`${API_URL}/api/products/${id}`, {
        withCredentials: true,
      });
      setProducts((p) => p.filter((x) => x._id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleToggleStock = async (p: ProductBrief) => {
    try {
      const newStock = p.stock > 0 ? 0 : 10;
      await axios.put(
        `${API_URL}/api/products/${p._id}`,
        { stock: newStock },
        { withCredentials: true }
      );
      setProducts((prev) =>
        prev.map((x) => (x._id === p._id ? { ...x, stock: newStock } : x))
      );
      toast.success(newStock === 0 ? "Marked out of stock" : "Back in stock");
    } catch {
      toast.error("Update failed");
    }
  };

  const handleEdit = (id: string) => navigate(`/dashboard/products/edit/${id}`);

  const resetFilters = () => {
    setQ("");
    setCategoryFilter("");
    setStockFilter("all");
    setPage(1);
  };

  // Skeleton Row Component
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
          <div>
            <div className="h-5 bg-gray-200 rounded w-48"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mt-2"></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-8">
        <div className="h-5 bg-gray-200 rounded w-24"></div>
      </td>
      <td className="px-6 py-8">
        <div className="h-10 bg-gray-200 rounded-full w-20"></div>
      </td>
      <td className="px-6 py-8">
        <div className="h-5 bg-gray-200 rounded w-16"></div>
      </td>
      <td className="px-6 py-8">
        <div className="flex gap-2">
          <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
          <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
          <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Package className="w-9 h-9 text-sky-600" />
            Products
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and organize your product catalog
          </p>
        </div>
        <Link
          to="/dashboard/products/add"
          className="inline-flex items-center gap-3 bg-linear-to-r from-black to-gray-800 text-white px-6 py-3.5 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition min-w-[180px]"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as any)}
              className="px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition"
            >
              <option value="all">All Stock</option>
              <option value="in">In Stock</option>
              <option value="out">Out of Stock</option>
            </select>

            <button
              onClick={resetFilters}
              className="px-5 py-3.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Reset
            </button>
          </div>

          <div className="text-sm text-gray-600 self-center">
            {filtered.length} product{filtered.length !== 1 && "s"} found
          </div>
        </div>
      </div>

      {/* Table with Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <table className="w-full">
            <tbody>
              {[...Array(6)].map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </tbody>
          </table>
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
      {!loading && totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Page <span className="font-semibold">{page}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
