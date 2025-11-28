// components/CustomersDashboard.tsx
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { format } from "date-fns";
import { Users, MapPin, Award } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";

interface CustomerStats {
  totalCustomers: number;
  newThisMonth: number;
  returning: number;
  aov: number;
  clv: number;
  repeatRate: number;
  topCustomers: {
    name: string;
    orders: number;
    spent: number;
    lastOrder: string;
  }[];
  cityData: { city: string; customers: number }[];
}

export default function CustomersDashboard() {
  const [stats, setStats] = useState<CustomerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const API_BASE = `${import.meta.env.VITE_API_URL}`;
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/admin/customers/analytics`, {
        withCredentials: true,
      })
      .then((res) => setStats(res.data.data))
      .finally(() => setLoading(false));
    console.log(stats?.cityData);
  }, []);

  if (loading || !stats) {
    return (
      <div className="text-center py-20 text-gray-500">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-3xl font-bold mt-1">
                {stats.totalCustomers.toLocaleString()}
              </p>
            </div>
            <Users className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-linear-to-r from-blue-500 to-sky-600 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90">New This Month</p>
          <p className="text-3xl font-bold mt-1">+{stats.newThisMonth}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <p className="text-sm text-gray-600">Repeat Rate</p>
          <p className="text-3xl font-bold mt-1 text-green-600">
            {stats.repeatRate}%
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <p className="text-sm text-gray-600">Avg Order Value</p>
          <p className="text-3xl font-bold mt-1">₹{stats.aov.toFixed(0)}</p>
        </div>
      </div>

      {/* Top Loyal Customers */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-yellow-500" />
          Top 10 Loyal Customers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.topCustomers.slice(0, 10).map((c, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-gray-600">
                  Last order: {format(new Date(c.lastOrder), "d MMM")}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">₹{c.spent.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{c.orders} orders</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* City Heatmap + Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Customer Locations
          </h3>
          <div className="space-y-3">
            {stats.cityData.slice(0, 8).map((city, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="font-medium">{city.city}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${
                          (city.customers / stats.cityData[0].customers) * 100
                        }%`,
                      }}
                    />
                  </div>
                  <span className="text-sm w-12 text-right">
                    {city.customers}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-bold mb-4">New vs Returning</h3>
          <Doughnut
            data={{
              labels: ["New Customers", "Returning"],
              datasets: [
                {
                  data: [stats.newThisMonth, stats.returning],
                  backgroundColor: ["#3b82f6", "#10b981"],
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>
      </div>
    </div>
  );
}
