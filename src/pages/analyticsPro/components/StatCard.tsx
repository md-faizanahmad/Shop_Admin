import type { ReactNode } from "react";

interface Props {
  title: string;
  value: string; // main big number
  previous?: string; // e.g., "from 70,946"
  trend?: number; // e.g., 12 or -4.05
  icon: ReactNode; // icon on the right
  iconBGolor: string;
}

export default function StatCard({
  title,
  value,
  previous,
  trend,
  icon,
  iconBGolor,
}: Props) {
  const isPositive = trend !== undefined && trend >= 0;
  const trendColor = isPositive
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";
  const trendIcon = isPositive ? "▲" : "▼";

  return (
    <div
      className="
        bg-white rounded-2xl border shadow-sm 
        p-6 flex flex-col justify-between
        transition-all hover:shadow-md
        min-h-[150px]
      "
    >
      {/* TOP ROW: Text on left, icon on right */}
      <div className="flex items-start justify-between gap-4">
        {/* LEFT TEXT BLOCK */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-gray-600">{title}</p>

          <div className="mt-2 flex items-baseline gap-2 flex-wrap">
            <p className="text-2xl font-bold text-[#4f46e5]">{value}</p>

            {previous && (
              <p className="text-sm text-gray-500 whitespace-nowrap">
                from {previous}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT ICON */}
        <div
          className="
            w-12 h-12 rounded-xl bg-gray-100 
            flex items-center justify-center
            border border-gray-200
          "
          style={{
            backgroundColor: iconBGolor,
          }}
        >
          <div className="text-white scale-90">{icon}</div>
        </div>
      </div>

      {/* TREND BADGE */}
      {trend !== undefined && (
        <div className="mt-4 flex justify-end">
          <span
            className={`
              ${trendColor} px-3 py-1 text-sm rounded-full 
              font-medium flex items-center gap-1
            `}
          >
            <span className="text-xs">{trendIcon}</span>
            {Math.abs(trend)}%
          </span>
        </div>
      )}
    </div>
  );
}
