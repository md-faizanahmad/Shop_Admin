import { useEffect, useState, useMemo } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { Order } from "@/types/order";
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export default function OrdersPage() {
  const API_URL = import.meta.env.VITE_API_URL ?? "";
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get<{ success: boolean; orders: Order[] }>(
          `${API_URL}/mystoreapi/orders`,
          { withCredentials: true }
        );
        setOrders(res.data.orders ?? []);
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        toast.error(error.response?.data?.message ?? "Failed to load orders");
      } finally {
        setLoading(false);
      }
    })();
  }, [API_URL]);

  const counts = useMemo(() => {
    return {
      delivered: orders.filter((o) => o.status === "delivered").length,
      pending: orders.filter((o) => o.status === "pending").length,
      shipping: orders.filter((o) => o.status === "shipping").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
    };
  }, [orders]);

  const earnings = useMemo(
    () =>
      orders
        .filter((o) => o.status === "delivered")
        .reduce((sum, o) => sum + o.totalAmount, 0),
    [orders]
  );

  const chartData = [
    { label: "Delivered", value: counts.delivered },
    { label: "Shipping", value: counts.shipping },
    { label: "Pending", value: counts.pending },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Summary label="Delivered" value={counts.delivered} color="green" />
        <Summary label="Shipping" value={counts.shipping} color="blue" />
        <Summary label="Pending" value={counts.pending} color="yellow" />
        <Summary label="Cancelled" value={counts.cancelled} color="red" />
      </div>

      {/* Earnings Box */}
      <div className="card">
        <div className="text-lg font-semibold">Total Earnings</div>
        <div className="text-3xl font-bold text-green-600 mt-2">
          ₹{earnings.toLocaleString()}
        </div>
      </div>

      {/* Chart Fix */}
      <div className="card">
        <h2 className="font-semibold mb-3">Order Status Chart</h2>

        <div className="w-full h-64 min-h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="label" />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-3 text-left">Customer</th>
              <th className="p-3">Items</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center p-6">
                  Loading…
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o._id} className="border-t">
                  <td className="p-3">{o.customerName}</td>
                  <td className="p-3">{o.items.length} items</td>
                  <td className="p-3 font-semibold">₹{o.totalAmount}</td>
                  <td className="p-3 capitalize">{o.status}</td>
                  <td className="p-3">
                    {new Date(o.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Summary({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="card text-center">
      <div className="text-sm">{label}</div>
      <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
    </div>
  );
}
