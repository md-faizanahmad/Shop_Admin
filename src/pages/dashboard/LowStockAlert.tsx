// src/components/dashboard/LowStockAlert.tsx
import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

type Product = {
  _id: string;
  name: string;
  imageUrl: string;
  stock: number;
};

export default function LowStockAlert() {
  const [lowStock, setLowStock] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/products/low-stock`, {
        withCredentials: true,
      })
      .then((res) => setLowStock(res.data?.slice(0, 6) || []))
      .catch(() => {});
  }, []);

  if (lowStock.length === 0) return null;

  return (
    <div className="bg-linear-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-300">
      <div className="flex items-center gap-4 mb-6">
        <AlertTriangle className="w-12 h-12 text-orange-600" />
        <div>
          <h2 className="text-2xl font-bold text-orange-800">
            Low Stock Alert
          </h2>
          <p className="text-orange-700">
            {lowStock.length} products need restock
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {lowStock.map((p) => (
          <div
            key={p._id}
            className="text-center bg-white rounded-xl p-4 shadow"
          >
            <img
              src={p.imageUrl}
              alt={p.name}
              className="w-20 h-20 mx-auto rounded-lg object-cover border-2 border-orange-200"
            />
            <p className="text-sm font-medium mt-3 line-clamp-2">{p.name}</p>
            <p className="text-3xl font-bold text-red-600 mt-2">{p.stock}</p>
            <p className="text-xs text-gray-600">units left</p>
          </div>
        ))}
      </div>

      <Link
        to="/dashboard/products"
        className="block text-center mt-8 text-orange-700 font-bold text-lg hover:underline"
      >
        Restock Now →
      </Link>
    </div>
  );
}
