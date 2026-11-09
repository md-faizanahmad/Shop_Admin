// AdminStatsCards.tsx (replace existing)
import { useMemo } from "react";
import { format } from "date-fns";
import {
  Package,
  ShoppingBag,
  Clock,
  Truck,
  CheckCircle,
  FolderOpen,
  Users,
  Layers,
  Box,
} from "lucide-react";
import StatCard from "./StatCard";
import { useAdminStats } from "./useAdminStats";

export default function AdminStatsCards() {
  const today = useMemo(() => format(new Date(), "d MMM"), []);
  const { stats, loading } = useAdminStats();

  // Skeleton Loader
  const SkeletonCard = () => (
    <div className="p-5 rounded-2xl bg-gray-100 border border-gray-200 animate-pulse">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-14 h-14 bg-gray-300 rounded-2xl"></div>
        <div className="h-4 w-20 bg-gray-300 rounded"></div>
        <div className="h-8 w-16 bg-gray-400 rounded"></div>
      </div>
    </div>
  );

  const statCards = useMemo(
    () => [
      {
        title: "Total Orders",
        value: stats?.totalOrders || 0,
        icon: Package,
        bgColor: "bg-indigo-100",
        iconColor: "text-indigo-600",
        link: "/dashboard/orders",
      },
      {
        title: "Today's Orders",
        value: stats?.todayOrders || 0,
        icon: ShoppingBag,
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600",
        link: "/dashboard/orders",
        showTodayDate: true,
        todayDate: today,
      },
      {
        title: "Products",
        value: stats?.totalProducts || 0,
        icon: Box,
        bgColor: "bg-purple-100",
        iconColor: "text-purple-600",
        link: "/dashboard/products",
      },
      {
        title: "Main Categories",
        value: stats?.totalMainCategories ?? stats?.totalSubcategories ?? 0,
        icon: FolderOpen,
        bgColor: "bg-pink-100",
        iconColor: "text-pink-600",
        link: "/dashboard/manage-category",
      },
      {
        title: "Subcategories",
        value: stats?.totalSubcategories ?? 0,
        icon: Layers,
        bgColor: "bg-pink-50",
        iconColor: "text-pink-700",
        link: "/dashboard/manage-category",
      },
      {
        title: "Customers",
        value: stats?.totalUsers || 0,
        icon: Users,
        bgColor: "bg-emerald-100",
        iconColor: "text-emerald-600",
        link: "/dashboard/customers-insight",
      },
      {
        title: "Processing",
        value: stats?.processing || 0,
        icon: Clock,
        bgColor: "bg-amber-100",
        iconColor: "text-amber-600",
      },
      {
        title: "Shipped",
        value: stats?.shipped || 0,
        icon: Truck,
        bgColor: "bg-cyan-100",
        iconColor: "text-cyan-600",
      },
      {
        title: "Delivered",
        value: stats?.delivered || 0,
        icon: CheckCircle,
        bgColor: "bg-green-100",
        iconColor: "text-green-600",
      },
    ],
    [stats, today],
  );

  if (loading) {
    return (
      <div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4 md:gap-6 mb-6">
          {Array.from({ length: 8 }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        {/* small placeholder for top categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-gray-100 animate-pulse h-24"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4 md:gap-6 mb-6">
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      {/* Top categories by subcount - small grid below the stat cards */}
      {stats?.topCategoriesBySubcount &&
        stats.topCategoriesBySubcount.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">
              Top categories (by subcategories)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {stats.topCategoriesBySubcount.map((cat) => (
                <a
                  key={cat._id}
                  href={`/dashboard/manage-category`} // replace with link to category if you have one
                  className="group block p-3 rounded-xl  bg-white hover:shadow-lg transition flex-col items-center text-center"
                >
                  <div className="w-40  h-40 m-auto rounded-md overflow-hidden bg-gray-100 flex items-center justify-center mb-2">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover m-auto"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No image</span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-800 truncate max-w-full">
                    {cat.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {cat.subCount} subcategories
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}
