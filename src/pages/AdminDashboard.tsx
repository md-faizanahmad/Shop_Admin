// pages/admin/dashboard.tsx

import AdminStatsCards from "./AdminStatsCards";
import DashboardCharts from "./DashboardCharts";

export default function AdminDashboard() {
  return (
    <div className="p-4 md:p-8 max-w-screen-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
      <AdminStatsCards />
      <DashboardCharts />
    </div>
  );
}

//// for these we need more api which we do later
// src/pages/AdminDashboard.tsx
// import HeroSection from "@/components/dashboard/HeroSection";
// import BigStatCards from "@/components/dashboard/BigStatCards";
// import SalesChart from "@/components/dashboard/SalesChart";
// import RecentOrders from "@/components/dashboard/RecentOrders";
// import LowStockAlert from "@/components/dashboard/LowStockAlert";
// import TopProducts from "@/components/dashboard/TopProducts";
// import QuickActions from "@/components/dashboard/QuickActions";
// import OrderStatusCards from "@/components/dashboard/OrderStatusCards";

// export default function AdminDashboard() {
//   return (
//     <div className="min-h-screen bg-gray-50 pb-12">
//       {/* 1. Hero */}
//       <HeroSection />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
//         {/* 2. Big Stats */}
//         <BigStatCards />

//         {/* 3. Chart + Recent Orders */}
//         <div className="grid lg:grid-cols-2 gap-8">
//           <SalesChart />
//           <RecentOrders />
//         </div>

//         {/* 4. Low Stock + Top Products */}
//         <div className="grid lg:grid-cols-2 gap-8">
//           <LowStockAlert />
//           <TopProducts />
//         </div>

//         {/* 5. Quick Actions */}
//         <QuickActions />

//         {/* 6. Existing Doughnut + Monthly Revenue */}
//         <OrderStatusCards />
//       </div>
//     </div>
//   );
// }
