// import { useEffect, useState, useMemo } from "react";
// import axios, { AxiosError } from "axios";
// import { toast } from "react-toastify";
// import type { Order } from "@/types/order";
// import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis } from "recharts";

// export default function OrdersPage() {
//   const API_URL = import.meta.env.VITE_API_URL ?? "";
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get<{ success: boolean; orders: Order[] }>(
//           `${API_URL}/api/orders`,
//           { withCredentials: true }
//         );
//         setOrders(res.data.orders ?? []);
//       } catch (err) {
//         const error = err as AxiosError<{ message?: string }>;
//         toast.error(error.response?.data?.message ?? "Failed to load orders");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [API_URL]);

//   const counts = useMemo(() => {
//     return {
//       delivered: orders.filter((o) => o.status === "delivered").length,
//       pending: orders.filter((o) => o.status === "pending").length,
//       shipping: orders.filter((o) => o.status === "shipping").length,
//       cancelled: orders.filter((o) => o.status === "cancelled").length,
//     };
//   }, [orders]);

//   const earnings = useMemo(
//     () =>
//       orders
//         .filter((o) => o.status === "delivered")
//         .reduce((sum, o) => sum + o.totalAmount, 0),
//     [orders]
//   );

//   const chartData = [
//     { label: "Delivered", value: counts.delivered },
//     { label: "Shipping", value: counts.shipping },
//     { label: "Pending", value: counts.pending },
//   ];

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Orders</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//         <Summary label="Delivered" value={counts.delivered} color="green" />
//         <Summary label="Shipping" value={counts.shipping} color="blue" />
//         <Summary label="Pending" value={counts.pending} color="yellow" />
//         <Summary label="Cancelled" value={counts.cancelled} color="red" />
//       </div>

//       {/* Earnings Box */}
//       <div className="card">
//         <div className="text-lg font-semibold">Total Earnings</div>
//         <div className="text-3xl font-bold text-green-600 mt-2">
//           ₹{earnings.toLocaleString()}
//         </div>
//       </div>

//       {/* Chart Fix */}
//       <div className="card">
//         <h2 className="font-semibold mb-3">Order Status Chart</h2>

//         <div className="w-full h-64 min-h-60">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={chartData}>
//               <XAxis dataKey="label" />
//               <Tooltip />
//               <Bar dataKey="value" fill="#2563eb" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Orders Table */}
//       <div className="card overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-100 dark:bg-gray-700">
//               <th className="p-3 text-left">Customer</th>
//               <th className="p-3">Items</th>
//               <th className="p-3">Amount</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Date</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan={5} className="text-center p-6">
//                   Loading…
//                 </td>
//               </tr>
//             ) : (
//               orders.map((o) => (
//                 <tr key={o._id} className="border-t">
//                   <td className="p-3">{o.customerName}</td>
//                   <td className="p-3">{o.items.length} items</td>
//                   <td className="p-3 font-semibold">₹{o.totalAmount}</td>
//                   <td className="p-3 capitalize">{o.status}</td>
//                   <td className="p-3">
//                     {new Date(o.createdAt).toLocaleString()}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function Summary({
//   label,
//   value,
//   color,
// }: {
//   label: string;
//   value: number;
//   color: string;
// }) {
//   return (
//     <div className="card text-center">
//       <div className="text-sm">{label}</div>
//       <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
//     </div>
//   );
// }
///////////////////new updatedb after11pm
// src/admin/pages/OrdersPage.tsx
//

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";
import {
  Search,
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
} from "lucide-react";

import type { Order } from "@/types/order";

const API = import.meta.env.VITE_API_URL;

interface FilterOption {
  value: string;
  label: string;
  color: string;
  bg: string;
  icon: React.ReactNode;
}

const statusFilters: FilterOption[] = [
  {
    value: "all",
    label: "All Orders",
    color: "gray",
    bg: "bg-gray-100",
    icon: <Package className="w-4 h-4" />,
  },
  {
    value: "pending",
    label: "Pending",
    color: "yellow",
    bg: "bg-yellow-100",
    icon: <Clock className="w-4 h-4" />,
  },
  {
    value: "processing",
    label: "Processing",
    color: "blue",
    bg: "bg-blue-100",
    icon: <Clock className="w-4 h-4" />,
  },
  {
    value: "shipping",
    label: "Shipped",
    color: "purple",
    bg: "bg-purple-100",
    icon: <Truck className="w-4 h-4" />,
  },
  {
    value: "delivered",
    label: "Delivered",
    color: "green",
    bg: "bg-green-100",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  {
    value: "cancelled",
    label: "Cancelled",
    color: "red",
    bg: "bg-red-100",
    icon: <XCircle className="w-4 h-4" />,
  },
];

const getStatusBadge = (status: string) => {
  const map: Record<
    string,
    { color: string; bg: string; icon: React.ReactNode }
  > = {
    pending: {
      color: "text-yellow-700",
      bg: "bg-yellow-100",
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    processing: {
      color: "text-blue-700",
      bg: "bg-blue-100",
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    shipping: {
      color: "text-purple-700",
      bg: "bg-purple-100",
      icon: <Truck className="w-3.5 h-3.5" />,
    },
    delivered: {
      color: "text-green-700",
      bg: "bg-green-100",
      icon: <CheckCircle className="w-3.5 h-3.5" />,
    },
    cancelled: {
      color: "text-red-700",
      bg: "bg-red-100",
      icon: <XCircle className="w-3.5 h-3.5" />,
    },
  };
  const packageIcon = <Package className="w-3.5 h-3.5" />;
  return (
    map[status] || {
      color: "text-gray-700",
      bg: "bg-gray-100",
      icon: packageIcon,
    }
  );
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  async function loadOrders() {
    try {
      const res = await axios.get(`${API}/api/orders`, {
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
          o._id.includes(searchTerm)
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
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
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
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                        selectedStatus === "all" || o.status === selectedStatus
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
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    Manage
                  </a>
                  <a
                    href={`${API}/api/orders/admin/invoice/${order._id}`}
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
