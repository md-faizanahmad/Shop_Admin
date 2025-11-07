import type { Category } from "@/types/category";
import { Edit, Trash2 } from "lucide-react";

interface CategoryRowProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export default function CategoryRow({
  category,
  onEdit,
  onDelete,
}: CategoryRowProps) {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="p-2 md:p-3">{category.name}</td>
      <td className="p-2 md:p-3 hidden sm:table-cell">
        {category.description || "-"}
      </td>
      <td className="p-2 md:p-3 text-center">
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => onEdit(category)}
            className="text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(category._id)}
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
