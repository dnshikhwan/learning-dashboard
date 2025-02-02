import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  withCredentials: true,
});
