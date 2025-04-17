// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

// Add request interceptor for logging
axiosInstance.interceptors.request.use(
  (config) => {
    // console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(
      `API Response [${
        response.status
      }]: ${response.config.method.toUpperCase()} ${response.config.url}`
    );
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        `API Error [${
          error.response.status
        }]: ${error.config.method.toUpperCase()} ${error.config.url}`,
        error.response.data
      );
    } else {
      console.error(`API Error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
