import axios from "axios";
import { useToast } from "./useToast";

const toast = useToast();

console.log(import.meta.env.VITE_DISCORD_USER_ID); // Object yang berisi informasi environment
console.log(import.meta.env); // API Key
console.log(import.meta.env.MODE); // development atau production

const baseURL = import.meta.env.MODE === "development" ? "/api" : "https://be.fahrianggara.my.id/api"; 

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-API-KEY": import.meta.env.VITE_API_KEY,
  },
  timeout: 10000,
});

const apiService = {
  async request(method, url, data = null, params = {}) {
    try {
      const response = await apiClient({
        method,
        url,
        data,
        params,
      });
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Terjadi kesalahan pada API");
      throw error;
    }
  },

  async get(url, params = {}) {
    return await this.request("get", url, null, params);
  },

  async post(url, data) {
    return await this.request("post", url, data);
  },

  async put(url, data) {
    return await this.request("put", url, data);
  },

  async delete(url) {
    return await this.request("delete", url);
  },
};

export default apiService;
