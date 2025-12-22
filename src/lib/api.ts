import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "https://api.myazstore.shop";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export const endpoints = {
  admin: {
    login: "/v1/admin/login",
    logout: "/v1/admin/logout",
    me: "/v1/admin/me",
    setup2fa: "/v1/admin/2fa/setup",
    verify2fa: "/v1/admin/2fa/verify",
    verifyLogin2fa: "/v1/admin/2fa/login",
    recoveryCodes: "/v1/admin/2fa/recovery-codes",
    clearTrusted: "/v1/admin/2fa/clear-trusted",
    disable: "/v1/admin/2fa/disable",
  },

  categories: "/v1/categories",
  products: "/v1/products",
  hero: "/v1/hero",
};

export async function getInventoryOverview() {
  const res = await axios.get(`${baseURL}/v1/admin/inventory`, {
    withCredentials: true,
  });
  return res.data;
}

export async function getInventoryProduct(id: string) {
  const res = await axios.get(`${baseURL}/v1/admin/inventory/product/${id}`, {
    withCredentials: true,
  });
  return res.data;
}

export async function getProfitSummary() {
  const res = await axios.get(`${baseURL}/v1/admin/profit/summary`, {
    withCredentials: true,
  });
  return res.data;
}

export async function getMonthlyProfit(months = 12) {
  const res = await axios.get(
    `${baseURL}/v1/admin/profit/monthly?months=${months}`,
    { withCredentials: true }
  );
  return res.data;
}
export async function getStockStatus() {
  const res = await axios.get(`${baseURL}/v1/admin/inventory/stock-status`, {
    withCredentials: true,
  });
  return res.data;
}

// lib/api.ts

export type CustomerQuery = {
  page: number;
  limit: number;

  q?: string;
  sortBy?: string;
  order?: "asc" | "desc";

  // ✅ ADD THESE
  period?: "all" | "7d" | "30d" | "month";
  repeat?: "new" | "repeat";
};

export async function fetchCustomers(query: CustomerQuery) {
  const res = await axios.get(`${baseURL}/v1/admin/customers`, {
    params: query,
    withCredentials: true,
  });

  return res.data;
}
export async function fetchCustomerAnalytics() {
  const res = await axios.get(`${baseURL}/v1/admin/customers/analytics`, {
    withCredentials: true,
  });
  return res.data;
}
// listNotifications(); // all
// listNotifications({ unreadOnly: true });
// listNotifications({ type: "low_stock" });
// listNotifications({ unreadOnly: true, type: "new_order" });

export async function listNotifications({
  unreadOnly = false,
  type,
}: {
  unreadOnly?: boolean;
  type?: string;
} = {}) {
  const params = new URLSearchParams();

  if (unreadOnly) params.append("unreadOnly", "true");
  if (type) params.append("type", type);

  const res = await axios.get(
    `${baseURL}/v1/admin/notifications?${params.toString()}`,
    { withCredentials: true }
  );

  return res.data;
}

export async function deleteNotifications(ids: string[]) {
  if (!ids.length) return;

  const res = await axios.delete(`${baseURL}/v1/admin/notifications`, {
    data: { ids },
    withCredentials: true,
  });

  return res.data;
}

export async function markNotificationsRead(ids: string[]) {
  const res = await axios.post(
    `${baseURL}/v1/admin/notifications/mark-read`,
    { ids },
    { withCredentials: true }
  );
  return res.data;
}
