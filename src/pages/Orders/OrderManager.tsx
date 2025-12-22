import { useEffect, useState, type JSX } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Copy,
  ExternalLink,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  CreditCard,
  ShoppingBag,
} from "lucide-react";
import type { Order, OrderStatus } from "@/types/orderManage";

const statusConfig: Record<
  OrderStatus,
  {
    label: string;
    bg: string;
    text: string;
    hoverBg: string;
    icon: JSX.Element;
  }
> = {
  placed: {
    label: "Placed",
    bg: "bg-blue-100",
    text: "text-blue-800",
    hoverBg: "hover:bg-blue-50",
    icon: <Clock className="h-5 w-5" />,
  },
  processing: {
    label: "Processing",
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    hoverBg: "hover:bg-yellow-50",
    icon: <Package className="h-5 w-5" />,
  },
  shipping: {
    label: "Shipping",
    bg: "bg-purple-100",
    text: "text-purple-800",
    hoverBg: "hover:bg-purple-50",
    icon: <Truck className="h-5 w-5" />,
  },
  delivered: {
    label: "Delivered",
    bg: "bg-green-100",
    text: "text-green-800",
    hoverBg: "hover:bg-green-50",
    icon: <CheckCircle className="h-5 w-5" />,
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-red-100",
    text: "text-red-800",
    hoverBg: "hover:bg-red-50",
    icon: <XCircle className="h-5 w-5" />,
  },
};

export default function OrderManage() {
  const { orderId } = useParams();
  const API = import.meta.env.VITE_API_URL;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await axios.get(`${API}/v1/orders/admin/order/${orderId}`, {
        withCredentials: true,
      });
      setOrder(res.data.order);
    } catch {
      toast.error("Failed to load order");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(status: OrderStatus) {
    try {
      await axios.put(
        `${API}/v1/orders/update-status/${orderId}`,
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

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">
        Loading order details…
      </div>
    );
  if (!order)
    return <div className="p-6 text-center text-red-500">Order not found</div>;

  const itemCount = order.items.reduce((sum, i) => sum + i.qty, 0);
  const orderDate = new Date(order.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Enhanced Hero Header + Hover Summary Cards */}
        <div className="overflow-hidden rounded-3xl shadow-xl border border-gray-200 bg-white">
          {/* Gradient Hero Bar */}
          <div className="bg-gray-900 px-6 py-5 sm:px-8 border-b border-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white">Order Details</h1>
                <div className="mt-2 flex flex-wrap items-center gap-5 text-gray-300 text-sm">
                  <span className="font-medium">ID: {order._id}</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {orderDate}
                  </span>
                </div>
              </div>

              {/* Professional Status Badge */}
              <div className="flex sm:justify-end">
                <span
                  className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold ${
                    statusConfig[order.status].bg
                  } ${statusConfig[order.status].text}`}
                >
                  {statusConfig[order.status].icon}
                  {statusConfig[order.status].label}
                </span>
              </div>
            </div>
          </div>

          {/* Three Interactive Hover Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            {/* Payment */}
            <div
              className={`group p-8 text-center transition-all duration-300 ${
                statusConfig[order.status].hoverBg
              } cursor-default`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-100 text-green-600 mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <CreditCard className="h-8 w-8" />
              </div>
              <p className="text-sm uppercase tracking-wider text-gray-500">
                Payment Status
              </p>
              <p className="mt-3 text-2xl font-bold text-green-600">
                {order.paymentStatus}
              </p>
            </div>

            {/* Total */}
            <div
              className={`group p-8 text-center transition-all duration-300 ${
                statusConfig[order.status].hoverBg
              } cursor-default`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <p className="text-sm uppercase tracking-wider text-gray-500">
                Order Total
              </p>
              <p className="mt-3 text-3xl font-extrabold text-gray-900">
                ₹{order.totalAmount.toLocaleString("en-IN")}
              </p>
            </div>

            {/* Items */}
            <div
              className={`group p-8 text-center transition-all duration-300 ${
                statusConfig[order.status].hoverBg
              } cursor-default`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <Package className="h-8 w-8" />
              </div>
              <p className="text-sm uppercase tracking-wider text-gray-500">
                Total Items
              </p>
              <p className="mt-3 text-2xl font-bold text-gray-900">
                {itemCount}
                <span className="text-lg font-medium text-gray-600 ml-2">
                  product{itemCount > 1 ? "s" : ""}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Update Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">
            Update Order Status
          </h2>
          <select
            value={order.status}
            onChange={(e) => updateStatus(e.target.value as OrderStatus)}
            className="w-full max-w-md px-5 py-3.5 text-base font-medium rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          >
            {Object.keys(statusConfig).map((s) => (
              <option key={s} value={s}>
                {statusConfig[s as OrderStatus].label}
              </option>
            ))}
          </select>
        </div>

        {/* Customer & Shipping */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Customer Details
            </h2>
            <dl className="space-y-5">
              <div>
                <dt className="text-sm text-gray-500">Name</dt>
                <dd className="mt-1 text-lg font-medium text-gray-900">
                  {order.user.name}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Email</dt>
                <dd className="mt-1 text-lg font-medium text-gray-900 break-all">
                  {order.user.email}
                </dd>
              </div>
            </dl>
            <button
              onClick={() => navigator.clipboard.writeText(order.user.email)}
              className="mt-6 inline-flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <Copy className="h-4 w-4" />
              Copy email
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Shipping Address
            </h2>
            <div className="space-y-2 text-gray-700">
              <p className="text-lg font-medium">
                {order.shippingAddress.fullName}
              </p>
              <p>{order.shippingAddress.phone}</p>
              <p>
                {order.shippingAddress.street}
                {order.shippingAddress.landmark &&
                  `, ${order.shippingAddress.landmark}`}
              </p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} –{" "}
                {order.shippingAddress.pincode}
              </p>
            </div>
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  `${order.shippingAddress.fullName}\n${
                    order.shippingAddress.phone
                  }\n${order.shippingAddress.street}${
                    order.shippingAddress.landmark
                      ? `, ${order.shippingAddress.landmark}`
                      : ""
                  }\n${order.shippingAddress.city}, ${
                    order.shippingAddress.state
                  } - ${order.shippingAddress.pincode}`
                )
              }
              className="mt-6 inline-flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <Copy className="h-4 w-4" />
              Copy full address
            </button>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Order Items
          </h2>
          <div className="space-y-6">
            {order.items.map((item) => (
              <div
                key={item.product._id}
                className="flex gap-6 items-start pb-6 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-24 h-24 rounded-xl object-cover shadow-sm flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.product.name}
                  </h3>
                  <div className="mt-3 flex items-center gap-6 text-base">
                    <span className="font-semibold text-indigo-600">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-gray-500">× {item.qty}</span>
                    <span className="font-semibold text-gray-900">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-6 border-t-2 border-gray-200">
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total Amount</span>
                <span>₹{order.totalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
          <a
            href={`${API}/v1/orders/admin/invoice/${order._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-4 text-lg font-semibold text-green-600 hover:text-green-700 hover:bg-green-50 rounded-xl transition-all duration-200"
          >
            <ExternalLink className="h-6 w-6" />
            View & Download Invoice
          </a>
        </div>
      </div>
    </div>
  );
}
