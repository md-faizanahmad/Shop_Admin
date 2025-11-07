import { Link, useLocation } from "react-router-dom";
import { Home, PackagePlus, FolderPlus, Brain, User, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  const links = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Add Product", icon: PackagePlus, path: "/dashboard/add-product" },
    { name: "Add Category", icon: FolderPlus, path: "/dashboard/add-category" },
    { name: "Product List", icon: User, path: "/dashboard/productlist" },
    { name: "AI Tools", icon: Brain, path: "/dashboard/ai-tools" },
    // { name: "Profile", icon: User, path: "/dashboard/profile" },
  ];

  return (
    <>
      {/* Overlay with fade effect */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ease-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 h-170 w-64 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-all duration-300 ease-out
        ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
        md:static md:translate-x-0 md:opacity-100 md:shadow-none`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            Admin Panel
          </h1>
          <button
            onClick={onClose}
            className="md:hidden text-gray-800 dark:text-gray-100"
            aria-label="Close Sidebar"
          >
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
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                  ${
                    active
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-900 dark:text-gray-00 hover:bg-gray-200 dark:hover:bg-gray-700"
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
