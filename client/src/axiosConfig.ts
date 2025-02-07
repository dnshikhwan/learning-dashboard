import axios, { AxiosError } from "axios";

const baseURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:5000/api";

export const axiosConfig = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});

axiosConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        window.location.href = "/auth/signin";
      }
    }
  }
);
