import { useEffect, useState, useMemo } from "react";
import { api } from "@/lib/api";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { Link } from "react-router-dom";

// ----------------------
// 🔥 Define Proper Types
// ----------------------
interface SimpleOrder {
  _id: string;
  customerName: string;
  totalAmount: number;
  status: "pending" | "shipping" | "delivered" | "cancelled";
  createdAt: string;
}

interface SummaryState {
  products: number;
  categories: number;
  orders: number;
  earnings: number;
}

export default function Dashboard() {
  const [summary, setSummary] = useState<SummaryState>({
    products: 0,
    categories: 0,
    orders: 0,
    earnings: 0,
  });

  const [recentOrders, setRecentOrders] = useState<SimpleOrder[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const prodRes = await api.get("/mystoreapi/products");
        const catRes = await api.get("/mystoreapi/categories");
        const orderRes = await api.get("/mystoreapi/orders");

        const orders: SimpleOrder[] = orderRes.data.orders;

        const deliveredOrders = orders.filter((o) => o.status === "delivered");

        const earnings = deliveredOrders.reduce(
          (sum, order) => sum + order.totalAmount,
          0
        );

        setSummary({
          products: prodRes.data.products.length,
          categories: catRes.data.categories.length,
          orders: orders.length,
          earnings,
        });

        setRecentOrders(orders.slice(0, 5));
      } catch {
        /* ignore dashboard failures */
      }
    })();
  }, []);

  // Chart Data
  const chartData = useMemo(
    () => [
      { label: "Products", value: summary.products },
      { label: "Categories", value: summary.categories },
      { label: "Orders", value: summary.orders },
    ],
    [summary]
  );

  return (
    <div className="space-y-8 p-4">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        Dashboard Overview
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Products" value={summary.products} />
        <StatCard label="Categories" value={summary.categories} />
        <StatCard label="Orders" value={summary.orders} />
        <StatCard
          label="Earnings"
          value={`₹${summary.earnings.toLocaleString()}`}
        />
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
        <h2 className="font-semibold mb-3 text-gray-800 dark:text-gray-100">
          Platform Activity Overview
        </h2>

        <div className="w-full h-64 min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="label" stroke="#888" />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">
            Recent Orders
          </h2>
          <Link
            to="/dashboard/orders"
            className="text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o._id} className="border-t dark:border-gray-700">
                  <td className="p-3">{o.customerName}</td>
                  <td className="p-3 font-semibold">₹{o.totalAmount}</td>
                  <td className="p-3 capitalize">{o.status}</td>
                  <td className="p-3">
                    {new Date(o.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {recentOrders.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 mt-4 text-center">
              No recent orders available.
            </p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Quick Actions
        </h2>
        <div className="flex gap-4 flex-wrap">
          <QuickLink label="Add Product" to="/dashboard/products/add" />
          <QuickLink label="View Products" to="/dashboard/products" />
          <QuickLink
            label="Manage Categories"
            to="/dashboard/manage-category"
          />
          <QuickLink label="Orders" to="/dashboard/orders" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-center">
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
      <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">
        {value}
      </div>
    </div>
  );
}

function QuickLink({ label, to }: { label: string; to: string }) {
  return (
    <Link
      to={to}
      className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-500 transition text-sm"
    >
      {label}
    </Link>
  );
}
