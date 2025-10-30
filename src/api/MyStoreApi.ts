// src/api/MyStoreApi.ts
import axios from "axios";

export const MyStoreApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});
