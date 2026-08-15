//////////////////////////// update with costprice
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios, { type AxiosError } from "axios";
import type { ProductFormData } from "./ProductForm";
import ProductForm from "./ProductForm";

interface ProductImage {
  url: string;
  publicId: string;
}
interface ProductResponse {
  _id: string;
  name: string;
  description: string;
  price: number;
  costPrice?: number;
  discountPrice?: number;
  stock: number;
  category: { _id: string; name?: string } | string;
  highlights?: string[];
  specifications?: Record<string, string>;
  images?: ProductImage[]; // this not thumbnail
  imageUrl?: string;
}

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL as string;

  useEffect(() => {
    if (!id) {
      navigate("/dashboard/products");
      return;
    }

    let isMounted = true;
    axios
      .get<{ success: boolean; product: ProductResponse }>(
        `${API_URL}/v1/products/${id}`,
        { withCredentials: true }
      )
      .then((res) => {
        if (isMounted) setProduct(res.data.product);
      })
      .catch(() => {
        toast.error("Failed to load product");
        if (isMounted) navigate("/dashboard/products");
      })
      .finally(() => {
        if (isMounted) setFetching(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id, API_URL, navigate]);

  const handleSubmit = async (formData: FormData) => {
    if (!id) return;
    setLoading(true);
    try {
      // this query based
      await axios.put(`${API_URL}/v1/products/${id}`, formData, {
        withCredentials: true, // keep cookies if used
      });

      toast.success("Product updated!");
      navigate("/dashboard/products");
    } catch (error) {
      let message = "Failed to update product";
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<{ message?: string }>;
        message = err.response?.data?.message ?? message;
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-10 text-center">Loading...</div>;
  if (!product)
    return (
      <div className="p-10 text-center text-red-600">Product not found</div>
    );

  // convert specifications (Record) -> SpecificationItem[] for store
  const specsArray =
    product.specifications && Object.keys(product.specifications).length > 0
      ? Object.entries(product.specifications).map(([k, v]) => ({
          key: String(k),
          value: String(v ?? ""),
        }))
      : [{ key: "", value: "" }];

  const initialData: Partial<ProductFormData> = {
    name: product.name,
    description: product.description ?? "",
    price: product.price !== undefined ? String(product.price) : "",
    costPrice:
      product.costPrice !== undefined
        ? String(product.costPrice)
        : product.price !== undefined
        ? String(product.price)
        : "",
    discountPrice:
      product.discountPrice !== undefined ? String(product.discountPrice) : "0",
    stock: product.stock !== undefined ? String(product.stock) : "0",
    category:
      typeof product.category === "object"
        ? product.category._id
        : product.category,
    highlights: Array.isArray(product.highlights) ? product.highlights : [""],
    specifications: specsArray,
    // imagePreviews:
    //   product.images && product.images.length > 0
    //     ? product.images
    //     : product.imageUrl
    //     ? [product.imageUrl]
    //     : [],

    imagePreviews:
      product.images && product.images.length > 0
        ? product.images.map((img) => img.url)
        : product.imageUrl
        ? [product.imageUrl]
        : [],
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-600 hover:text-black"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

      <ProductForm
        initial={initialData}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
