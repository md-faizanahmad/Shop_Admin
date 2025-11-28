// import { Pencil, Trash2, Slash, Eye } from "lucide-react";
// import { Link } from "react-router-dom";

// export type ProductBrief = {
//   _id: string;
//   name: string;
//   description?: string;
//   price: number;
//   stock: number;
//   category?: { _id: string; name: string } | null;
//   imageUrl: string;
// };

// type Props = {
//   products: ProductBrief[];
//   onEdit: (id: string) => void;
//   onDelete: (id: string) => void;
//   onToggleStock: (p: ProductBrief) => void;
// };

// export default function ProductTable({
//   products,
//   onEdit,
//   onDelete,
//   onToggleStock,
// }: Props) {
//   return (
//     <>
//       {/* DESKTOP TABLE */}
//       <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow border">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
//             <tr>
//               <th className="p-4 text-left w-[280px]">Product</th>
//               <th className="p-4 text-left">Category</th>
//               <th className="p-4 text-right">Price</th>
//               <th className="p-4 text-center">Stock</th>
//               <th className="p-4 text-center w-[220px]">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.map((p) => (
//               <tr key={p._id} className="border-t hover:bg-gray-50 transition">
//                 {/* Product */}
//                 <td className="p-4 flex gap-3 items-start">
//                   <img
//                     src={p.imageUrl}
//                     alt={p.name}
//                     className="w-14 h-14 rounded border object-cover"
//                   />

//                   <div className="flex flex-col">
//                     <span className="font-semibold text-gray-900">
//                       {p.name}
//                     </span>

//                     {/* Description with MORE/LESS */}
//                     <details className="text-xs text-gray-600 mt-1">
//                       <summary className="cursor-pointer text-blue-600">
//                         Description
//                       </summary>
//                       <p className="mt-1 leading-snug">
//                         {p.description || "No description"}
//                       </p>
//                     </details>
//                   </div>
//                 </td>

//                 {/* Category */}
//                 <td className="p-4 text-gray-700">{p.category?.name || "-"}</td>

//                 {/* Price */}
//                 <td className="p-4 text-right font-bold text-green-600">
//                   ₹{p.price.toLocaleString()}
//                 </td>

//                 {/* Stock */}
//                 <td
//                   className={`p-4 text-center font-semibold ${
//                     p.stock === 0 ? "text-red-600" : "text-sky-700"
//                   }`}
//                 >
//                   {p.stock}
//                 </td>

//                 {/* ACTIONS */}
//                 <td className="p-4">
//                   <div className="flex justify-center gap-4">
//                     {/* VIEW */}
//                     <Link
//                       to={`/dashboard/products/view/${p._id}`}
//                       className="text-sky-700 hover:text-sky-900"
//                     >
//                       <Eye size={18} />
//                     </Link>

//                     {/* EDIT */}
//                     <button
//                       onClick={() => onEdit(p._id)}
//                       className="text-blue-600 hover:text-blue-800"
//                     >
//                       <Pencil size={18} />
//                     </button>

//                     {/* STOCK */}
//                     <button
//                       onClick={() => onToggleStock(p)}
//                       className="text-yellow-600 hover:text-yellow-700"
//                     >
//                       <Slash size={18} />
//                     </button>

//                     {/* DELETE */}
//                     <button
//                       onClick={() => onDelete(p._id)}
//                       className="text-red-700 hover:text-red-900"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* MOBILE VIEW */}
//       <div className="md:hidden grid gap-4">
//         {products.map((p) => (
//           <div
//             key={p._id}
//             className="bg-white p-4 rounded-xl shadow border flex gap-3"
//           >
//             <img
//               src={p.imageUrl}
//               alt={p.name}
//               className="w-24 h-24 object-cover rounded border"
//             />

//             <div className="flex-1 flex flex-col justify-between">
//               {/* Top section */}
//               <div>
//                 <div className="font-bold text-gray-900 text-base">
//                   {p.name}
//                 </div>

//                 <div className="text-xs text-gray-500">{p.category?.name}</div>

//                 <div className="font-bold text-green-600 mt-1">
//                   ₹{p.price.toLocaleString()}
//                 </div>

//                 <div
//                   className={`text-sm mt-1 font-semibold ${
//                     p.stock === 0 ? "text-red-600" : "text-sky-700"
//                   }`}
//                 >
//                   Stock: {p.stock}
//                 </div>

//                 {/* Mobile - More/Less description */}
//                 <details className="text-xs text-gray-600 mt-2">
//                   <summary className="cursor-pointer text-blue-600">
//                     View Details
//                   </summary>

//                   <p className="mt-1">{p.description || "No description"}</p>
//                 </details>
//               </div>

//               {/* ACTION BUTTONS */}
//               <div className="flex justify-between mt-3 text-sm">
//                 <button
//                   onClick={() => onEdit(p._id)}
//                   className="text-blue-600 flex items-center gap-1"
//                 >
//                   <Pencil size={14} /> Edit
//                 </button>

//                 <Link
//                   to={`/dashboard/products/view/${p._id}`}
//                   className="text-sky-700 flex items-center gap-1"
//                 >
//                   <Eye size={14} /> View
//                 </Link>

//                 <button
//                   onClick={() => onToggleStock(p)}
//                   className="text-yellow-600 flex items-center gap-1"
//                 >
//                   <Slash size={14} />
//                   {p.stock === 0 ? "In" : "Out"}
//                 </button>

//                 <button
//                   onClick={() => onDelete(p._id)}
//                   className="text-red-700 flex items-center gap-1"
//                 >
//                   <Trash2 size={14} /> Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }
/////////////////////////////////////////// updated
import {
  Pencil,
  Eye,
  Trash2,
  Package,
  Undo2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export type ProductBrief = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: { _id: string; name: string } | null;
  imageUrl: string;
  isDeleted?: boolean;
  deletedAt?: string | null;
};

type Props = {
  products: ProductBrief[];
  onEdit: (id: string) => void;
  onToggleStock: (p: ProductBrief) => void;
  onSoftDelete: (id: string) => void;
  onRestore: (id: string) => void;
};

// Confirmation Dialog Component
const ConfirmDialog = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger", // danger | warning | success
}: {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "success";
}) => {
  if (!isOpen) return null;

  const variants = {
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-yellow-600 hover:bg-yellow-700 text-white",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="mt-3 text-sm text-gray-600">{message}</p>

        <div className="mt-6 flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-xl font-medium text-white ${variants[variant]} transition transform hover:scale-105 active:scale-95`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ProductTable({
  products,
  onEdit,
  onToggleStock,
  onSoftDelete,
  onRestore,
}: Props) {
  // Confirmation state
  const [confirm, setConfirm] = useState<{
    isOpen: boolean;
    type: "delete" | "toggleStock" | "restore";
    product?: ProductBrief;
  }>({ isOpen: false, type: "delete" });

  const openConfirm = (
    type: "delete" | "toggleStock" | "restore",
    product?: ProductBrief
  ) => {
    setConfirm({ isOpen: true, type, product });
  };

  const closeConfirm = () => {
    setConfirm({ isOpen: false, type: "delete", product: undefined });
  };

  const handleConfirm = () => {
    if (!confirm.product) return;

    if (confirm.type === "delete") {
      onSoftDelete(confirm.product._id);
    } else if (confirm.type === "toggleStock") {
      onToggleStock(confirm.product);
    } else if (confirm.type === "restore") {
      onRestore(confirm.product._id);
    }
    closeConfirm();
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
        <Package className="mx-auto h-16 w-16 text-gray-400" />
        <p className="mt-4 text-lg font-medium text-gray-600">
          No products found
        </p>
        <p className="text-sm text-gray-500">
          Try adjusting your filters or add a new product.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop & Tablet */}
      <div className="hidden lg:block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-linear-to-r from-blue-50 to-sky-50 text-left text-sm font-bold uppercase tracking-wider text-blue-800">
                <th className="px-6 py-5">Product</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5 text-right">Price</th>
                <th className="px-6 py-5 text-center">Stock</th>
                <th className="px-6 py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p) => (
                <tr
                  key={p._id}
                  className="hover:bg-blue-50/30 transition-all duration-200"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="h-16 w-16 rounded-xl border border-gray-200 object-cover shadow-md"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 text-lg">
                          {p.name}
                        </p>
                        {p.description && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                            {p.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span className="text-sm font-medium text-gray-700">
                      {p.category?.name || (
                        <span className="text-gray-400 italic">
                          Uncategorized
                        </span>
                      )}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <span className="font-bold text-xl text-blue-700">
                      ₹{p.price.toLocaleString("en-IN")}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-bold ${
                        p.stock === 0
                          ? "bg-red-100 text-red-700"
                          : p.stock < 10
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {p.stock === 0 ? "Out of Stock" : p.stock}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center items-center gap-3">
                      {/* View - No Confirm */}
                      <Link
                        to={`/dashboard/products/view/${p._id}`}
                        className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition transform hover:scale-105 shadow-md"
                      >
                        <Eye size={18} />
                        <span className="font-medium">View</span>
                      </Link>

                      {/* Edit */}
                      <button
                        onClick={() => onEdit(p._id)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition transform hover:scale-105 shadow-md"
                        title="Edit Product"
                      >
                        <Pencil size={18} />
                        <span className="font-medium">Edit</span>
                      </button>

                      {/* Toggle Stock */}
                      <button
                        onClick={() => openConfirm("toggleStock", p)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-xl hover:bg-gray-800 transition transform hover:scale-105 shadow-md"
                        title={
                          p.stock === 0
                            ? "Mark as In Stock"
                            : "Mark as Out of Stock"
                        }
                      >
                        {p.stock === 0 ? (
                          <ToggleRight size={18} />
                        ) : (
                          <ToggleLeft size={18} />
                        )}
                        <span className="font-medium">
                          {p.stock === 0 ? "In Stock" : "Out"}
                        </span>
                      </button>

                      {/* Soft Delete / Restore */}
                      {!p.isDeleted ? (
                        <button
                          onClick={() => openConfirm("delete", p)}
                          className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition transform hover:scale-105 shadow-md"
                        >
                          <Trash2 size={18} />
                          <span className="font-medium">Delete</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => openConfirm("restore", p)}
                          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition transform hover:scale-105 shadow-md"
                        >
                          <Undo2 size={18} />
                          <span className="font-medium">Restore</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden grid gap-5">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          >
            <div className="p-5">
              <div className="flex gap-4">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="h-24 w-24 rounded-xl object-cover shadow-lg border border-gray-200"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-900">{p.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {p.category?.name || "Uncategorized"}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-700">
                      ₹{p.price.toLocaleString("en-IN")}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${
                        p.stock === 0
                          ? "bg-red-100 text-red-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {p.stock || "Out"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-r from-blue-50 to-sky-50 px-5 py-5 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to={`/dashboard/products/view/${p._id}`}
                  className="flex flex-col items-center justify-center gap-2 py-4 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition transform hover:scale-105 shadow-lg"
                >
                  <Eye size={22} />
                  <span className="font-semibold">View</span>
                </Link>

                <button
                  onClick={() => onEdit(p._id)}
                  className="flex flex-col items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition transform hover:scale-105 shadow-lg"
                >
                  <Pencil size={22} />
                  <span className="font-semibold">Edit</span>
                </button>

                <button
                  onClick={() => openConfirm("toggleStock", p)}
                  className="flex flex-col items-center justify-center gap-2 py-4 bg-black text-white rounded-xl hover:bg-gray-900 transition transform hover:scale-105 shadow-lg"
                >
                  {p.stock === 0 ? (
                    <ToggleRight size={22} />
                  ) : (
                    <ToggleLeft size={22} />
                  )}
                  <span className="font-semibold">
                    {p.stock === 0 ? "In Stock" : "Out"}
                  </span>
                </button>

                {!p.isDeleted ? (
                  <button
                    onClick={() => openConfirm("delete", p)}
                    className="flex flex-col items-center justify-center gap-2 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition transform hover:scale-105 shadow-lg"
                  >
                    <Trash2 size={22} />
                    <span className="font-semibold">Delete</span>
                  </button>
                ) : (
                  <button
                    onClick={() => openConfirm("restore", p)}
                    className="flex flex-col items-center justify-center gap-2 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition transform hover:scale-105 shadow-lg"
                  >
                    <Undo2 size={22} />
                    <span className="font-semibold">Restore</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirm.isOpen}
        title={
          confirm.type === "delete"
            ? "Delete Product?"
            : confirm.type === "toggleStock"
            ? "Change Stock Status?"
            : "Restore Product?"
        }
        message={
          confirm.type === "delete"
            ? `Are you sure you want to soft delete "${confirm.product?.name}"?`
            : confirm.type === "toggleStock"
            ? `Mark "${confirm.product?.name}" as ${
                confirm.product?.stock === 0 ? "In Stock" : "Out of Stock"
              }?`
            : `Restore "${confirm.product?.name}" to active products?`
        }
        onConfirm={handleConfirm}
        onCancel={closeConfirm}
        confirmText="Yes, Confirm"
        variant={
          confirm.type === "delete"
            ? "danger"
            : confirm.type === "restore"
            ? "success"
            : "warning"
        }
      />
    </>
  );
}
