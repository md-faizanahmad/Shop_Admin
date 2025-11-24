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
