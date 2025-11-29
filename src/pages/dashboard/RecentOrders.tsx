// src/components/dashboard/RecentOrders.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

type Order = {
  _id: string;
  orderId: string;
  customerName: string;
  amount: number;
  status: string;
  createdAt: string;
};

export default function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/orders/recent`, {
        withCredentials: true,
      })
      .then((res) => setOrders(res.data?.slice(0, 8) || []))
      .catch(() => {});
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-100 text-emerald-700";
      case "Processing":
        return "bg-sky-100 text-sky-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recent Orders</h2>
        <Link
          to="/dashboard/orders"
          className="text-sky-600 font-medium hover:underline"
        >
          View all →
        </Link>
      </div>
      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No orders yet</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
            >
              <div>
                <p className="font-semibold text-gray-900">#{order.orderId}</p>
                <p className="text-sm text-gray-600">{order.customerName}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">
                  ₹{order.amount.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(order.createdAt), {
                    addSuffix: true,
                  })}
                </p>
                <span
                  className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
