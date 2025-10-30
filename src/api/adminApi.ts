import axios from "axios";

const MyStoreApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/mystoreapi",
  withCredentials: true, // important for cookies
});

export const loginAdmin = async (email: string, password: string) => {
  const { data } = await MyStoreApi.post("/admin/login", { email, password });
  return data;
};
