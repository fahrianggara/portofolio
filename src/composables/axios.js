import axios from "axios";
import dotenv from "dotenv";

// For server-side (SSR or Node.js) environments, load .env variables using dotenv
if (typeof window === "undefined") {
  dotenv.config();  // Only do this for server-side code
}

const isClient = typeof window !== "undefined"; // Check if it's the client (browser)

const apiClient = axios.create({
  baseURL: isClient
    ? import.meta.env.VITE_API_URL  // Client-side (Vite injected env variable)
    : process.env.VITE_API_URL,     // Server-side (dotenv loaded env variable)
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default apiClient;
