import { IndianRupee, TrendingUp, Package } from "lucide-react";
import StatCard from "./StatCard";
import { formatINR } from "@/helpers/format";

interface Props {
  totalInvestment: number;
  totalRevenue: number;
  totalProfit: number;
  profitMargin: string;

  totalUnits: number;

  // OPTIONAL – if backend returns historical values
  prevInvestment?: number;
  prevRevenue?: number;
  prevProfit?: number;
  prevUnits?: number;
}

export default function AnalyticsStatsGrid({
  totalInvestment,
  totalRevenue,
  totalProfit,

  totalUnits,

  prevInvestment,
  prevRevenue,
  prevProfit,
  prevUnits,
}: Props) {
  // -----------------------------
  // Auto compute trends (optional)
  // -----------------------------
  const calcTrend = (current?: number, prev?: number) => {
    if (!prev || prev === 0 || !current) return undefined;
    return +(((current - prev) / prev) * 100).toFixed(2);
  };

  const invTrend = calcTrend(totalInvestment, prevInvestment);
  const revTrend = calcTrend(totalRevenue, prevRevenue);
  const profitTrend = calcTrend(totalProfit, prevProfit);
  const unitTrend = calcTrend(totalUnits, prevUnits);

  return (
    <div
      className="
      grid grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-4 
      gap-6
    "
    >
      {/* Total Investment */}
      <StatCard
        title="Total Investment"
        value={formatINR(totalInvestment)}
        previous={prevInvestment ? formatINR(prevInvestment) : undefined}
        trend={invTrend}
        icon={<IndianRupee className="w-6 h-6" />}
        iconBGolor="#1277ad"
      />

      {/* Revenue */}
      <StatCard
        title="Potential Revenue"
        value={formatINR(totalRevenue)}
        previous={prevRevenue ? formatINR(prevRevenue) : undefined}
        trend={revTrend}
        icon={<IndianRupee className="w-6 h-6" />}
        iconBGolor="#16811a"
      />

      {/* Profit */}
      <StatCard
        title="Estimated Profit"
        value={formatINR(totalProfit)}
        previous={prevProfit ? formatINR(prevProfit) : undefined}
        trend={profitTrend}
        icon={<TrendingUp className="w-6 h-6" />}
        iconBGolor="#acd409"
      />

      {/* Units */}
      <StatCard
        title="Total Units"
        value={totalUnits.toLocaleString()}
        previous={prevUnits ? prevUnits.toLocaleString() : undefined}
        trend={unitTrend}
        icon={<Package className="w-6 h-6" />}
        iconBGolor="#07aea0"
      />
    </div>
  );
}
