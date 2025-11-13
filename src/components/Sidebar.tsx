import { Link, useLocation } from "react-router-dom";
import {
  Home,
  PackagePlus,
  FolderPlus,
  Brain,
  User,
  X,
  ShoppingBag,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  const links = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    {
      name: "Manage Category",
      icon: FolderPlus,
      path: "/dashboard/manage-category",
    },
    { name: "Add Product", icon: PackagePlus, path: "/dashboard/products/add" },
    { name: "Product List", icon: User, path: "/dashboard/products" },
    { name: "Orders", icon: ShoppingBag, path: "/dashboard/orders" },
    { name: "AI Tools", icon: Brain, path: "/dashboard/ai-tools" },
    { name: "Profile", icon: User, path: "/dashboard/profile" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-md z-40 transition-opacity md:hidden 
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-xl
        z-50 transform transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0 md:shadow-none`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
          <button onClick={onClose} className="md:hidden text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col p-3 space-y-2">
          {links.map(({ name, icon: Icon, path }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={name}
                to={path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                  transition-all duration-200
                  ${
                    active
                      ? "bg-blue-500 text-white shadow"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
              >
                <Icon className="w-5 h-5" />
                {name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
