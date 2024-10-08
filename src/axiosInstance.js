import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

// Optionally, you can add interceptors for request or response
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify config before request is sent, e.g., adding auth token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // You can process the response here
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
