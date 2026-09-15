import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { MonthlyDataPoint } from "@/types/analytics";
import { formatINR } from "@/helpers/format";
import { Calendar } from "lucide-react";

interface Props {
  data: MonthlyDataPoint[];
}

export default function ProfitTrendChart({ data }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border p-6">
      <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">
        <Calendar className="w-7 h-7 text-sky-600" />
        Profit Trend (12 Months)
      </h2>

      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 13 }}
            padding={{ left: 5, right: 5 }}
          />

          <YAxis tick={{ fontSize: 13 }} />

          <Tooltip formatter={(v: number) => formatINR(v)} />

          <Line
            type="monotone"
            dataKey="investment"
            stroke="#3b82f6"
            strokeWidth={3}
            name="Investment"
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#0ea5e9"
            strokeWidth={3}
            name="Revenue"
          />

          <Line
            type="monotone"
            dataKey="profit"
            stroke="#10b981"
            strokeWidth={4}
            dot={{ r: 5 }}
            name="Profit"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
