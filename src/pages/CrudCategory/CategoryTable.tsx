// // CategoryTable.tsx
// import type { Category } from "@/types/category";
// import { Loader2 } from "lucide-react";
// import CategoryRow from "./CategoryRow";

// type DeleteAction = "delete" | "restore" | "hardDelete";

// interface CategoryTableProps {
//   categories: Category[];
//   expanded: Set<string>;
//   deletingId: string | null;
//   isPending: boolean;
//   onToggleExpand: (id: string) => void;
//   onEditMain: (category: Category) => void;
//   onOpenConfirm: (id: string, action: DeleteAction) => void;
// }

// export default function CategoryTable({
//   categories,
//   expanded,
//   deletingId,
//   isPending,
//   onToggleExpand,
//   onEditMain,
//   onOpenConfirm,
// }: CategoryTableProps) {
//   const mainCategories = categories.filter((cat) => !cat.isSub);

//   if (isPending) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center py-16">
//         <p className="text-gray-500 text-sm sm:text-base">
//           <Loader2 className="inline-block animate-spin mr-2" />
//           Loading categories...
//         </p>
//       </div>
//     );
//   }

//   if (mainCategories.length === 0) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center py-16">
//         <p className="text-gray-500 text-sm sm:text-base">
//           No categories yet. Create your first one using the form.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
//       <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//         <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//           All Categories
//         </h2>
//         <span className="text-xs sm:text-sm text-gray-500">
//           Deleted items appear in red
//         </span>
//       </div>

//       <div className="divide-y divide-gray-100">
//         {mainCategories.map((mainCat) => (
//           <CategoryRow
//             key={mainCat._id}
//             mainCat={mainCat}
//             expanded={expanded.has(mainCat._id)}
//             deletingId={deletingId}
//             onToggleExpand={onToggleExpand}
//             onEditMain={onEditMain}
//             onOpenConfirm={onOpenConfirm}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
// CategoryTable.tsx
import type { Category } from "@/types/category";
import { Loader2 } from "lucide-react";
import CategoryRow from "./CategoryRow";

type DeleteAction = "delete" | "restore" | "hardDelete";

interface CategoryTableProps {
  categories: Category[];
  expanded: Set<string>;
  deletingId: string | null;
  isPending: boolean;
  onToggleExpand: (id: string) => void;
  onEditMain: (category: Category) => void;
  onOpenConfirm: (id: string, action: DeleteAction) => void;
}

export default function CategoryTable({
  categories,
  expanded,
  deletingId,
  isPending,
  onToggleExpand,
  onEditMain,
  onOpenConfirm,
}: CategoryTableProps) {
  const mainCategories = categories.filter((cat) => !cat.isSub);

  if (isPending) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center py-16">
        <p className="text-gray-500 text-sm sm:text-base">
          <Loader2 className="inline-block animate-spin mr-2" />
          Loading categories...
        </p>
      </div>
    );
  }

  if (mainCategories.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center py-16">
        <p className="text-gray-500 text-sm sm:text-base">
          No categories yet. Create your first one using the form.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          All Categories
        </h2>
        <span className="text-xs sm:text-sm text-gray-500">
          Deleted items appear in red
        </span>
      </div>

      <div className="divide-y divide-gray-100">
        {mainCategories.map((mainCat) => (
          <CategoryRow
            key={mainCat._id}
            mainCat={mainCat}
            expanded={expanded.has(mainCat._id)}
            deletingId={deletingId}
            onToggleExpand={onToggleExpand}
            onEditMain={onEditMain}
            onOpenConfirm={onOpenConfirm}
          />
        ))}
      </div>
    </div>
  );
}
