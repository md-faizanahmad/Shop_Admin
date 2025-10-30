import React from "react";
import type { Category } from "@/types/category";
import { Edit, Trash2 } from "lucide-react";

interface CategoryRowProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

const CategoryRow: React.FC<CategoryRowProps> = ({
  category,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="p-2 md:p-3">{category.name}</td>
      <td className="p-2 md:p-3 hidden sm:table-cell">
        {category.description || "-"}
      </td>
      <td className="p-2 md:p-3 flex gap-2 justify-center">
        <button
          onClick={() => onEdit(category)}
          className="text-blue-500 hover:text-blue-700"
        >
          <Edit size={18} />
        </button>
        <button
          onClick={() => onDelete(category._id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
};

export default CategoryRow;
