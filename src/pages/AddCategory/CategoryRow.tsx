import { memo } from "react";
import type { Category } from "@/types/category";
import { Edit, Trash2, Loader2 } from "lucide-react";

interface CategoryRowProps {
  category: Category;
  onEdit: (category: Category) => void;
  onAskDelete: (id: string) => void;
  deletingId: string | null;
}

function Row({ category, onEdit, onAskDelete, deletingId }: CategoryRowProps) {
  const isDeleting = deletingId === category._id;
  return (
    <tr className="border-b hover:bg-gray-50 transition will-change-transform">
      <td className="p-2 md:p-3">{category.name}</td>
      <td className="p-2 md:p-3 hidden sm:table-cell">
        {category.description || "-"}
      </td>
      <td className="p-2 md:p-3">
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => onEdit(category)}
            className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
            disabled={isDeleting}
            aria-disabled={isDeleting}
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onAskDelete(category._id)}
            className="text-red-600 hover:text-red-800 disabled:opacity-50 inline-flex items-center gap-1"
            disabled={isDeleting}
            aria-busy={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 size={18} />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}

// Prevent unnecessary re-renders of all rows
export default memo(Row);
