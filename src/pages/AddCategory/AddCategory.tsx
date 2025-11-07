import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Category } from "@/types/category";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";
import type { AxiosError } from "axios";

export default function AddCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const API_BASE = "/mystoreapi/categories";

  const fetchCategories = async () => {
    try {
      const res = await api.get<{ success: boolean; categories: Category[] }>(
        API_BASE
      );
      if (res.data.success) setCategories(res.data.categories);
      else setCategories([]);
    } catch (err) {
      const e = err as AxiosError<{ message?: string }>;
      console.error(
        "Error fetching categories:",
        e.response?.data?.message ?? e.message
      );
      setCategories([]);
    }
  };

  useEffect(() => {
    void fetchCategories();
  }, []);

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (editingId) {
        await api.put(`${API_BASE}/${editingId}`, { name, description });
        setMessage("✅ Category updated");
      } else {
        await api.post(API_BASE, { name, description });
        setMessage("✅ Category added");
      }
      resetForm();
      await fetchCategories();
    } catch (err) {
      const e = err as AxiosError<{ message?: string }>;
      setMessage(e.response?.data?.message ?? "❌ Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setName(category.name);
    setDescription(category.description ?? "");
    setEditingId(category._id);
    setMessage("");
  };

  const handleCancelEdit = () => {
    resetForm();
    setMessage("");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    setLoading(true);
    setMessage("");
    try {
      await api.delete(`${API_BASE}/${id}`);
      setMessage("🗑️ Category deleted");
      await fetchCategories();
    } catch (err) {
      const e = err as AxiosError<{ message?: string }>;
      setMessage(e.response?.data?.message ?? "❌ Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <h2 className="text-2xl font-semibold">Manage Categories</h2>
        {message && (
          <span
            className={`text-sm ${
              message.startsWith("✅") || message.startsWith("🗑️")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </span>
        )}
      </div>

      <CategoryForm
        name={name}
        description={description}
        setName={setName}
        setDescription={setDescription}
        onSubmit={handleSubmit}
        loading={loading}
        isEditing={Boolean(editingId)}
        onCancelEdit={handleCancelEdit}
      />

      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
