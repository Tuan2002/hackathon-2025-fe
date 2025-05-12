import axios from 'axios';
import getAccessToken from './getAccessToken';
import ENVIRONMENT from '@/constants/env';
// import { IAppResponseBase } from '~/baseTypes';
const baseURL = String(ENVIRONMENT.BACKEND_URL);
const http = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  if (!config.headers.Authorization && getAccessToken() !== undefined) {
    config.headers.Authorization = 'Bearer ' + String(getAccessToken());
  }
  return config;
});

http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // window.location.href = "/login";
    }
    return await Promise.reject(error);
  },
);
export default http;
