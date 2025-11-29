// import { useEffect, useState } from "react";
// import { useAuth } from "@/hooks/useAuth";
// import { Menu, LogOut } from "lucide-react";
// import NotificationBell from "./NotificationBell";

// interface HeaderProps {
//   onToggleSidebar: () => void;
// }

// const Header = ({ onToggleSidebar }: HeaderProps) => {
//   const { admin, logout } = useAuth();
//   const [currentTime, setCurrentTime] = useState("");

//   // Time updater
//   useEffect(() => {
//     const update = () => {
//       const now = new Date();
//       setCurrentTime(
//         now.toLocaleString("en-IN", {
//           weekday: "short",
//           hour: "2-digit",
//           minute: "2-digit",
//           second: "2-digit",
//           hour12: true,
//         })
//       );
//     };
//     update();
//     const timer = setInterval(update, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Greeting Text
//   const greeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good Morning";
//     if (hour < 17) return "Good Afternoon";
//     return "Good Evening";
//   };

//   return (
//     <header
//       className="flex justify-between items-center px-4 py-3
//       bg-white border-b border-gray-200 shadow-sm"
//     >
//       {/* Left side */}
//       <div className="flex items-center gap-4">
//         {/* Sidebar Toggle */}
//         <button onClick={onToggleSidebar} className="md:hidden text-gray-800">
//           <Menu className="w-6 h-6" />
//         </button>

//         {/* Greeting */}
//         <div>
//           <h2 className="text-lg font-semibold text-gray-800">
//             {greeting()}, {admin?.name || "Admin"} 👋
//           </h2>
//           <p className="text-sm text-gray-500">{currentTime}</p>
//         </div>
//       </div>

//       <NotificationBell />

//       {/* Right side */}
//       <button
//         onClick={logout}
//         className="flex items-center justify-center p-2
//         bg-red-500 text-white rounded-md hover:bg-red-600 transition"
//       >
//         <LogOut className="w-5 h-5" />
//       </button>
//     </header>
//   );
// };

// export default Header;
////////////////////////////////////// update with notifi
// import { useEffect, useState } from "react";
// import { useAuth } from "@/hooks/useAuth";
// import { Menu, LogOut } from "lucide-react";
// import NotificationBell from "./NotificationBell";

// interface HeaderProps {
//   onToggleSidebar: () => void;
// }

// const Header = ({ onToggleSidebar }: HeaderProps) => {
//   const { admin, logout } = useAuth();
//   const [currentTime, setCurrentTime] = useState("");

//   useEffect(() => {
//     const update = () => {
//       const now = new Date();
//       setCurrentTime(
//         now.toLocaleString("en-IN", {
//           weekday: "short",
//           hour: "2-digit",
//           minute: "2-digit",
//           second: "2-digit",
//           hour12: true,
//         })
//       );
//     };
//     update();
//     const timer = setInterval(update, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const greeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good Morning";
//     if (hour < 17) return "Good Afternoon";
//     return "Good Evening";
//   };

//   return (
//     <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
//       {/* LEFT SECTION */}
//       <div className="flex items-center gap-4">
//         {/* Mobile Menu Button */}
//         <button onClick={onToggleSidebar} className="md:hidden text-gray-800">
//           <Menu className="w-6 h-6" />
//         </button>

//         {/* Greeting & Time */}
//         <div className="leading-tight">
//           <h4 className="text-lg font-semibold text-gray-800">
//             {greeting()}, {admin?.name || "Admin"} 👋
//           </h4>
//           <p className="text-sm text-gray-500">{currentTime}</p>
//         </div>
//       </div>

//       {/* RIGHT SECTION (Notification + Logout) */}
//       <div className="flex items-center gap-2">
//         {/* Notification Bell */}
//         <div className="mt-2">
//           <NotificationBell />
//         </div>

//         {/* Logout Button */}
//         <button
//           onClick={logout}
//           className="flex items-center justify-center p-2 bg-red-500
//           text-white rounded-md hover:bg-red-600 transition"
//         >
//           <LogOut className="w-5 h-5" />
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;
/////////////////////////////////////////////
////// Redesign
// src/components/Header.tsx
// src/components/Header.tsx
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Menu, LogOut } from "lucide-react";
import NotificationBell from "./NotificationBell";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const { admin, logout } = useAuth();
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Beautiful Date: Fri, 29 Nov 2025
      const date = now.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      setCurrentDate(date);

      // Live Time: 02:31 PM
      const time = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(time);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        {/* LEFT: Menu + Greeting + Date/Time */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl hover:bg-gray-100 transition lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* Greeting + Date + Time */}
          <div className="leading-tight">
            {/* Greeting */}
            <h1 className="text-lg md:text-xl font-bold text-gray-900">
              {greeting()},{" "}
              <span className="text-sky-600">{admin?.name || "Admin"}</span>
            </h1>

            {/* Date & Time – Separate & Beautiful */}
            <div className="flex items-center gap-3 text-sm text-gray-600 font-medium mt-1">
              <span className="hidden sm:inline">{currentDate}</span>
              <span className="inline-flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                {currentTime}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Notification + Avatar + Logout */}
        <div className="flex items-center gap-3">
          <NotificationBell />

          {/* Admin Info (Tablet & Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {admin?.name || "Admin"}
              </p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
              {admin?.name?.charAt(0).toUpperCase() || "A"}
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="p-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition shadow-md hover:shadow-lg"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
