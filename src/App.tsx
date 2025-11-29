import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import ProtectedRoute from "./routes/ProtectedRoutes";
import DashboardLayout from "./layout/DashboardLayout";
import AddProduct from "./pages/CrudProduct/AddProduct";
import AddCategory from "./pages/CrudCategory/AddCategory";
import ProductList from "./pages/CrudProduct/ProductList";
import Profile from "./pages/Profile";
import OrdersPage from "./pages/Orders/Orders";
import AITools from "./pages/AITools";
import ProductDescriptionAI from "./pages/AI/ProductDescriptionAI";
import RemoveBgAIPage from "./pages/AI/RemoveBgAI";
import EditProduct from "./pages/CrudProduct/EditProduct";
import OrderManage from "./pages/Orders/OrderManager";

import CustomerDetailsPage from "./pages/CustomerDetailsPage";
import { ToastContainer } from "react-toastify";
import SetupHeroPage from "./pages/hero/SetupHeroPage";
import AdminProductDetails from "./pages/AdminProductDetails";
// import ProfitDashboard from "./pages/Inventory/ProfitDashboard";
import ProductStatsPage from "./pages/Inventory/ProductStatsPage";
import InventoryAnalyticsPro from "./pages/Inventory/InventoryAnalyticsPro";
import CustomerInsight from "./pages/CustomerInsight";
import AdminDashboard from "@/pages/AdminDashboard";

export default function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="manage-category" element={<AddCategory />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/view/:id" element={<AdminProductDetails />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/manage/:orderId" element={<OrderManage />} />
            {/* <Route path="/dashboard/orders/manage/:orderId" element={<OrderManage />} /> */}

            <Route path="setupHero" element={<SetupHeroPage />} />
            <Route path="shop-analytics" element={<InventoryAnalyticsPro />} />
            <Route path="products/details/:id" element={<ProductStatsPage />} />
            {/* <Route path="profit" element={<ProfitDashboard />} /> */}
            <Route path="profile" element={<Profile />} />

            <Route path="customers-insight" element={<CustomerInsight />} />
            <Route path="customers/:id" element={<CustomerDetailsPage />} />

            <Route path="ai-tools" element={<AITools />} />
            <Route
              path="ai-tools/description"
              element={<ProductDescriptionAI />}
            />
            <Route path="ai-tools/remove-bg" element={<RemoveBgAIPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
