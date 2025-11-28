// Sidebar.tsx — The Premium 2025 Version
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  IndianRupee,
  Image,
  Warehouse,
  Folder,
  PackagePlus,
  Package,
  ShoppingBag,
  Users,
  UsersRound,
  Sparkles,
  User,
  X,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  // Perfect logical order + section grouping
  const navItems: (NavItem | { divider: string })[] = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },

    { divider: "SALES & ORDERS" },
    {
      name: "Sales Analytics",
      icon: IndianRupee,
      path: "/dashboard/shop-analytics",
    },
    { name: "Orders", icon: ShoppingBag, path: "/dashboard/orders" },

    { divider: "PRODUCTS & INVENTORY" },
    { name: "Products", icon: Package, path: "/dashboard/products" },
    { name: "Add Product", icon: PackagePlus, path: "/dashboard/products/add" },
    { name: "Categories", icon: Folder, path: "/dashboard/manage-category" },
    { name: "Inventory", icon: Warehouse, path: "/dashboard/inventory" },

    { divider: "CUSTOMERS" },
    { name: "All Customers", icon: Users, path: "/dashboard/customers" },
    {
      name: "Customer Analytics",
      icon: UsersRound,
      path: "/dashboard/customersAnalytics",
    },

    { divider: "MARKETING" },
    { name: "Hero Banner", icon: Image, path: "/dashboard/setupHero" },

    { divider: "AI TOOLS" },
    { name: "AI Tools", icon: Sparkles, path: "/dashboard/ai-tools" },

    { divider: "ACCOUNT" },
    { name: "Profile", icon: User, path: "/dashboard/profile" },
  ];

  const activePath = location.pathname;

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 md:hidden
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl border-r border-gray-100
          transform transition-all duration-500 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:shadow-xl
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="p-3 bg-linear-to-br from-sky-500 to-blue-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                Admin Panel
              </h4>
              <p className="text-xs text-gray-500">AZ Shop Dashboard</p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-3">
          {navItems.map((item, index) => {
            if ("divider" in item) {
              return (
                <div key={index} className="px-4 py-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {item.divider}
                  </span>
                </div>
              );
            }

            const Icon = item.icon;
            const isActive = activePath === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={`group relative flex items-center gap-4 px-4 py-1 rounded-2xl transition-all duration-300
                  ${
                    isActive
                      ? "bg-linear-to-r from-blue-600 to-sky-600 text-white shadow-xl shadow-blue-600/30"
                      : "text-gray-700 hover:bg-gray-50 hover:shadow-md"
                  }`}
              >
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-10 bg-blue-600 rounded-r-full shadow-lg" />
                )}

                {/* Icon */}
                <div
                  className={`p-2 rounded-xl transition-all duration-300
                    ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 group-hover:bg-sky-100 group-hover:text-sky-600"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Text */}
                <span className="font-medium text-sm">{item.name}</span>

                {/* Hover Arrow */}
                {!isActive && (
                  <ChevronRight className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Badge */}
      </aside>
    </>
  );
}
