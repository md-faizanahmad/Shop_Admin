import React from "react";

export interface CategoryFormProps {
  name: string;
  description: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
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

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading
            ? isEditing
              ? "Updating..."
              : "Saving..."
            : isEditing
            ? "Update"
            : "Save"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-4 py-2 rounded-md border hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
