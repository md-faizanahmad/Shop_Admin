import type React from "react";

interface CategoryFormProps {
  name: string;
  description: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  isEditing: boolean;
  onCancelEdit: () => void;
}

export default function CategoryForm({
  name,
  description,
  setName,
  setDescription,
  onSubmit,
  loading,
  isEditing,
  onCancelEdit,
}: CategoryFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col md:flex-row items-stretch md:items-end gap-3 w-full max-w-3xl mx-auto"
    >
      <div className="flex-1">
        <label className="block text-sm text-gray-600 mb-1">
          Category name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Smartphone"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm text-gray-600 mb-1">Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {isEditing
            ? loading
              ? "Updating..."
              : "Update"
            : loading
            ? "Saving..."
            : "Save"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
