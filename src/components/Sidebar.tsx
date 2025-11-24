import { Link, useLocation } from "react-router-dom";
import {
  Home,
  PackagePlus,
  FolderPlus,
  Brain,
  User,
  X,
  Sparkles,
  Users,
  Package,
  ChartSpline,
  BarChart3,
  ShoppingBag,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Analytics", icon: BarChart3, path: "/dashboard" },
    { name: "Orders List", icon: ShoppingBag, path: "/dashboard/orders" },

    {
      name: "Customers Analytics",
      icon: ChartSpline,
      path: "/dashboard/customersAnalytics",
    },

    {
      name: "All Customers ",
      icon: Users,
      path: "/dashboard/customers",
    },
    // Products Section
    { name: "Products List", icon: Package, path: "/dashboard/products" },
    {
      name: "Add Products",
      icon: PackagePlus,
      path: "/dashboard/products/add",
    },
    {
      name: "Categories",
      icon: FolderPlus,
      path: "/dashboard/manage-category",
    },

    // AI Tools (Your USP)
    {
      name: "AI Description",
      icon: Sparkles,
      path: "/dashboard/ai-tools/description",
    },
    { name: "AI Tools", icon: Brain, path: "/dashboard/ai-tools" },

    // Account
    { name: "Profile", icon: User, path: "/dashboard/profile" },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 max-h-screen w-64 bg-gray-200 shadow-xl z-50
        transform transition-all duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-lg font-bold">
            <Link to="/dashboard" className="text-gray-700">
              Admin Panel
            </Link>
          </h1>
          <button onClick={onClose} className="md:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col p-3 space-y-2">
          {navItems.map(({ name, icon: Icon, path }) => {
            const active = location.pathname === path;

            return (
              <Link
                key={name}
                to={path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                  transition-all duration-200 group
                  ${
                    active
                      ? "bg-sky-800 text-white shadow-md"
                      : "text-red-700 hover:bg-black"
                  }
                `}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110
                    ${active ? "text-white" : "text-gray-600"}`}
                />
                {name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
