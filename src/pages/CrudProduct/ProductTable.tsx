// src/pages/CrudProduct/ProductTable.tsx
import { Pencil, Trash2, Slash } from "lucide-react";

export type ProductBrief = {
  _1d: string;
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: { _id: string; name: string } | null;
  imageUrl: string;
};

type Props = {
  products: ProductBrief[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStock: (p: ProductBrief) => void;
};

export default function ProductTable({
  products,
  onEdit,
  onDelete,
  onToggleStock,
}: Props) {
  return (
    <>
      <div className="hidden md:block overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3 text-center">Stock</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className={`border-t hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  p.stock === 0 ? "opacity-70" : ""
                }`}
              >
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-100">
                      {p.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">
                      {p.description?.slice(0, 80)}
                    </div>
                  </div>
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {p.category?.name ?? "-"}
                </td>
                <td className="p-3 text-right font-semibold text-green-600">
                  ₹{p.price.toLocaleString()}
                </td>
                <td className="p-3 text-center">{p.stock}</td>
                <td className="p-3 text-center flex items-center justify-center gap-3">
                  <button
                    onClick={() => onEdit(p._id)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => onToggleStock(p)}
                    className="text-yellow-600 hover:text-yellow-800 flex items-center gap-1"
                  >
                    <Slash size={16} />
                    {p.stock === 0 ? "Mark In" : "Out of Stock"}
                  </button>
                  <button
                    onClick={() => onDelete(p._1d ?? p._id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden grid gap-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex gap-4"
          >
            <img
              src={p.imageUrl}
              alt={p.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-100">
                    {p.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-300">
                    {p.category?.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">₹{p.price}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    Stock: {p.stock}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => onEdit(p._id)}
                  className="text-blue-600 text-sm flex items-center gap-1"
                >
                  <Pencil size={14} />
                  Edit
                </button>
                <button
                  onClick={() => onToggleStock(p)}
                  className="text-yellow-600 text-sm flex items-center gap-1"
                >
                  <Slash size={14} />
                  {p.stock === 0 ? "Mark In" : "Out"}
                </button>
                <button
                  onClick={() => onDelete(p._id)}
                  className="text-red-600 text-sm flex items-center gap-1"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
