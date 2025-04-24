import axios from 'axios';
import { getCookie } from '@/utils/cookieutil';

// Create Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000', // Use the /api path for internal API routes in Next.js
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getCookie('token');
    if (token) {
      // Add token to the Authorization header if available
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
