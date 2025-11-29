// src/components/dashboard/QuickActions.tsx
import { Link } from "react-router-dom";
import { PlusCircle, MessageCircle, Zap, Package } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      icon: PlusCircle,
      label: "Add Product",
      link: "/dashboard/products/new",
      color: "bg-emerald-600",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp Broadcast",
      link: "/dashboard/broadcast",
      color: "bg-green-600",
    },
    {
      icon: Zap,
      label: "Start Flash Sale",
      link: "/dashboard/sales",
      color: "bg-sky-600",
    },
    {
      icon: Package,
      label: "Manual Order",
      link: "/dashboard/orders/new",
      color: "bg-blue-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {actions.map((action) => (
        <Link
          key={action.label}
          to={action.link}
          className={`${action.color} text-white rounded-2xl p-10 text-center hover:scale-105 transition transform shadow-xl`}
        >
          <action.icon className="w-16 h-16 mx-auto mb-4" />
          <p className="text-lg font-bold">{action.label}</p>
        </Link>
      ))}
    </div>
  );
}
