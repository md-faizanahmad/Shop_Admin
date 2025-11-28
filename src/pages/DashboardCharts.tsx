// components/DashboardCharts.tsx
import { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import axios from "axios";
import { format } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  last7Days: { date: string; revenue: number }[];
  monthlyRevenue: number; // this month total
  statusBreakdown: { status: string; count: number }[];
}

export default function DashboardCharts() {
  const [data, setData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const API_BASE = `${import.meta.env.VITE_API_URL}`;
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/admin/dashboard/charts`, {
          withCredentials: true,
        });
        setData(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChartData();
  }, []);

  // Professional empty states
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse"
          >
            <div className="h-5 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="h-64 bg-gray-100 rounded-xl"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!data || data.last7Days.length === 0) {
    return (
      <div className="mt-12 text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Chart Data Yet
          </h3>
          <p className="text-gray-600">
            Sales analytics will appear here automatically once you receive your
            first few orders.
            <br />
            <span className="text-sm text-gray-500 mt-3 block">
              Come back after a few sales – charts update in real-time
            </span>
          </p>
        </div>
      </div>
    );
  }

  // Last 7 Days Line Chart
  const lineData = {
    labels: data.last7Days.map((d) => format(new Date(d.date), "d MMM")),
    datasets: [
      {
        label: "Daily Revenue",
        data: data.last7Days.map((d) => d.revenue),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        pointBackgroundColor: "#10b981",
        pointRadius: 5,
      },
    ],
  };

  // Status Doughnut
  const doughnutData = {
    // labels: data.statusBreakdown.map((s) =>
    //   s.status === "shipping"
    //     ? "Shipped"
    //     : s.status.charAt(0).toUpperCase() + s.status.slice(1)
    // ),
    labels: data.statusBreakdown.map((s) => {
      const st = s?.status || "unknown";
      return st === "shipping"
        ? "Shipped"
        : st.charAt(0).toUpperCase() + st.slice(1);
    }),

    datasets: [
      {
        data: data.statusBreakdown.map((s) => s.count),
        backgroundColor: ["#f59e0b", "#8b5cf6", "#10b981", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: {
      responsive: true,
      plugins: { legend: { position: "bottom" as const } },
    },
    line: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { callback: (v: unknown) => `₹${v}` } },
      },
    },
    doughnut: {
      responsive: true,
      plugins: { legend: { position: "right" as const } },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
      {/* Last 7 Days Revenue */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">
          Last 7 Days Revenue
        </h3>
        <div className="h-64">
          <Line data={lineData} options={options.line} />
        </div>
      </div>

      {/* Order Status Distribution */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Order Status</h3>
        <div className="h-64">
          <Doughnut data={doughnutData} options={options.doughnut} />
        </div>
      </div>

      {/* This Month Total */}
      <div className="bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-lg flex flex-col justify-center">
        <p className="text-emerald-100 text-sm mb-2">This Month Revenue</p>
        <p className="text-4xl font-bold">
          ₹{data.monthlyRevenue.toLocaleString()}
        </p>
        {/* <p className="text-emerald-100 text-sm mt-3">+18% from last month</p> */}
      </div>
    </div>
  );
}
