import axios from 'axios';
import getAccessToken from './getAccessToken';
import ENVIRONMENT from '@/constants/env';

const baseURL = String(ENVIRONMENT.BACKEND_URL);

const http = axios.create({
  baseURL,
  withCredentials: true, // giữ cookie nếu có
});

// Interceptor request
http.interceptors.request.use((config) => {
  // Thêm Authorization nếu chưa có
  if (!config.headers.Authorization && getAccessToken() !== undefined) {
    config.headers.Authorization = 'Bearer ' + String(getAccessToken());
  }

  // Set Content-Type nếu KHÔNG phải FormData
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

// Interceptor response
http.interceptors.response.use(
  (response) => {
    return response.data; // trả về response.data thôi cho gọn
  },
  async (error) => {
    if (error.response?.status === 401) {
      // window.location.href = "/login";
    }
    return await Promise.reject(error);
  },
);

export default http;
