// src/pages/CustomerInsight.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import {
  Users,
  UserPlus,
  RefreshCw,
  IndianRupee,
  Award,
  MapPin,
  Search,
  Phone,
  Mail,
  X,
} from "lucide-react";
import type { Customer } from "@/types/customer";

const API_URL = import.meta.env.VITE_API_URL;

interface CustomerStats {
  totalCustomers: number;
  newThisMonth: number;
  returning: number;
  aov: number;
  clv: number;
  repeatRate: number;
  topCustomers: {
    _id: string;
    name: string;
    orders: number;
    spent: number;
    lastOrder: string;
  }[];
  cityData: { city: string; customers: number }[];
}

export default function CustomerInsight() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stats, setStats] = useState<CustomerStats | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get<{ users: Customer[] }>(`${API_URL}/api/admin/customers`, {
        withCredentials: true,
      }),
      axios.get<{ data: CustomerStats }>(
        `${API_URL}/api/admin/customers/analytics`,
        {
          withCredentials: true,
        }
      ),
    ])
      .then(([custRes, statsRes]) => {
        setCustomers(custRes.data.users ?? []);
        setStats(statsRes.data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = customers.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(term) ||
      c.email?.toLowerCase().includes(term) ||
      c.phone?.includes(term)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-sky-600 mx-auto" />
          <p className="mt-6 text-2xl font-bold text-sky-600">
            Loading Customer Insights...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 flex items-center justify-center gap-4">
            <Users className="w-14 h-14 text-sky-600" />
            Customer Insights
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            Complete overview of your customer base & behavior
          </p>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard
            icon={<Users className="w-10 h-10" />}
            label="Total Customers"
            value={stats?.totalCustomers.toLocaleString() || "0"}
            color="bg-white"
          />
          <StatCard
            icon={<UserPlus className="w-10 h-10" />}
            label="New This Month"
            value={`+${stats?.newThisMonth || 0}`}
            color="bg-gradient-to-r from-sky-500 to-blue-600 text-white"
          />
          <StatCard
            icon={<RefreshCw className="w-10 h-10" />}
            label="Repeat Rate"
            value={`${stats?.repeatRate || 0}%`}
            color="bg-white"
          />
          <StatCard
            icon={<IndianRupee className="w-10 h-10" />}
            label="Avg Order Value"
            value={`₹${(stats?.aov || 0).toFixed(0)}`}
            color="bg-white"
          />
        </div>

        {/* Search + Customer Cards */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold">
              All Customers ({filtered.length})
            </h2>
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              No customers found
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((customer) => (
                <Link
                  key={customer._id}
                  to={`/dashboard/customers/${customer._id}`}
                  className="group block transform transition-all hover:scale-105"
                >
                  <div className="bg-linear-to-br from-sky-50 to-blue-50 rounded-2xl p-6 border border-sky-200 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 bg-linear-to-br from-sky-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-sky-700 shadow">
                        {customer.cart.length} items
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-sky-700">
                      {customer.name}
                    </h3>

                    <div className="mt-3 space-y-2 text-sm text-gray-600">
                      {customer.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{customer.phone}</span>
                        </div>
                      )}
                      {customer.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{customer.email}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 pt-4 border-t border-sky-200">
                      <span className="text-sky-600 font-medium text-sm flex items-center gap-1">
                        View Profile →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Analytics Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Loyal Customers */}
          <div className="bg-white rounded-2xl shadow-lg border p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Award className="w-8 h-8 text-yellow-500" />
              Top 10 Loyal Customers
            </h2>
            <div className="space-y-4">
              {stats?.topCustomers.slice(0, 10).map((c, i) => (
                <div
                  key={c._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex-center font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-sm text-gray-600">
                        Last: {format(new Date(c.lastOrder), "dd MMM yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      ₹{c.spent.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">{c.orders} orders</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* City Distribution */}
          <div className="bg-white rounded-2xl shadow-lg border p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-red-500" />
              Top Cities
            </h2>
            <div className="space-y-4">
              {stats?.cityData.slice(0, 8).map((city) => (
                <div
                  key={city.city}
                  className="flex items-center justify-between"
                >
                  <span className="font-medium">{city.city}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-40 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-linear-to-r from-sky-500 to-blue-600 h-3 rounded-full transition-all"
                        style={{
                          width: `${
                            (city.customers /
                              (stats.cityData[0]?.customers || 1)) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold w-12 text-right">
                      {city.customers}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bonus: New vs Returning Chart */}
        {stats && (
          <div className="bg-white rounded-2xl shadow-lg border p-8 text-center">
            <h2 className="text-2xl font-bold mb-8">
              Customer Type Distribution
            </h2>
            <div className="max-w-md mx-auto">
              <div className="text-5xl font-bold text-sky-600">
                {stats.newThisMonth}
              </div>
              <p className="text-gray-600">New Customers This Month</p>
              <div className="my-6 h-1 bg-gray-200 rounded-full">
                <div
                  className="h-1 bg-linear-to-r from-sky-500 to-green-500 rounded-full"
                  style={{
                    width: `${
                      (stats.returning / (stats.totalCustomers || 1)) * 100
                    }%`,
                  }}
                />
              </div>
              <div className="text-5xl font-bold text-green-600">
                {stats.returning}
              </div>
              <p className="text-gray-600">Returning Customers</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable StatCard
function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      className={`${color} rounded-2xl p-6 shadow-lg border border-gray-200`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className={`text-sm ${
              color.includes("gradient") ? "text-white/90" : "text-gray-600"
            }`}
          >
            {label}
          </p>
          <p
            className={`text-4xl font-bold mt-2 ${
              color.includes("gradient") ? "text-white" : "text-gray-900"
            }`}
          >
            {value}
          </p>
        </div>
        <div
          className={
            color.includes("gradient") ? "text-white/80" : "text-sky-600"
          }
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
