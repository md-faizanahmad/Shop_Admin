import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL ?? "https://my-store-backend-gamma.vercel.app";

// One client for the whole app; cookies ON for HttpOnly auth
export const api = axios.create({
  baseURL, // e.g. https://my-store-backend-gamma.vercel.app
  withCredentials: true,
});

// Helper paths (centralized, versioned)
export const endpoints = {
  admin: {
    login: "/mystoreapi/admin/login",
    logout: "/mystoreapi/admin/logout",
    me: "/mystoreapi/admin/me",
  },
  categories: "/mystoreapi/categories",
  products: "/mystoreapi/products",
};
