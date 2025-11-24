import React, { useEffect, useState, useTransition } from "react";
import axios from "axios";
import type { Category } from "@/types/category";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";
import ConfirmDialog from "@/ui/ConfirmDialog";

export default function AddCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    type: "ok" | "err";
    msg: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const API_BASE = `${import.meta.env.VITE_API_URL}/api/categories`;

  function showToast(type: "ok" | "err", msg: string) {
    setToast({ type, msg });
    window.setTimeout(() => setToast(null), 2200);
  }

  async function fetchCategories() {
    const res = await axios.get(API_BASE, { withCredentials: true });
    if (res.data?.success) setCategories(res.data.categories);
    else if (Array.isArray(res.data)) setCategories(res.data);
    else setCategories([]);
  }

  useEffect(() => {
    startTransition(() => {
      fetchCategories().catch(() => {});
    });
  }, []); // eslint-disable-line

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(
          `${API_BASE}/${editingId}`,
          { name, description },
          { withCredentials: true }
        );
        showToast("ok", "Category updated");
      } else {
        await axios.post(
          API_BASE,
          { name, description },
          { withCredentials: true }
        );
        showToast("ok", "Category added");
      }
      setName("");
      setDescription("");
      setEditingId(null);
      startTransition(() => {
        fetchCategories().catch(() => {});
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        showToast("err", err.response?.data?.message ?? "Action failed");
      } else {
        showToast("err", "Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setName(category.name);
    setDescription(category.description ?? "");
    setEditingId(category._id);
  };

  const onAskDelete = (id: string) => setConfirmId(id);

  const confirmDelete = async () => {
    if (!confirmId) return;
    const id = confirmId;

    const prev = categories;
    const next = prev.filter((c) => c._id !== id);
    setCategories(next);
    setDeletingId(id);
    setConfirmId(null);

    try {
      await axios.delete(`${API_BASE}/${id}`, { withCredentials: true });
      showToast("ok", "Category deleted");
    } catch (err) {
      setCategories(prev);
      if (axios.isAxiosError(err)) {
        showToast("err", err.response?.data?.message ?? "Delete failed");
      } else {
        showToast("err", "Unexpected error");
      }
    } finally {
      setDeletingId(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName("");
    setDescription("");
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-semibold mb-6">
        Manage Categories{" "}
        {isPending && <span className="text-xs text-gray-400">(loading…)</span>}
      </h2>

      <CategoryForm
        name={name}
        description={description}
        setName={setName}
        setDescription={setDescription}
        onSubmit={handleSubmit}
        loading={loading}
        isEditing={Boolean(editingId)}
        onCancelEdit={cancelEdit}
      />

      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onAskDelete={onAskDelete}
        deletingId={deletingId}
      />

      <ConfirmDialog
        open={!!confirmId}
        title="Delete category?"
        description="This action cannot be undone."
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmId(null)}
      />

      {toast && (
        <div
          className={`fixed bottom-4 right-4 px-3 py-2 rounded text-sm shadow-md ${
            toast.type === "ok"
              ? "bg-emerald-600 text-white"
              : "bg-red-600 text-white"
          }`}
          role="status"
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}
