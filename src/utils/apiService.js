import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api", // DI AMBIL DI VITE.CONFIG.JS
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-API-KEY": import.meta.env.VITE_API_KEY,
  },
  timeout: 5000,
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
      throw error.response ? error.response.data : error;
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
