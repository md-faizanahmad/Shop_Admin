// src/admin/pages/OrderManage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import type { Order, OrderItem } from "@/types/order";

export default function OrderManage() {
  const { orderId } = useParams();
  const API = import.meta.env.VITE_API_URL;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // ----------------------------
  // Load order details
  // ----------------------------
  async function load() {
    try {
      const res = await axios.get(`${API}/api/orders/admin/order/${orderId}`, {
        withCredentials: true,
      });

      setOrder(res.data.order);
    } catch {
      toast.error("Failed to load order");
    } finally {
      setLoading(false);
    }
  }

  // ----------------------------
  // Update Status
  // ----------------------------
  async function updateStatus(status: Order["status"]) {
    try {
      await axios.put(
        `${API}/api/orders/update-status/${orderId}`,
        { status },
        { withCredentials: true }
      );

      toast.success("Status updated");
      load();
    } catch {
      toast.error("Failed to update status");
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div className="p-6">Loading…</div>;
  if (!order) return <div className="p-6 text-red-500">Order not found.</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Order #{order._id}</h1>

      {/* ---------------- STATUS ---------------- */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="font-semibold mb-2">Update Status</h2>

        <select
          className="border px-3 py-2 rounded"
          value={order.status}
          onChange={(e) => updateStatus(e.target.value as Order["status"])}
        >
          <option value="placed">Placed</option>
          <option value="processing">Processing</option>
          <option value="shipping">Shipping</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* ---------------- ITEMS ---------------- */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="font-semibold mb-3">Items</h2>

        {order.items.map((i: OrderItem) => (
          <div key={i.product._id} className="flex gap-4 mb-4">
            <img
              src={i.product.imageUrl}
              className="w-20 h-20 object-cover rounded"
              alt={i.product.name}
            />
            <div>
              <p>{i.product.name}</p>
              <p className="text-blue-600">
                ₹{i.price} × {i.qty}
              </p>
            </div>
          </div>
        ))}
      </div>
      <a
        href={`${API}/api/orders/admin/invoice/${order._id}`}
        target="_blank"
        className="text-green-600 hover:underline"
      >
        View Invoice
      </a>
    </div>
  );
}
