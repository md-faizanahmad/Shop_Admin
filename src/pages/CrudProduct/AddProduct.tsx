// src/pages/AddProduct.tsx
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import ProductForm from "./ProductForm";

export default function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const API_URL: string = import.meta.env.VITE_API_URL;

  const handleSubmit = async (formData: FormData): Promise<void> => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/products/create`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product created successfully!");
      navigate("/dashboard/products");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ?? "Failed to create product";
        toast.error(message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Top Bar – Zero wasted space */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="px-6 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            {/* Premium Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-100 transition-all duration-200"
            >
              <div className="p-2 bg-gray-100 rounded-xl group-hover:bg-sky-100 group-hover:text-sky-600 transition-all">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="font-semibold text-gray-700">Back</span>
            </button>

            {/* Title + Icon */}
            <div className="flex items-center gap-4">
              <div className="p-3 bg-linear-to-br from-blue-600 to-sky-600 rounded-2xl shadow-lg">
                <Package className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                  Add New Product
                </h1>
                <p className="text-sm text-gray-500">
                  Fast • Smart • Profitable
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content – Starts right away */}
      <main className="px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <ProductForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </main>
    </div>
  );
}
