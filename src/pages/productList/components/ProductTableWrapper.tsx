// src/pages/products/components/ProductTableWrapper.tsx

import { api } from "@/lib/api";
import { toast } from "react-toastify";
import type { ProductBrief } from "@/types/product";
import TableSkeleton from "./TableSkeleton";
import ProductTable from "./ProductTable";
import Pagination from "@/ui/Pagination";
import { useNavigate } from "react-router-dom";

interface Props {
  products: ProductBrief[];
  setProducts: React.Dispatch<React.SetStateAction<ProductBrief[]>>;
  loading: boolean;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  fetchProducts: () => Promise<void>; // still used for filters/pagination, not actions
}

export default function ProductTableWrapper({
  products,
  setProducts,
  loading,
  page,
  totalPages,
  setPage,
}: // keep for pagination etc., but we won’t call it from actions
Props) {
  const navigate = useNavigate();
  const handleEdit = (id: string) => navigate(`/dashboard/products/edit/${id}`);

  // ===== Toggle Stock (NO refetch) =====
  const handleToggleStock = async (product: ProductBrief) => {
    const nextStock = product.stock > 0 ? 0 : 10;

    // optimistic
    setProducts((prev) =>
      prev.map((p) => (p._id === product._id ? { ...p, stock: nextStock } : p))
    );

    try {
      await api.put(`/v1/products/${product._id}`, { stock: nextStock });
      toast.success(
        nextStock > 0 ? "Product back in stock" : "Product marked out of stock"
      );
    } catch (err) {
      console.error("Failed to update stock", err);
      toast.error("Failed to update stock");

      // rollback
      setProducts((prev) =>
        prev.map((p) =>
          p._id === product._id ? { ...p, stock: product.stock } : p
        )
      );
    }
  };

  // ===== Archive (NO refetch) =====
  const handleArchive = async (id: string) => {
    // optimistic
    setProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, isArchived: true } : p))
    );

    try {
      await api.delete(`/v1/products/${id}`);
      toast.success("Product archived");
    } catch (err) {
      console.error("Failed to archive product", err);
      toast.error("Failed to archive product");

      // rollback
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, isArchived: false } : p))
      );
    }
  };

  // ===== Restore (NO refetch) =====
  const handleRestore = async (id: string) => {
    // optimistic
    setProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, isArchived: false } : p))
    );

    try {
      await api.patch(`/v1/products/${id}/restore`);
      toast.success("Product restored");
    } catch (err) {
      console.error("Failed to restore product", err);
      toast.error("Failed to restore product");

      // rollback
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, isArchived: true } : p))
      );
    }
  };

  // ===== Permanent Delete (NO refetch) =====
  const handlePermanentDelete = async (id: string) => {
    const previous = products;

    // optimistic remove
    setProducts((prev) => prev.filter((p) => p._id !== id));

    try {
      await api.delete(`/v1/products/${id}/force`);
      toast.success("Product permanently deleted");
      // you *can* optionally call fetchProducts() here if you need totalPages updated,
      // but given your API inconsistency, I’d skip it for now.
    } catch (err) {
      console.error("Failed to permanently delete product", err);
      toast.error("Failed to delete product");

      // rollback
      setProducts(previous);
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8">
            <TableSkeleton />
          </div>
        ) : products.length === 0 ? (
          <div className="p-20 text-center">
            <div className="bg-gray-100 w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6">
              <span className="text-4xl text-gray-400">📦</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700">
              No products found
            </h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <ProductTable
              products={products}
              onEdit={handleEdit}
              onToggleStock={handleToggleStock}
              onArchive={handleArchive}
              onRestore={handleRestore}
              onPermanentDelete={handlePermanentDelete}
            />
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        loading={loading}
      />
    </div>
  );
}
