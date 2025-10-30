import React from "react";
import type { Category } from "@/types/category";
import CategoryRow from "./CategoryRow";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto w-full mt-6">
      <table className="min-w-full border border-gray-200 text-sm md:text-base">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-2 md:p-3 text-left">Name</th>
            <th className="p-2 md:p-3 text-left hidden sm:table-cell">
              Description
            </th>
            <th className="p-2 md:p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <CategoryRow
              key={cat._id}
              category={cat}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
