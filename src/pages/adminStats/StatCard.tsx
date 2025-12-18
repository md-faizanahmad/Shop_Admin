// src/components/admin/StatCard.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

// CountUp Component (optional: you can place in separate util file also)
const CountUp = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (value === 0) return setDisplayValue(0);

    let start = 0;
    const increment = value / 50;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 25);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-bold text-2xl text-gray-900 tabular-nums">
      {displayValue.toLocaleString()}
    </span>
  );
};

export interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  bgColor: string;
  iconColor: string;
  link?: string;
  showTodayDate?: boolean;
  todayDate?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  bgColor,
  iconColor,
  link,
  showTodayDate,
  todayDate,
}: StatCardProps) {
  const Wrapper = link ? Link : "div";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      whileHover={{ scale: link ? 1.05 : 1 }}
      className="relative group"
    >
      <Wrapper
        to={link || "#"}
        className={`block h-full p-5 rounded-2xl bg-white shadow-sm border border-gray-100 
        hover:shadow-xl hover:border-gray-200 transition-all duration-300 
        ${link ? "cursor-pointer" : "cursor-default"}`}
      >
        {showTodayDate && todayDate && (
          <div
            className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-semibold 
          bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full"
          >
            <RefreshCw className="w-3 h-3" />
            {todayDate}
          </div>
        )}

        <div className="flex flex-col items-center justify-center h-full space-y-3">
          <div className={`p-4 rounded-2xl ${bgColor}`}>
            <Icon className={`w-7 h-7 ${iconColor}`} />
          </div>

          <p className="text-sm font-medium text-gray-600 text-center">
            {title}
          </p>

          <CountUp value={value} />
        </div>
      </Wrapper>
    </motion.div>
  );
}
