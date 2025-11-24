import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
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
import CustomersDashboard from "./pages/CustomersAnalytics";
import CustomersPage from "./pages/CustomersPage";
import CustomerDetailsPage from "./pages/CustomerDetailsPage";

export default function App() {
  return (
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
          <Route index element={<Dashboard />} />
          <Route path="manage-category" element={<AddCategory />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/manage/:orderId" element={<OrderManage />} />
          {/* <Route path="/dashboard/orders/manage/:orderId" element={<OrderManage />} /> */}

          <Route path="profile" element={<Profile />} />
          <Route path="customersAnalytics" element={<CustomersDashboard />} />
          <Route path="customers" element={<CustomersPage />} />
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
  );
}
