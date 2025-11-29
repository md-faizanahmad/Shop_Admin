// src/components/dashboard/BigStatCards.tsx
import { useEffect, useState } from "react";
import { Package, ShoppingCart, Users, IndianRupee } from "lucide-react";
import axios from "axios";

type Stats = {
  revenue: number;
  orders: number;
  customers: number;
  products: number;
};

export default function BigStatCards() {
  const [stats, setStats] = useState<Stats>({
    revenue: 0,
    orders: 0,
    customers: 0,
    products: 0,
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard/stats`, {
        withCredentials: true,
      })
      .then((res) => setStats(res.data))
      .catch(() => {});
  }, []);

  const cards = [
    {
      icon: IndianRupee,
      title: "Total Revenue",
      value: stats.revenue,
      color: "bg-linear-to-br from-emerald-500 to-teal-600",
    },
    {
      icon: ShoppingCart,
      title: "Total Orders",
      value: stats.orders,
      color: "bg-linear-to-br from-sky-500 to-blue-600",
    },
    {
      icon: Users,
      title: "Active Customers",
      value: stats.customers,
      color: "bg-linear-to-br from-blue-600 to-indigo-700",
    },
    {
      icon: Package,
      title: "Products",
      value: stats.products,
      color: "bg-linear-to-br from-sky-400 to-blue-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`${card.color} text-white rounded-2xl p-8 shadow-xl`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">{card.title}</p>
              <p className="text-4xl font-bold mt-2">
                {typeof card.value === "number"
                  ? card.title.includes("Revenue")
                    ? `₹${card.value.toLocaleString("en-IN")}`
                    : card.value.toLocaleString()
                  : "0"}
              </p>
            </div>
            <card.icon className="w-12 h-12 opacity-80" />
          </div>
        </div>
      ))}
    </div>
  );
}
