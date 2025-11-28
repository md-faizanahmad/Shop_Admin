import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "https://api.myazstore.shop";

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

const API_URL = import.meta.env.VITE_API_URL;

export async function getInventoryOverview() {
  const res = await axios.get(`${API_URL}/api/admin/inventory`, {
    withCredentials: true,
  });
  return res.data;
}

export async function getInventoryProduct(id: string) {
  const res = await axios.get(`${API_URL}/api/admin/inventory/product/${id}`, {
    withCredentials: true,
  });
  return res.data;
}

export async function getProfitSummary() {
  const res = await axios.get(`${API_URL}/api/admin/profit/summary`, {
    withCredentials: true,
  });
  return res.data;
}

export async function getMonthlyProfit(months = 12) {
  const res = await axios.get(
    `${API_URL}/api/admin/profit/monthly?months=${months}`,
    { withCredentials: true }
  );
  return res.data;
}

export async function listNotifications(unreadOnly = false) {
  const res = await axios.get(
    `${API_URL}/api/notifications?unreadOnly=${unreadOnly}`,
    { withCredentials: true }
  );
  return res.data;
}

export async function markNotificationsRead(ids: string[]) {
  const res = await axios.post(
    `${API_URL}/api/notifications/mark-read`,
    { ids },
    { withCredentials: true }
  );
  return res.data;
}
