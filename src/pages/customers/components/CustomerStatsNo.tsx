// src/admin/customers/components/CustomerStatsNo.tsx
import type { Customer } from "@/types/customer";
import { Users, Repeat, TrendingUp } from "lucide-react";

type Props = {
  customers?: Customer[];
};

export default function CustomerStatsNo({ customers = [] }: Props) {
  const total = customers.length;
  const returning = customers.filter((c) => (c.ordersCount ?? 0) > 1).length;
  const repeatRate = total > 0 ? Math.round((returning / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <StatCard
        icon={<Users className="h-6 w-6" />}
        label="Total Customers"
        value={total.toLocaleString()}
        color="text-blue-600"
        bg="bg-blue-50"
      />
      <StatCard
        icon={<Repeat className="h-6 w-6" />}
        label="Returning Customers"
        value={returning.toLocaleString()}
        color="text-purple-600"
        bg="bg-purple-50"
      />
      <StatCard
        icon={<TrendingUp className="h-6 w-6" />}
        label="Repeat Rate"
        value={`${repeatRate}%`}
        color="text-green-600"
        bg="bg-green-50"
      />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
  bg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  bg: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="mt-3 text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${bg} ${color}`}>{icon}</div>
      </div>
    </div>
  );
}
