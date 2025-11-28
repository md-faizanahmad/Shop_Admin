// // components/AdminStatsCards.tsx
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { format } from "date-fns";
// import {
//   Package,
//   ShoppingBag,
//   Clock,
//   Truck,
//   CheckCircle,
//   FolderOpen,
//   Users,
//   Brain,
//   RefreshCw,
//   IndianRupee,
// } from "lucide-react";
// import axios from "axios";

// interface Stats {
//   totalOrders: number;
//   todayOrders: number;
//   totalRevenue: number;
//   pending: number;
//   processing: number;
//   shipped: number;
//   delivered: number;
//   cancelled: number;
//   totalProducts: number;
//   totalCategories: number;
//   totalUsers: number;
// }

// const CountUp = ({ value }: { value: number }) => {
//   const [display, setDisplay] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const end = value;
//     if (end === 0) return setDisplay(0);
//     const timer = setInterval(() => {
//       start += end / 40;
//       if (start > end) {
//         setDisplay(end);
//         clearInterval(timer);
//       } else setDisplay(Math.floor(start));
//     }, 30);
//     return () => clearInterval(timer);
//   }, [value]);
//   return (
//     <span className="font-bold text-lg md:text-xl">
//       {display.toLocaleString()}
//     </span>
//   );
// };

// export default function AdminStatsCards() {
//   const [stats, setStats] = useState<Stats | null>(null);
//   const [loading, setLoading] = useState(true);
//   const API_URL = import.meta.env.VITE_API_URL;
//   const fetchStats = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/admin/dashboard/stats`, {
//         withCredentials: true,
//       });
//       setStats(res.data.data);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//     const interval = setInterval(fetchStats, 30000); // Real-time: every 30s
//     return () => clearInterval(interval);
//   }, []);

//   const today = format(new Date(), "d MMM");

//   const cards = [
//     {
//       title: "Total Orders",
//       value: stats?.totalOrders || 0,
//       icon: Package,
//       color: "blue",
//     },
//     {
//       title: "Today's Orders",
//       value: stats?.todayOrders || 0,
//       icon: ShoppingBag,
//       color: "emerald",
//       dateBadge: today,
//       link: "",
//     },
//     {
//       title: "Revenue",
//       value: stats?.totalRevenue || 0,
//       icon: IndianRupee,
//       color: "green",
//       prefix: "₹",
//     },
//     {
//       title: "Products",
//       value: stats?.totalProducts || 0,
//       icon: Package,
//       color: "indigo",
//     },
//     {
//       title: "Categories",
//       value: stats?.totalCategories || 0,
//       icon: FolderOpen,
//       color: "pink",
//     },
//     {
//       title: "Customers",
//       value: stats?.totalUsers || 0,
//       icon: Users,
//       color: "cyan",
//     },
//     {
//       title: "Processing",
//       value: stats?.processing || 0,
//       icon: Clock,
//       color: "orange",
//     },
//     {
//       title: "Shipped",
//       value: stats?.shipped || 0,
//       icon: Truck,
//       color: "purple",
//     },
//     {
//       title: "Delivered",
//       value: stats?.delivered || 0,
//       icon: CheckCircle,
//       color: "green",
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-3 md:gap-4">
//         {[...Array(9)].map((_, i) => (
//           <div
//             key={i}
//             className="bg-white/70 backdrop-blur rounded-lg border border-gray-200 p-4 animate-pulse"
//           >
//             <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
//             <div className="h-8 bg-gray-300 rounded w-16"></div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-3 md:gap-4">
//       {cards.map((card, i) => {
//         const Icon = card.icon;
//         return (
//           <motion.div
//             key={card.title}
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: i * 0.05 }}
//             className="relative bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all group"
//           >
//             {card.dateBadge && (
//               <div className="absolute top-2 right-2 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
//                 <RefreshCw className="w-3 h-3" />
//                 {card.dateBadge}
//               </div>
//             )}

//             <div className="flex items-center justify-between mb-3">
//               <div
//                 className={`p-4 text-center rounded-lg bg-${card.color}-100 group-hover:scale-110 transition-transform`}
//               >
//                 <Icon
//                   className={`w-5 h-5 text-${card.color}-600 text-center`}
//                 />
//               </div>
//             </div>

//             <p className="text-xs text-gray-600 font-medium text-center">
//               {card.title}
//             </p>
//             <div className="flex text-center items-baseline gap-1 mt-1">
//               {card.prefix && (
//                 <span className="text-green-600 font-bold">₹</span>
//               )}
//               <CountUp value={card.value} />
//             </div>
//           </motion.div>
//         );
//       })}

//       {/* AI Insights Card */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.5 }}
//         className="col-span-3 sm:col-span-4 lg:col-span-3 bg-linear-to-br from-sky-500 to-blue-500 text-white rounded-lg p-5 shadow-lg"
//       >
//         <div className="flex items-center gap-3 mb-3">
//           <Brain className="w-8 h-8" />
//           <h3 className="font-bold text-lg">AI Insights</h3>
//         </div>
//         <p className="text-sm opacity-90">Revenue up 42% this week</p>
//         <p className="text-xs mt-2 opacity-80">
//           Top product: Samsung Audio (+120%)
//         </p>
//         <p className="text-xs opacity-80">Peak hour: 8–10 PM</p>
//       </motion.div>
//     </div>
//   );
// }
////////////////////////////// updates with link and design
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Package,
  ShoppingBag,
  Clock,
  Truck,
  CheckCircle,
  FolderOpen,
  Users,
  Brain,
  RefreshCw,
  IndianRupee,
} from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Stats {
  totalOrders: number;
  todayOrders: number;
  totalRevenue: number;
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  totalProducts: number;
  totalCategories: number;
  totalUsers: number;
}

const CountUp = ({ value }: { value: number }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (end === 0) return setDisplay(0);
    const timer = setInterval(() => {
      start += end / 40;
      if (start > end) {
        setDisplay(end);
        clearInterval(timer);
      } else setDisplay(Math.floor(start));
    }, 25);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-bold text-xl text-gray-900">
      {display.toLocaleString()}
    </span>
  );
};

export default function AdminStatsCards() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/dashboard/stats`, {
        withCredentials: true,
      });
      setStats(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const today = format(new Date(), "d MMM");

  const cards = [
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: Package,
      bg: "bg-sky-100",
      iconColor: "text-sky-600",
      link: "/dashboard/orders",
    },
    {
      title: "Today's Orders",
      value: stats?.todayOrders || 0,
      icon: ShoppingBag,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      date: today,
      link: "/dashboard/orders",
    },
    {
      title: "Revenue",
      value: stats?.totalRevenue || 0,
      icon: IndianRupee,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      prefix: "₹",
      link: "/dashboard/orders",
    },
    {
      title: "Products",
      value: stats?.totalProducts || 0,
      icon: Package,
      bg: "bg-sky-100",
      iconColor: "text-sky-600",
      link: "/dashboard/products",
    },
    {
      title: "Categories",
      value: stats?.totalCategories || 0,
      icon: FolderOpen,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      link: "/dashboard/manage-category",
    },
    {
      title: "Customers",
      value: stats?.totalUsers || 0,
      icon: Users,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      link: "/dashboard/customers",
    },
    {
      title: "Processing",
      value: stats?.processing || 0,
      icon: Clock,
      bg: "bg-sky-100",
      iconColor: "text-sky-600",
    },
    {
      title: "Shipped",
      value: stats?.shipped || 0,
      icon: Truck,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Delivered",
      value: stats?.delivered || 0,
      icon: CheckCircle,
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-4">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="bg-white/70 backdrop-blur rounded-lg border border-gray-200 p-4 animate-pulse"
          >
            <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        const Wrapper = card.link ? Link : "div";

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl  bg-white/80 backdrop-blur-sm shadow hover:shadow-md transition cursor-pointer"
          >
            <Wrapper to={card.link || "#"} className="block p-4 h-[120px]">
              {card.date && (
                <span className="absolute top-2 right-2 text-[10px] font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                  <RefreshCw className="inline w-3 h-3 mr-1" />
                  {card.date}
                </span>
              )}

              <div className="flex flex-col items-center justify-center h-full gap-1">
                <div
                  className={`p-3 rounded-full ${card.bg} flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>

                <p className="text-xs text-gray-600">{card.title}</p>

                <div className="flex items-center gap-1">
                  {card.prefix && (
                    <span className="font-bold text-green-700 text-lg">
                      {card.prefix}
                    </span>
                  )}
                  <CountUp value={card.value} />
                </div>
              </div>
            </Wrapper>
          </motion.div>
        );
      })}

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="col-span-3 sm:col-span-4 lg:col-span-3 bg-sky-600 text-white rounded-xl p-5 shadow flex flex-col justify-between"
      >
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8" />
          <h3 className="text-lg font-bold">AI Insights</h3>
        </div>
        <p className="text-sm opacity-90 mt-2">Revenue up 42% this week</p>
        <p className="text-xs opacity-80">Top product: Samsung Audio</p>
        <p className="text-xs opacity-80">Peak hour: 8–10 PM</p>
      </motion.div>
    </div>
  );
}
