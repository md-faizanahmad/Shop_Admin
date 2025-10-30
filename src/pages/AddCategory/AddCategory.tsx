import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Category } from "@/types/category";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";

const AddCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const API_BASE = `${import.meta.env.VITE_API_URL}/mystoreapi/categories`;

  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_BASE, { withCredentials: true });
      if (res.data.success) {
        setCategories(res.data.categories);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `${API_BASE}/${editingId}`,
          { name, description },
          { withCredentials: true }
        );
      } else {
        await axios.post(
          API_BASE,
          { name, description },
          { withCredentials: true }
        );
      }
      setName("");
      setDescription("");
      setEditingId(null);
      await fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  const handleEdit = (category: Category) => {
    setName(category.name);
    setDescription(category.description || "");
    setEditingId(category._id);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE}/${id}`, { withCredentials: true });
      await fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-semibold mb-6">Manage Categories</h2>
      <CategoryForm
        name={name}
        description={description}
        setName={setName}
        setDescription={setDescription}
        onSubmit={handleSubmit}
      />
      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AddCategory;
