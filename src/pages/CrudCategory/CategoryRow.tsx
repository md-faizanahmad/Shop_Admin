// // CategoryRow.tsx
// import type { Category } from "@/types/category";
// import {
//   ChevronDown,
//   ChevronRight,
//   Edit2,
//   Loader2,
//   RotateCcw,
//   Trash2,
// } from "lucide-react";

// type DeleteAction = "delete" | "restore" | "hardDelete";

// interface CategoryRowProps {
//   mainCat: Category;
//   expanded: boolean;
//   deletingId: string | null;
//   onToggleExpand: (id: string) => void;
//   onEditMain: (category: Category) => void;
//   onOpenConfirm: (id: string, action: DeleteAction) => void;
// }

// export default function CategoryRow({
//   mainCat,
//   expanded,
//   deletingId,
//   onToggleExpand,
//   onEditMain,
//   onOpenConfirm,
// }: CategoryRowProps) {
//   const allSubs = mainCat.subcategories ?? [];
//   const activeSubs = allSubs.filter((s) => !s.isDeleted);
//   const hasSubs = allSubs.length > 0;

//   return (
//     <div className="border-b last:border-b-0 border-gray-100">
//       {/* Main row (accordion header) */}
//       <div
//         role="button"
//         className={`w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-4 text-left transition ${
//           mainCat.isDeleted
//             ? "bg-red-50 border-l-4 border-red-500"
//             : "hover:bg-gray-50"
//         }`}
//         onClick={() => hasSubs && onToggleExpand(mainCat._id)}
//       >
//         <div className="flex items-center gap-3 sm:gap-4">
//           {hasSubs ? (
//             expanded ? (
//               <ChevronDown className="w-4 h-4 text-gray-500" />
//             ) : (
//               <ChevronRight className="w-4 h-4 text-gray-500" />
//             )
//           ) : (
//             <span className="w-4 h-4" />
//           )}

//           <div className="flex flex-col gap-1">
//             <span
//               className={`font-semibold text-sm sm:text-base ${
//                 mainCat.isDeleted
//                   ? "line-through text-red-700"
//                   : "text-gray-900"
//               }`}
//             >
//               {mainCat.name}
//             </span>
//             <span className="text-[11px] sm:text-xs text-gray-500">
//               {activeSubs.length} active / {allSubs.length} total subcategories
//             </span>
//           </div>

//           {mainCat.isDeleted && (
//             <span className="text-[10px] sm:text-[11px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">
//               DELETED
//             </span>
//           )}
//         </div>

//         <div
//           className="flex items-center gap-2"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {!mainCat.isDeleted ? (
//             <>
//               <button
//                 onClick={() => onEditMain(mainCat)}
//                 className="p-1.5 sm:p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
//               >
//                 <Edit2 size={16} />
//               </button>
//               <button
//                 onClick={() => onOpenConfirm(mainCat._id, "delete")}
//                 className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
//                 disabled={deletingId === mainCat._id}
//               >
//                 {deletingId === mainCat._id ? (
//                   <Loader2 size={16} className="animate-spin" />
//                 ) : (
//                   <Trash2 size={16} />
//                 )}
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={() => onOpenConfirm(mainCat._id, "restore")}
//                 className="p-1.5 sm:p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
//               >
//                 <RotateCcw size={16} />
//               </button>
//               <button
//                 onClick={() => onOpenConfirm(mainCat._id, "hardDelete")}
//                 className="p-1.5 sm:p-2 text-red-800 hover:bg-red-100 rounded-lg transition"
//                 title="Delete forever"
//               >
//                 <Trash2 size={16} />
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Subcategories (accordion content) */}
//       {expanded && hasSubs && (
//         <div className="bg-gray-50">
//           {allSubs.map((sub) => (
//             <div
//               key={sub._id}
//               className={`flex items-center justify-between px-6 lg:px-10 py-3 sm:py-3.5 text-sm transition ${
//                 sub.isDeleted
//                   ? "bg-red-50 border-l-4 border-red-400"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <span className="text-gray-400 text-xs">└</span>
//                 <span
//                   className={
//                     sub.isDeleted
//                       ? "line-through text-red-700"
//                       : "text-gray-700"
//                   }
//                 >
//                   {sub.name}
//                 </span>
//                 {sub.isDeleted && (
//                   <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">
//                     DELETED
//                   </span>
//                 )}
//               </div>

//               <div className="flex items-center gap-1.5">
//                 {sub.isDeleted ? (
//                   <>
//                     <button
//                       onClick={() => onOpenConfirm(sub._id, "restore")}
//                       className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition"
//                     >
//                       <RotateCcw size={14} />
//                     </button>
//                     <button
//                       onClick={() => onOpenConfirm(sub._id, "hardDelete")}
//                       className="p-1.5 text-red-800 hover:bg-red-100 rounded-lg transition"
//                       title="Delete forever"
//                     >
//                       <Trash2 size={14} />
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => onOpenConfirm(sub._id, "delete")}
//                     className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
//                     disabled={deletingId === sub._id}
//                   >
//                     {deletingId === sub._id ? (
//                       <Loader2 size={14} className="animate-spin" />
//                     ) : (
//                       <Trash2 size={14} />
//                     )}
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

/////////////////////////////////////// Update wit image
// CategoryRow.tsx
import type { Category } from "@/types/category";
import {
  ChevronDown,
  ChevronRight,
  Edit2,
  Loader2,
  RotateCcw,
  Trash2,
} from "lucide-react";

type DeleteAction = "delete" | "restore" | "hardDelete";

interface CategoryRowProps {
  mainCat: Category;
  expanded: boolean;
  deletingId: string | null;
  onToggleExpand: (id: string) => void;
  onEditMain: (category: Category) => void;
  onOpenConfirm: (id: string, action: DeleteAction) => void;
}

export default function CategoryRow({
  mainCat,
  expanded,
  deletingId,
  onToggleExpand,
  onEditMain,
  onOpenConfirm,
}: CategoryRowProps) {
  const allSubs = mainCat.subcategories ?? [];
  const activeSubs = allSubs.filter((s) => !s.isDeleted);
  const hasSubs = allSubs.length > 0;

  return (
    <div className="border-b last:border-b-0 border-gray-100">
      {/* Main row (accordion header) */}
      <div
        role="button"
        className={`w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-4 text-left transition ${
          mainCat.isDeleted
            ? "bg-red-50 border-l-4 border-red-500"
            : "hover:bg-gray-50"
        }`}
        onClick={() => hasSubs && onToggleExpand(mainCat._id)}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          {hasSubs ? (
            expanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )
          ) : (
            <span className="w-4 h-4" />
          )}

          {/* Thumbnail + text */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
              {mainCat.image ? (
                <img
                  src={mainCat.image}
                  alt={mainCat.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400">No image</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <span
                className={`font-semibold text-sm sm:text-base ${
                  mainCat.isDeleted
                    ? "line-through text-red-700"
                    : "text-gray-900"
                }`}
              >
                {mainCat.name}
              </span>
              <span className="text-[11px] sm:text-xs text-gray-500">
                {activeSubs.length} active / {allSubs.length} total
                subcategories
              </span>
            </div>
          </div>

          {mainCat.isDeleted && (
            <span className="text-[10px] sm:text-[11px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">
              DELETED
            </span>
          )}
        </div>

        <div
          className="flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {!mainCat.isDeleted ? (
            <>
              <button
                onClick={() => onEditMain(mainCat)}
                className="p-1.5 sm:p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onOpenConfirm(mainCat._id, "delete")}
                className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                disabled={deletingId === mainCat._id}
              >
                {deletingId === mainCat._id ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Trash2 size={16} />
                )}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onOpenConfirm(mainCat._id, "restore")}
                className="p-1.5 sm:p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => onOpenConfirm(mainCat._id, "hardDelete")}
                className="p-1.5 sm:p-2 text-red-800 hover:bg-red-100 rounded-lg transition"
                title="Delete forever"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Subcategories (accordion content) */}
      {expanded && hasSubs && (
        <div className="bg-gray-50">
          {allSubs.map((sub) => (
            <div
              key={sub._id}
              className={`flex items-center justify-between px-6 lg:px-10 py-3 sm:py-3.5 text-sm transition ${
                sub.isDeleted
                  ? "bg-red-50 border-l-4 border-red-400"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-xs">└</span>
                <div className="w-8 h-8 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                  {sub.image ? (
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[10px] text-gray-400">No img</span>
                  )}
                </div>
                <span
                  className={
                    sub.isDeleted
                      ? "line-through text-red-700"
                      : "text-gray-700"
                  }
                >
                  {sub.name}
                </span>
                {sub.isDeleted && (
                  <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">
                    DELETED
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                {sub.isDeleted ? (
                  <>
                    <button
                      onClick={() => onOpenConfirm(sub._id, "restore")}
                      className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition"
                    >
                      <RotateCcw size={14} />
                    </button>
                    <button
                      onClick={() => onOpenConfirm(sub._id, "hardDelete")}
                      className="p-1.5 text-red-800 hover:bg-red-100 rounded-lg transition"
                      title="Delete forever"
                    >
                      <Trash2 size={14} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => onOpenConfirm(sub._id, "delete")}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                    disabled={deletingId === sub._id}
                  >
                    {deletingId === sub._id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
