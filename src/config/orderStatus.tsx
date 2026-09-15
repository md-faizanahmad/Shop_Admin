import { Package, Clock, Truck, CheckCircle, XCircle } from "lucide-react";
import type { ReactNode } from "react";

interface FilterOption {
  value: string;
  label: string;
  color: string;
  bg: string;
  icon: React.ReactNode;
}
interface StatusBadge {
  color: string;
  bg: string;
  icon: ReactNode;
}

export const statusFilters: FilterOption[] = [
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

export const getStatusBadge = (status: string): StatusBadge => {
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
