// src/pages/CrudProduct/EditProduct.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ProductForm, { type ProductPayload } from "./ProductForm";

type ProductFull = ProductPayload & {
  _id: string;
  imageUrl?: string | null;
  category?: string;
};

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const API_URL = import.meta.env.VITE_API_URL ?? "";
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? "";
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? "";
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductFull | null>(null);

  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await axios.get<{
          success: boolean;
          products: ProductFull[];
        }>(`${API_URL}/mystoreapi/products`);
        const found = res.data.products.find((p) => p._id === id) ?? null;
        setProduct(found);
      } catch {
        toast.error("Failed to load product");
      }
    })();
  }, [API_URL, id]);

  async function handleSubmit(payload: FormData | ProductPayload) {
    if (!id) return;
    setSaving(true);
    try {
      let imageUrl = product?.imageUrl ?? null;
      if (payload instanceof FormData) {
        const file = payload.get("file") as File | null;
        if (file) {
          const fd = new FormData();
          fd.append("file", file);
          fd.append("upload_preset", UPLOAD_PRESET);
          const up = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            fd
          );
          imageUrl = up.data.secure_url;
        }
      } else {
        imageUrl = payload.imageUrl ?? imageUrl;
      }

      const body =
        payload instanceof FormData
          ? {
              name: String(payload.get("name")),
              description: String(payload.get("description")),
              price: Number(payload.get("price")),
              stock: Number(payload.get("stock")),
              category: String(payload.get("category")),
              imageUrl,
            }
          : { ...payload, imageUrl };

      await axios.put(`${API_URL}/mystoreapi/products/${id}`, body, {
        withCredentials: true,
      });
      toast.success("Product updated");
      navigate("/dashboard/products");
    } catch (err) {
      if (axios.isAxiosError(err))
        toast.error(err.response?.data?.message ?? "Update failed");
      else toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  }

  if (!product) return <div className="p-6">Loading…</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
        Edit Product
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <ProductForm
          initial={{
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: product.category ?? "",
            imageUrl: product.imageUrl ?? null,
          }}
          onSubmit={handleSubmit}
          submitLabel="Update product"
          loading={saving}
        />
      </div>
    </div>
  );
}
