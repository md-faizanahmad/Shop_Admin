// // src/pages/CrudProduct/AddProduct.tsx
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import ProductForm, { type ProductPayload } from "./ProductForm";

// export default function AddProduct() {
//   const API_URL = import.meta.env.VITE_API_URL ?? "";
//   const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? "";
//   const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? "";
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState<boolean>(false);

//   async function handleSubmit(payload: FormData | ProductPayload) {
//     setLoading(true);
//     try {
//       let imageUrl: string | null = null;

//       if (payload instanceof FormData) {
//         const file = payload.get("file") as File | null;
//         if (!file) throw new Error("Image file required");
//         const fd = new FormData();
//         fd.append("file", file);
//         fd.append("upload_preset", UPLOAD_PRESET);
//         const up = await axios.post(
//           `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
//           fd
//         );
//         imageUrl = up.data.secure_url;
//       } else {
//         imageUrl = payload.imageUrl ?? null;
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

//       await axios.post(`${API_URL}/api/products`, body, {
//         withCredentials: true,
//       });
//       toast.success("Product created");
//       navigate("/dashboard/products");
//     } catch (err) {
//       if (axios.isAxiosError(err))
//         toast.error(err.response?.data?.message ?? "Create failed");
//       else toast.error("Create failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-2 text-black dark:text-gray-100">
//         Add Product
//       </h1>
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
//         <ProductForm
//           onSubmit={handleSubmit}
//           submitLabel="Create product"
//           loading={loading}
//         />
//       </div>
//     </div>
//   );
// }
////////////////////////////////////////////////////////////////
/////////////////// update with new fileds
// src/pages/CrudProduct/AddProduct.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import ProductForm from "./ProductForm";

export default function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL as string;

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/products/create`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product created successfully!");
      navigate("/dashboard/products");
    } catch (error) {
      let message = "Failed to create product";
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<{ message?: string }>;
        message = err.response?.data?.message ?? message;
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-600 hover:text-black"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
      <ProductForm
        onSubmit={handleSubmit}
        submitLabel="Create Product"
        loading={loading}
      />
    </div>
  );
}
