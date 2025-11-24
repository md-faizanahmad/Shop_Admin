import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "https://admin.myazstore.shop";

// One client for the whole app; cookies ON for HttpOnly auth
export const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Helper paths (centralized, versioned)
// export const endpoints = {
//   admin: {
//     login: "/mystoreapi/admin/login",
//     logout: "/mystoreapi/admin/logout",
//     me: "/mystoreapi/admin/me",
//   },
//   categories: "/mystoreapi/categories",
//   products: "/mystoreapi/products",
// };
export const endpoints = {
  admin: {
    login: "/api/admin/login",
    logout: "/api/admin/logout",
    me: "/api/admin/me",
  },
  categories: "/api/categories",
  products: "/api/products",
};
