// src/components/dashboard/OrderStatusCards.tsx
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
interface Stats {
  monthlyRevenue: number;
  totalOrders: number;
  todayOrders: number;
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  totalProducts: number;
  totalCategories: number;
  totalUsers: number;
}
export default function OrderStatusCards() {
  const [data, setData] = useState<Stats | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard/charts`, {
        withCredentials: true,
      })
      .then((res) => setData(res.data))
      .catch(() => {});
  }, []);

  if (!data)
    return <div className="h-96 bg-gray-100 rounded-2xl animate-pulse" />;

  const doughnutData = {
    labels: ["Pending", "Processing", "Shipped", "Delivered"],
    datasets: [
      {
        data: [data.pending, data.processing, data.shipped, data.delivered],
        backgroundColor: ["#f59e0b", "#8b5cf6", "#3b82f6", "#10b981"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 border lg:col-span-2">
        <h3 className="text-xl font-bold mb-6">Order Status Distribution</h3>
        <Doughnut
          data={doughnutData}
          options={{ plugins: { legend: { position: "bottom" } } }}
        />
      </div>

      <div className="bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl p-10 text-white shadow-2xl flex flex-col justify-center">
        <p className="text-emerald-100 text-lg">This Month Revenue</p>
        <p className="text-6xl font-bold mt-4">
          ₹{data.monthlyRevenue?.toLocaleString() || 0}
        </p>
        <p className="mt-4 text-emerald-100">↑ 23% from last month</p>
      </div>
    </div>
  );
}
