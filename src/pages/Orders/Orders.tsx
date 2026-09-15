// src/admin/pages/OrdersPage.tsx

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { Search, Package, FileText, Settings } from "lucide-react";

import type { Order } from "@/types/order";
import { getStatusBadge, statusFilters } from "@/config/orderStatus";

const API = import.meta.env.VITE_API_URL;

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  async function loadOrders() {
    try {
      const res = await axios.get(`${API}/v1/orders`, {
        withCredentials: true,
      });
      setOrders(res.data.orders);
      setFilteredOrders(res.data.orders);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(
        (o) =>
          o.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o._id.includes(searchTerm),
      );
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((o) => o.status === selectedStatus);
    }

    setFilteredOrders(filtered);
  }, [searchTerm, selectedStatus, orders]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Orders</h1>
        <p className="text-gray-600 mt-1">
          Manage and track all customer orders in one place
        </p>
      </div>

      {/* Search + Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedStatus(filter.value)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                selectedStatus === filter.value
                  ? `${filter.bg} text-${filter.color}-700 ring-2 ring-${filter.color}-300`
                  : "bg-gray-100 text-green-700 hover:bg-gray-200"
              }`}
            >
              {filter.icon}
              {filter.label}
              {selectedStatus === filter.value && (
                <span className="ml-1 text-xs">
                  (
                  {
                    filteredOrders.filter(
                      (o) =>
                        selectedStatus === "all" || o.status === selectedStatus,
                    ).length
                  }
                  )
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))
        ) : filteredOrders.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray,500 text-lg">No orders found</p>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const status = getStatusBadge(order.status);
            return (
              <div
                key={order._id}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-gray-300 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Order ID</p>
                    <p className="font-bold text-lg">{order._id.slice(-8)}</p>
                  </div>
                  <span
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${status.bg} ${status.color}`}
                  >
                    {status.icon}
                    {/* {order.status === "shipping"
                      ? "Shipped"
                      : order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)} */}

                    {order.status === "shipping"
                      ? "Shipped"
                      : (order.status || "unknown").charAt(0).toUpperCase() +
                        (order.status || "unknown").slice(1)}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Customer</p>
                    <p className="font-semibold">{order.userName}</p>
                    <p className="text-xs text-gray-500">{order.userEmail}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Order Details</p>
                    <p className="font-bold text-xl text-green-600">
                      ₹{(Number(order.totalAmount) || 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.items.length} items •{" "}
                      {format(new Date(order.createdAt), "d MMM, yyyy")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
                  <a
                    href={`/dashboard/orders/manage/${order._id}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-sky-600 text-white py-2.5 rounded-xl hover:bg-sky-700 transition font-medium"
                  >
                    <Settings className="w-4 h-4" />
                    Manage
                  </a>
                  <a
                    href={`${API}/v1/orders/admin/invoice/${order._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-gray-300 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition"
                  >
                    <FileText className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
