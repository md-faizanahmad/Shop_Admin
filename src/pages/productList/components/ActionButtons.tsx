// import { Link } from "react-router-dom";
// import {
//   Eye,
//   Pencil,
//   ToggleLeft,
//   ToggleRight,
//   Trash2,
//   Undo2,
//   Archive,
// } from "lucide-react";
// import type { ProductBrief } from "@/types/product";

// interface Props {
//   product: ProductBrief;
//   onEdit: (id: string) => void;
//   onToggleStock: () => void;
//   onArchive: () => void;
//   onRestore: () => void;
//   onPermanentDelete: () => void;
// }

// export default function ActionButtons({
//   product,
//   onEdit,
//   onToggleStock,
//   onArchive,
//   onRestore,
//   onPermanentDelete,
// }: Props) {
//   return (
//     <>
//       <Link
//         to={`/dashboard/products/view/${product._id}`}
//         className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition text-sm font-medium"
//       >
//         <Eye className="w-4 h-4" />
//       </Link>

//       <button
//         title="Edit-Product"
//         onClick={() => onEdit(product._id)}
//         className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm font-medium"
//       >
//         <Pencil className="w-4 h-4" />
//       </button>

//       <button
//         title="Stock Change"
//         onClick={onToggleStock}
//         className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-black transition text-sm font-medium"
//       >
//         {product.stock > 0 ? (
//           <ToggleLeft className="w-4 h-4" />
//         ) : (
//           <ToggleRight className="w-4 h-4" />
//         )}
//         {product.stock > 0 ? "Out" : "In Stock"}
//       </button>

//       {product.isArchived ? (
//         <>
//           <button
//             title="Restore-Product"
//             onClick={onRestore}
//             className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition text-sm font-medium"
//           >
//             <Undo2 className="w-4 h-4" />
//           </button>
//           <button
//             title="Permanent-Product-Delete"
//             onClick={onPermanentDelete}
//             className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition text-sm font-medium"
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         </>
//       ) : (
//         <button
//           title="Archive-Product"
//           onClick={onArchive}
//           className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition text-sm font-medium"
//         >
//           <Archive className="w-4 h-4" />
//         </button>
//       )}
//     </>
//   );
// }

///// responsive for mobile

import { Link } from "react-router-dom";
import {
  Eye,
  Pencil,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Undo2,
  Archive,
} from "lucide-react";
import type { ProductBrief } from "@/types/product";

interface Props {
  product: ProductBrief;
  onEdit: (id: string) => void;
  onToggleStock: () => void;
  onArchive: () => void;
  onRestore: () => void;
  onPermanentDelete: () => void;
}

export default function ActionButtons({
  product,
  onEdit,
  onToggleStock,
  onArchive,
  onRestore,
  onPermanentDelete,
}: Props) {
  const isOut = product.stock <= 0;

  return (
    <div
      className="
        flex flex-wrap gap-2
        md:flex-nowrap md:gap-3
      "
    >
      {/* VIEW */}
      <Link
        to={`/dashboard/products/view/${product._id}`}
        className="
          flex items-center gap-1 px-3 py-2 rounded-lg text-white bg-sky-600
          hover:bg-sky-700 transition text-xs font-semibold
          md:px-4 md:py-2 md:text-sm
        "
      >
        <Eye className="w-4 h-4" />
        <span className="hidden md:inline">View</span>
      </Link>

      {/* EDIT */}
      <button
        onClick={() => onEdit(product._id)}
        className="
          flex items-center gap-1 px-3 py-2 rounded-lg text-white bg-blue-600
          hover:bg-blue-700 transition text-xs font-semibold
          md:px-4 md:py-2 md:text-sm
        "
      >
        <Pencil className="w-4 h-4" />
        <span className="hidden md:inline">Edit</span>
      </button>

      {/* STOCK TOGGLE */}
      <button
        onClick={onToggleStock}
        className="
          flex items-center gap-1 px-3 py-2 rounded-lg text-white bg-gray-800
          hover:bg-black transition text-xs font-semibold
          md:px-4 md:py-2 md:text-sm
        "
      >
        {isOut ? (
          <ToggleRight className="w-4 h-4" />
        ) : (
          <ToggleLeft className="w-4 h-4" />
        )}
        <span className="hidden md:inline">{isOut ? "In Stock" : "Out"}</span>
      </button>

      {/* ARCHIVED STATE */}
      {product.isArchived ? (
        <>
          {/* RESTORE */}
          <button
            onClick={onRestore}
            className="
              flex items-center gap-1 px-3 py-2 rounded-lg text-white bg-emerald-600
              hover:bg-emerald-700 transition text-xs font-semibold
              md:px-4 md:py-2 md:text-sm
            "
          >
            <Undo2 className="w-4 h-4" />
            <span className="hidden md:inline">Restore</span>
          </button>

          {/* PERMANENT DELETE */}
          <button
            onClick={onPermanentDelete}
            className="
              flex items-center gap-1 px-3 py-2 rounded-lg text-white bg-red-600
              hover:bg-red-700 transition text-xs font-semibold
              md:px-4 md:py-2 md:text-sm
            "
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden md:inline">Delete</span>
          </button>
        </>
      ) : (
        /* ARCHIVE */
        <button
          onClick={onArchive}
          className="
            flex items-center gap-1 px-3 py-2 rounded-lg text-white bg-orange-600
            hover:bg-orange-700 transition text-xs font-semibold
            md:px-4 md:py-2 md:text-sm
          "
        >
          <Archive className="w-4 h-4" />
          <span className="hidden md:inline">Archive</span>
        </button>
      )}
    </div>
  );
}
