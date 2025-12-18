// // src/components/ProductTable.tsx
// import { Trash2, Package } from "lucide-react";
// import { Link } from "react-router-dom";
// import type { ProductBrief } from "@/types/product";
// import { useState } from "react";
// import ConfirmDialog from "@/ui/ConfirmDialog";

// type ActionType = "archive" | "restore" | "permanentDelete" | "toggleStock";

// interface ProductTableProps {
//   products: ProductBrief[];
//   onEdit: (id: string) => void;
//   onToggleStock: (p: ProductBrief) => void;
//   onArchive: (id: string) => void;
//   onRestore: (id: string) => void;
//   onPermanentDelete: (id: string) => void;
// }

// export default function ProductTable({
//   products,
//   onEdit,
//   onToggleStock,
//   onArchive,
//   onRestore,
//   onPermanentDelete,
// }: ProductTableProps) {
//   const [dialog, setDialog] = useState<{
//     open: boolean;
//     type: ActionType;
//     product?: ProductBrief;
//   }>({ open: false, type: "archive" });

//   const openDialog = (type: ActionType, product?: ProductBrief) => {
//     setDialog({ open: true, type, product });
//   };

//   const closeDialog = () => setDialog({ open: false, type: "archive" });

//   const handleConfirm = () => {
//     if (!dialog.product) return;

//     if (dialog.type === "archive") onArchive(dialog.product._id);
//     else if (dialog.type === "restore") onRestore(dialog.product._id);
//     else if (dialog.type === "permanentDelete")
//       onPermanentDelete(dialog.product._id);
//     else if (dialog.type === "toggleStock") onToggleStock(dialog.product);

//     closeDialog();
//   };

//   if (products.length === 0) {
//     return (
//       <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
//         <Package className="mx-auto h-16 w-16 text-gray-400" />
//         <p className="mt-4 text-lg font-medium text-gray-600">
//           No products found
//         </p>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Desktop Table */}
//       <div className="hidden lg:block overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
//         <table className="w-full">
//           <thead className="bg-linear-to-r from-blue-50 to-sky-50 text-left text-sm font-bold uppercase text-blue-800">
//             <tr>
//               <th className="px-6 py-4">Product</th>
//               <th className="px-6 py-4">Category</th>
//               <th className="px-6 py-4 text-right">Price</th>
//               <th className="px-6 py-4 text-center">Stock</th>
//               <th className="px-6 py-4 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {products.map((p) => (
//               <ProductRow
//                 key={p._id}
//                 product={p}
//                 onEdit={onEdit}
//                 onToggleStock={() => openDialog("toggleStock", p)}
//                 onArchive={() => openDialog("archive", p)}
//                 onRestore={() => openDialog("restore", p)}
//                 onPermanentDelete={() => openDialog("permanentDelete", p)}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile Cards */}
//       <div className="lg:hidden space-y-4">
//         {products.map((p) => (
//           <ProductCard
//             key={p._id}
//             product={p}
//             onEdit={onEdit}
//             onToggleStock={() => openDialog("toggleStock", p)}
//             onArchive={() => openDialog("archive", p)}
//             onRestore={() => openDialog("restore", p)}
//             onPermanentDelete={() => openDialog("permanentDelete", p)}
//           />
//         ))}
//       </div>

//       {/* Unified Confirm Dialog */}
//       <ConfirmDialog
//         open={dialog.open}
//         title={
//           dialog.type === "archive"
//             ? "Archive Product"
//             : dialog.type === "permanentDelete"
//             ? "PERMANENT DELETE"
//             : dialog.type === "restore"
//             ? "Restore Product"
//             : "Update Stock"
//         }
//         description={
//           dialog.type === "permanentDelete"
//             ? "This action CANNOT be undone. This product will be permanently deleted and cannot be recovered."
//             : dialog.type === "archive"
//             ? `Archive "${dialog.product?.name}"? It can be restored later.`
//             : dialog.type === "restore"
//             ? `Restore "${dialog.product?.name}" to active products?`
//             : `Mark "${dialog.product?.name}" as ${
//                 dialog.product?.stock === 0 ? "In Stock" : "Out of Stock"
//               }?`
//         }
//         confirmText={
//           dialog.type === "permanentDelete" ? "Yes, Delete Forever" : "Confirm"
//         }
//         variant={dialog.type === "permanentDelete" ? "danger" : "warning"}
//         autoCloseSeconds={dialog.type === "permanentDelete" ? undefined : 10}
//         onConfirm={handleConfirm}
//         onCancel={closeDialog}
//       />
//     </>
//   );
// }

// // Small reusable components
// const ProductRow = ({
//   product,
//   onEdit,
//   onToggleStock,
//   onArchive,
//   onRestore,
//   onPermanentDelete,
// }: any) => (
//   <tr className="hover:bg-blue-50/30 transition">
//     {/* ... same as before ... */}
//     <td className="px-6 py-5 text-center">
//       <div className="flex justify-center gap-2 flex-wrap">
//         <ActionButtons
//           product={product}
//           onEdit={onEdit}
//           onToggleStock={onToggleStock}
//           onArchive={onArchive}
//           onRestore={onRestore}
//           onPermanentDelete={onPermanentDelete}
//         />
//       </div>
//     </td>
//   </tr>
// );

// const ActionButtons = ({
//   product,
//   onEdit,
//   onToggleStock,
//   onArchive,
//   onRestore,
//   onPermanentDelete,
// }: any) => (
//   <>
//     <Link
//       to={`/dashboard/products/view/${product._id}`}
//       className="btn-primary"
//     >
//       View
//     </Link>
//     <button onClick={() => onEdit(product._id)} className="btn-blue">
//       Edit
//     </button>
//     <button onClick={onToggleStock} className="btn-dark">
//       {product.stock > 0 ? "Out" : "In"}
//     </button>

//     {product.isArchived ? (
//       <>
//         <button onClick={onRestore} className="btn-green">
//           Restore
//         </button>
//         <button
//           onClick={onPermanentDelete}
//           className="btn-red flex items-center gap-1"
//         >
//           <Trash2 className="w-4 h-4" /> Delete Forever
//         </button>
//       </>
//     ) : (
//       <button onClick={onArchive} className="btn-orange">
//         Archive
//       </button>
//     )}
//   </>
// );
