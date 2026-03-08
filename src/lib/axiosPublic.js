import axios from "axios";

/**
 * Public Axios Instance
 * For unauthenticated requests (login, register, etc.)
 */
const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosPublic;
