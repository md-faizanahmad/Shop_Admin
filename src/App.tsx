import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoutes";
import DashboardLayout from "./layout/DashboardLayout";
import { AITools } from "./pages/AITools";
import AddProduct from "./pages/AddProduct/AddProduct";
import AddCategory from "./pages/AddCategory/AddCategory";

function App() {
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
          <Route path="add-product" element={<AddProduct />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="profile" element={<Profile />} />
          <Route path="ai-tools" element={<AITools />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
