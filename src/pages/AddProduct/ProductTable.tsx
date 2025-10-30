import React from "react";
import type { Product } from "@/types/product";
import { Edit3, Trash2 } from "lucide-react";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto mt-1">
      <table className="min-w-full border border-gray-200 text-sm md:text-base">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left hidden sm:table-cell">Category</th>
            <th className="p-3 text-left hidden sm:table-cell">Price</th>
            <th className="p-3 text-left hidden sm:table-cell">Image</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-b hover:bg-gray-50 transition">
              <td className="p-3">{p.name}</td>
              <td className="p-3 hidden sm:table-cell">
                {p.category?.name || "-"}
              </td>
              <td className="p-3 hidden sm:table-cell">₹{p.price}</td>
              <td className="p-3 hidden sm:table-cell">
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-10 w-10 rounded object-cover"
                  />
                )}
              </td>
              <td className="p-3 flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(p)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <Edit3 size={18} />
                </button>
                <button
                  onClick={() => onDelete(p._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
