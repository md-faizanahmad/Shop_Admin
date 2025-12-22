import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/components/auth/Login";
import ProtectedRoute from "./routes/ProtectedRoutes";
import DashboardLayout from "./layout/DashboardLayout";
import AddProduct from "./pages/CrudProduct/AddProduct";
import AddCategory from "./pages/CrudCategory/AddCategory";
import ProductList from "./pages/productList/ProductListPage";
import Profile from "./components/auth/Profile";
import OrdersPage from "./pages/Orders/Orders";
import AITools from "./pages/AI/AITools";
import ProductDescriptionAI from "./pages/AI/ProductDescriptionAI";
import RemoveBgAIPage from "./pages/AI/RemoveBgAI";
import EditProduct from "./pages/CrudProduct/EditProduct";
import OrderManage from "./pages/Orders/OrderManager";

import CustomerDetailsPage from "./pages/customers/CustomerDetailsPage";
import { ToastContainer } from "react-toastify";
import SetupHeroPage from "./pages/hero/SetupHeroPage";
import AdminProductDetails from "./pages/productDetails/AdminProductDetails";

import CustomerInsight from "./pages/customers/CustomerInsight";
import AdminDashboard from "@/pages/AdminDashboard";
import InventoryAnalyticsPro from "./pages/analyticsPro/InventoryAnalyticsPro";
import Setup2FA from "./components/auth/Setup2FA";
import SecurityCenter from "./components/auth/SecurityCenter";
import NotificationHistory from "./pages/notification/NotificationHistory";
import ScrollToTop from "./helper/ScrollTop";

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        limit={3}
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <Router>
        <ScrollToTop />
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
            <Route path="shop-analytics" element={<InventoryAnalyticsPro />} />
            <Route path="manage-category" element={<AddCategory />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="products/view/:id" element={<AdminProductDetails />} />

            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/manage/:orderId" element={<OrderManage />} />
            {/* <Route path="/dashboard/orders/manage/:orderId" element={<OrderManage />} /> */}

            <Route path="setupHero" element={<SetupHeroPage />} />

            {/* <Route path="profit" element={<ProfitDashboard />} /> */}
            <Route path="profile" element={<Profile />} />
            <Route path="2fa-setup" element={<Setup2FA />} />
            <Route path="security-center" element={<SecurityCenter />} />

            <Route path="customers-insight" element={<CustomerInsight />} />
            <Route path="customers/:id" element={<CustomerDetailsPage />} />

            <Route
              path="notification-history"
              element={<NotificationHistory />}
            />
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
