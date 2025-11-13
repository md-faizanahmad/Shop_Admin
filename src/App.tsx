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
import { AITools } from "./pages/AITools";

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

          <Route path="orders" element={<OrdersPage />} />

          <Route path="ai-tools" element={<AITools />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}
