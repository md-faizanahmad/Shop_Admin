import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Menu, LogOut } from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const { admin, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState("");

  // Time updater
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleString("en-IN", {
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  // Greeting Text
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header
      className="flex justify-between items-center px-4 py-3 
      bg-white border-b border-gray-200 shadow-sm"
    >
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle */}
        <button onClick={onToggleSidebar} className="md:hidden text-gray-800">
          <Menu className="w-6 h-6" />
        </button>

        {/* Greeting */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {greeting()}, {admin?.name || "Admin"} 👋
          </h2>
          <p className="text-sm text-gray-500">{currentTime}</p>
        </div>
      </div>

      {/* Right side */}
      <button
        onClick={logout}
        className="flex items-center justify-center p-2 
        bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </header>
  );
};

export default Header;
