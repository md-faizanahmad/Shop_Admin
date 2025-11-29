// src/components/dashboard/HeroSection.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { TrendingUp, TrendingDown } from "lucide-react";

type TodayData = {
  sales: number;
  orders: number;
  growth: number;
};

export default function HeroSection() {
  const [today, setToday] = useState<TodayData>({
    sales: 0,
    orders: 0,
    growth: 0,
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard/today`, {
        withCredentials: true,
      })
      .then((res: { data: TodayData }) => setToday(res.data))
      .catch(() => setToday({ sales: 0, orders: 0, growth: 0 }));
  }, []);

  const isUp = today.growth >= 0;

  return (
    <div className=" text-black py-12 px-6 rounded-3xl shadow-2xl mx-4 md:mx-8 mt-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome back!</h1>
        <p className="text-xl md:text-2xl opacity-90 mb-8">
          Here's what's happening today
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div>
            <p className="text-lg opacity-80">Today's Sales</p>
            <p className="text-5xl font-bold mt-2">
              ₹{(today.sales || 0).toLocaleString("en-IN")}
            </p>
          </div>
          <div>
            <p className="text-lg opacity-80">Today's Orders</p>
            <p className="text-5xl font-bold mt-2">{today.orders || 0}</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            {isUp ? (
              <TrendingUp className="w-12 h-12" />
            ) : (
              <TrendingDown className="w-12 h-12 text-red-300" />
            )}
            <div>
              <p className="text-5xl font-bold">{Math.abs(today.growth)}%</p>
              <p className="text-sm opacity-80">vs yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
