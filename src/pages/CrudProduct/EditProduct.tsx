// // src/pages/CrudProduct/EditProduct.tsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import ProductForm, { type ProductPayload } from "./ProductForm";

// type ProductFull = ProductPayload & {
//   _id: string;
//   imageUrl?: string | null;
//   category?: string;
// };

// export default function EditProduct() {
//   const { id } = useParams<{ id: string }>();
//   const API_URL = import.meta.env.VITE_API_URL ?? "";
//   const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? "";
//   const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? "";
//   const navigate = useNavigate();
//   const [product, setProduct] = useState<ProductFull | null>(null);

//   const [saving, setSaving] = useState<boolean>(false);

//   useEffect(() => {
//     if (!id) return;
//     (async () => {
//       try {
//         const res = await axios.get<{
//           success: boolean;
//           products: ProductFull[];
//         }>(`${API_URL}/api/products`);
//         const found = res.data.products.find((p) => p._id === id) ?? null;
//         setProduct(found);
//       } catch {
//         toast.error("Failed to load product");
//       }
//     })();
//   }, [API_URL, id]);

//   async function handleSubmit(payload: FormData | ProductPayload) {
//     if (!id) return;
//     setSaving(true);
//     try {
//       let imageUrl = product?.imageUrl ?? null;
//       if (payload instanceof FormData) {
//         const file = payload.get("file") as File | null;
//         if (file) {
//           const fd = new FormData();
//           fd.append("file", file);
//           fd.append("upload_preset", UPLOAD_PRESET);
//           const up = await axios.post(
//             `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
//             fd
//           );
//           imageUrl = up.data.secure_url;
//         }
//       } else {
//         imageUrl = payload.imageUrl ?? imageUrl;
//       }

//       const body =
//         payload instanceof FormData
//           ? {
//               name: String(payload.get("name")),
//               description: String(payload.get("description")),
//               price: Number(payload.get("price")),
//               stock: Number(payload.get("stock")),
//               category: String(payload.get("category")),
//               imageUrl,
//             }
//           : { ...payload, imageUrl };

//       await axios.put(`${API_URL}/api/products/${id}`, body, {
//         withCredentials: true,
//       });
//       toast.success("Product updated");
//       navigate("/dashboard/products");
//     } catch (err) {
//       if (axios.isAxiosError(err))
//         toast.error(err.response?.data?.message ?? "Update failed");
//       else toast.error("Update failed");
//     } finally {
//       setSaving(false);
//     }
//   }

//   if (!product) return <div className="p-6">Loading…</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
//         Edit Product
//       </h1>
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
//         <ProductForm
//           initial={{
//             name: product.name,
//             description: product.description,
//             price: product.price,
//             stock: product.stock,
//             category: product.category ?? "",
//             imageUrl: product.imageUrl ?? null,
//           }}
//           onSubmit={handleSubmit}
//           submitLabel="Update product"
//           loading={saving}
//         />
//       </div>
//     </div>
//   );
// }
//////////////////////////////////////////////////////////
// src/pages/CrudProduct/EditProduct.tsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios, { AxiosError } from "axios";
// import ProductForm, { type ProductFormData } from "./ProductForm";

// interface ProductResponse {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
//   category: { _id: string; name: string } | string;
//   highlights: string[];
//   specifications: Record<string, string>;
//   images: string[];
//   imageUrl?: string;
// }

// export default function EditProduct() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState<ProductResponse | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);
//   const API_URL = import.meta.env.VITE_API_URL as string;

//   useEffect(() => {
//     if (!id) {
//       navigate("/dashboard/products");
//       return;
//     }

//     let isMounted = true;

//     axios
//       .get<{ success: boolean; product: ProductResponse }>(
//         `${API_URL}/api/products/${id}`,
//         {
//           withCredentials: true,
//         }
//       )
//       .then((res) => {
//         if (isMounted) setProduct(res.data.product);
//       })
//       .catch(() => {
//         toast.error("Failed to load product");
//         if (isMounted) navigate("/dashboard/products");
//       })
//       .finally(() => {
//         if (isMounted) setFetching(false);
//       });

//     return () => {
//       isMounted = false;
//     };
//   }, [id, API_URL, navigate]);

//   const handleSubmit = async (formData: FormData) => {
//     if (!id) return;
//     setLoading(true);
//     try {
//       await axios.put(`${API_URL}/api/products/${id}`, formData, {
//         withCredentials: true,
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Product updated!");
//       navigate("/dashboard/products");
//     } catch (error) {
//       let message = "Failed to update product";
//       if (axios.isAxiosError(error)) {
//         const err = error as AxiosError<{ message?: string }>;
//         message = err.response?.data?.message ?? message;
//       }
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetching) return <div className="p-10 text-center">Loading...</div>;
//   if (!product)
//     return (
//       <div className="p-10 text-center text-red-600">Product not found</div>
//     );

//   const initialData: Partial<ProductFormData> = {
//     name: product.name,
//     description: product.description,
//     price: product.price,
//     stock: product.stock,
//     category:
//       typeof product.category === "object"
//         ? product.category._id
//         : product.category,
//     highlights: product.highlights,
//     specifications: product.specifications,
//     images: product.images.length
//       ? product.images
//       : product.imageUrl
//       ? [product.imageUrl]
//       : [],
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-6 text-gray-600 hover:text-black"
//       >
//         ← Back
//       </button>
//       <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
//       <ProductForm
//         initial={initialData}
//         onSubmit={handleSubmit}
//         submitLabel="Update Product"
//         loading={loading}
//       />
//     </div>
//   );
// }
//////////////////////////// update with costprice
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import ProductForm, { type ProductFormData } from "./ProductForm";

interface ProductResponse {
  _id: string;
  name: string;
  description: string;
  price: number;
  costPrice?: number; // NEW FIELD
  discountPrice?: number;
  stock: number;
  category: { _id: string; name: string } | string;
  highlights: string[];
  specifications: Record<string, string>;
  images: string[];
  imageUrl?: string;
}

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL as string;

  /* ---------------- FETCH PRODUCT ---------------- */
  useEffect(() => {
    if (!id) {
      navigate("/dashboard/products");
      return;
    }

    let isMounted = true;

    axios
      .get<{ success: boolean; product: ProductResponse }>(
        `${API_URL}/api/products/${id}`,
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

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (formData: FormData) => {
    if (!id) return;
    setLoading(true);

    try {
      await axios.put(`${API_URL}/api/products/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
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

  /* ---------------- STATES ---------------- */
  if (fetching) return <div className="p-10 text-center">Loading...</div>;

  if (!product)
    return (
      <div className="p-10 text-center text-red-600">Product not found</div>
    );

  /* ---------------- INITIAL FORM DATA ---------------- */
  const initialData: Partial<ProductFormData> = {
    name: product.name,
    description: product.description,
    price: product.price,
    costPrice: product.costPrice ?? product.price, // fallback
    discountPrice: product.discountPrice ?? 0,
    stock: product.stock,
    category:
      typeof product.category === "object"
        ? product.category._id
        : product.category,
    highlights: product.highlights,
    specifications: product.specifications,
    images:
      product.images.length > 0
        ? product.images
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
        submitLabel="Update Product"
        loading={loading}
      />
    </div>
  );
}
