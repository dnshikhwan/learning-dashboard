import axios, { AxiosError } from "axios";

export const axiosConfig = axios.create({
  baseURL: "http://localhost:5000/api",
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
