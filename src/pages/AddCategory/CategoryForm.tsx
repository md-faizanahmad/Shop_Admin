import React from "react";

interface CategoryFormProps {
  name: string;
  description: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  name,
  description,
  setName,
  setDescription,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col md:flex-row items-stretch md:items-end gap-3 w-full max-w-2xl mx-auto"
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category name"
        className="border border-gray-300 rounded-md px-3 py-2 flex-1 focus:ring-2 focus:ring-indigo-500"
        required
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border border-gray-300 rounded-md px-3 py-2 flex-1 focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Save
      </button>
    </form>
  );
};

export default CategoryForm;
