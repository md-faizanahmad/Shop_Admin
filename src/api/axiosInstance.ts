import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/mystoreapi",
  withCredentials: true, // to send cookies automatically
});

export default axiosInstance;
