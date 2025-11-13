// src/pages/CrudProduct/ProductForm.tsx
import { useEffect, useState } from "react";
import axios from "axios";

export type ProductPayload = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string | null;
};

type Category = { _id: string; name: string };

type Props = {
  initial?: Partial<ProductPayload> & { imageUrl?: string | null };
  onSubmit: (payload: FormData | ProductPayload) => Promise<void>;
  submitLabel?: string;
  loading?: boolean;
};

export default function ProductForm({
  initial = {},
  onSubmit,
  submitLabel = "Save",
  loading = false,
}: Props) {
  const [name, setName] = useState<string>(initial.name ?? "");
  const [description, setDescription] = useState<string>(
    initial.description ?? ""
  );
  const [price, setPrice] = useState<number>(initial.price ?? 0);
  const [stock, setStock] = useState<number>(initial.stock ?? 0);
  const [category, setCategory] = useState<string>(initial.category ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    initial.imageUrl ?? null
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const API_URL = import.meta.env.VITE_API_URL ?? "";

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get<{
          success: boolean;
          categories: Category[];
        }>(`${API_URL}/mystoreapi/categories`);
        setCategories(res.data.categories ?? []);
      } catch {
        // ignore
      }
    })();
  }, [API_URL]);

  useEffect(() => {
    if (!imageFile) {
      setPreview(initial.imageUrl ?? null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile, initial.imageUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category) throw new Error("Missing required fields");

    if (imageFile) {
      const fd = new FormData();
      fd.append("file", imageFile);
      fd.append("name", name);
      fd.append("description", description);
      fd.append("price", String(price));
      fd.append("stock", String(stock));
      fd.append("category", category);
      await onSubmit(fd);
    } else {
      const payload: ProductPayload = {
        name,
        description,
        price,
        stock,
        category,
        imageUrl: initial.imageUrl ?? null,
      };
      await onSubmit(payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
          />
        </div>
        <div>
          <label className="text-sm">Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
          />
        </div>

        <div>
          <label className="text-sm">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
          >
            <option value="">Choose category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
          />
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="w-28 h-28 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-xs text-gray-500">No image</div>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-sm mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Recommended &lt;500KB for free plans.
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
