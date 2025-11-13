import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        <Header onToggleSidebar={handleToggleSidebar} />
        <main className="p-4 overflow-auto">
          <Outlet />
        </main>
        <ToastContainer position="top-right" />
      </div>
    </div>
  );
};

export default DashboardLayout;
