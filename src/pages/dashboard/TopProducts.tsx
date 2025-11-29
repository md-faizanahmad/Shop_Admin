// src/components/dashboard/TopProducts.tsx
import { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  _id: string;
  name: string;
  imageUrl: string;
  sold: number;
  revenue: number;
};

export default function TopProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard/top-products`, {
        withCredentials: true,
      })
      .then((res) => setProducts(res.data?.slice(0, 5) || []))
      .catch(() => {});
  }, []);

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border">
        <p className="text-gray-500">No sales data yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Top Performing Products
      </h2>
      <div className="space-y-4">
        {products.map((p, i) => (
          <div
            key={p._id}
            className="flex items-center gap-4 p-4 bg-sky-50 rounded-xl hover:bg-sky-100 transition"
          >
            <div className="text-3xl font-bold text-sky-600 w-12 text-center">
              #{i + 1}
            </div>
            <img
              src={p.imageUrl}
              alt={p.name}
              className="w-16 h-16 rounded-lg object-cover border"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{p.name}</p>
              <p className="text-sm text-gray-600">{p.sold} units sold</p>
            </div>
            <p className="text-xl font-bold text-emerald-600">
              ₹{p.revenue.toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
