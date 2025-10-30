import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Menu, Sun, Moon, LogOut } from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const { admin, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState<string>("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

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
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Theme toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="flex justify-between items-center px-4 py-2 sm:py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
      {/* Left Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Sidebar Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden text-gray-800 dark:text-gray-100"
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Greeting + Time */}
        <div>
          <h2 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
            {greeting()}, {admin?.name || "Admin"} 👋
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {currentTime}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          disabled
          onClick={() => setDarkMode(!darkMode)}
          className="p-1.5 sm:p-2 cursor-not-allowed rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>

        <button
          onClick={logout}
          className="flex items-center justify-center p-1.5 sm:p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
