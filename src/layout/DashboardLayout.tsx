// import { useState } from "react";
// import Sidebar from "@/components/Sidebar";
// import Header from "@/components/Header";
// import { Outlet } from "react-router-dom";
// import { ToastContainer } from "react-toastify";

// const DashboardLayout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
//   const handleCloseSidebar = () => setIsSidebarOpen(false);

//   return (
//     <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
//       {/* Sidebar */}
//       <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

//       {/* Main content */}
//       <div className="flex flex-col flex-1 min-w-0">
//         <Header onToggleSidebar={handleToggleSidebar} />
//         <main className="p-4 overflow-auto">
//           <Outlet />
//         </main>
//         <ToastContainer position="top-right" />
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

//// update
// src/layout/DashboardLayout.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // One function for toggle, one for force-close (used inside Sidebar)
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        className="z-50"
      />

      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar – uses both toggle & close */}
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar} // for hamburger & X button
          onClose={closeSidebar} // for clicking links on mobile
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header onToggleSidebar={toggleSidebar} />

          <main className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
