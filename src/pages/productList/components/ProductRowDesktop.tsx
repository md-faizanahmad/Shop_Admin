// // Desktop
// import type { ProductBrief } from "@/types/product";
// import ActionButtons from "./ActionButtons";

// interface Props {
//   product: ProductBrief;
//   onEdit: (id: string) => void;
//   onToggleStock: () => void;
//   onArchive: () => void;
//   onRestore: () => void;
//   onPermanentDelete: () => void;
// }

// export default function ProductRow({
//   product,
//   onEdit,
//   onToggleStock,
//   onArchive,
//   onRestore,
//   onPermanentDelete,
// }: Props) {
//   return (
//     <tr className="hover:bg-blue-50/30 transition">
//       <td className="px-6 py-5">
//         <div className="flex items-center gap-4">
//           <img
//             src={product.imageUrl}
//             alt=""
//             className="w-16 h-16 rounded-xl object-cover border"
//           />
//           <div>
//             <p className="font-semibold text-lg">{product.name}</p>
//             {product.description && (
//               <p className="text-sm text-gray-600 line-clamp-1">
//                 {product.description}
//               </p>
//             )}
//           </div>
//         </div>
//       </td>
//       <td className="px-6 py-5">{product.category?.name || "—"}</td>

//       <td className="px-6 py-5 text-right font-bold text-xl text-blue-700">
//         ₹{product.price.toLocaleString("en-IN")}
//       </td>
//       <td className="px-6 py-5 text-center">
//         <span
//           className={`px-4 py-2 rounded-full text-sm font-bold ${
//             product.stock === 0
//               ? "bg-red-100 text-red-700"
//               : "bg-emerald-100 text-emerald-700"
//           }`}
//         >
//           {product.stock || "Out"}
//         </span>
//       </td>
//       <td className="px-6 py-5">
//         <div className="flex justify-center gap-2 flex-wrap">
//           <ActionButtons
//             product={product}
//             onEdit={onEdit}
//             onToggleStock={onToggleStock}
//             onArchive={onArchive}
//             onRestore={onRestore}
//             onPermanentDelete={onPermanentDelete}
//           />
//         </div>
//       </td>
//     </tr>
//   );
// }

/////// update with sub-c
// Desktop row
import type { ProductBrief } from "@/types/product";
import ActionButtons from "./ActionButtons";

interface Props {
  product: ProductBrief;
  onEdit: (id: string) => void;
  onToggleStock: () => void;
  onArchive: () => void;
  onRestore: () => void;
  onPermanentDelete: () => void;
}

export default function ProductRow({
  product,
  onEdit,
  onToggleStock,
  onArchive,
  onRestore,
  onPermanentDelete,
}: Props) {
  const categoryName = product.category?.name || "—";
  const subcategoryName = product.subcategory?.name;

  return (
    <tr className="hover:bg-blue-50/30 transition">
      {/* Product + image */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-16 h-16 rounded-xl object-cover border"
          />
          <div>
            <p className="font-semibold text-lg">{product.name}</p>
            {product.description && (
              <p className="text-sm text-gray-600 line-clamp-1">
                {product.description}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* Category + Subcategory */}
      <td className="px-6 py-5 align-top">
        <div className="flex flex-col gap-1">
          <span className="font-medium text-gray-900">{categoryName}</span>
          {subcategoryName && (
            <span className="text-xs inline-flex max-w-max rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">
              {subcategoryName}
            </span>
          )}
        </div>
      </td>

      {/* Price */}
      <td className="px-6 py-5 text-right font-bold text-xl text-blue-700">
        ₹{product.price.toLocaleString("en-IN")}
      </td>

      {/* Stock */}
      <td className="px-6 py-5 text-center">
        <span
          className={`px-4 py-2 rounded-full text-sm font-bold ${
            product.stock === 0
              ? "bg-red-100 text-red-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {product.stock || "Out"}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex justify-center gap-2 flex-wrap">
          <ActionButtons
            product={product}
            onEdit={onEdit}
            onToggleStock={onToggleStock}
            onArchive={onArchive}
            onRestore={onRestore}
            onPermanentDelete={onPermanentDelete}
          />
        </div>
      </td>
    </tr>
  );
}
