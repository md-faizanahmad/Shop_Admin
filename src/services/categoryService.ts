import { api } from "@/lib/api";
import type { Category } from "@/types/category";

interface CategoriesResponse {
  success: boolean;
  categories: Category[];
}

interface CategoryResponse {
  category: Category;
}

// GET: Fetch all categories
export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<CategoriesResponse>("/v1/categories", {
    params: { admin: true },
  });

  return data.categories;
};

// POST: Create category or subcategory
export const createCategory = async (formData: FormData): Promise<Category> => {
  const { data } = await api.post<CategoryResponse>("/v1/categories", formData);

  return data.category;
};

// PUT: Update category or subcategory
export const updateCategory = async (
  id: string,
  formData: FormData,
): Promise<void> => {
  await api.put(`/v1/categories/${id}`, formData);
};

// DELETE: Soft delete
export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete(`/v1/categories/${id}`);
};

// PATCH: Restore category
export const restoreCategory = async (id: string): Promise<void> => {
  await api.patch(`/v1/categories/${id}/restore`, null);
};

// DELETE: Permanently delete
export const hardDeleteCategory = async (id: string): Promise<void> => {
  await api.delete(`/v1/categories/${id}/force`);
};
