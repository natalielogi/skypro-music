import axios from 'axios';
import { BASE_URL } from './constants';
import { error } from 'console';
import { accessTokenType } from '@/sharedTypes/types';
import { refreshToken } from './auth/authApi';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('access');
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('refresh')
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem('refresh');
        if (!refresh) throw new Error('Нет refresh токена');

        const newToken: accessTokenType = await refreshToken({ refresh });
        localStorage.setItem('access', newToken.access);

        originalRequest.headers.Authorization = `Bearer ${newToken.access}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Ошибка обновления токена:', refreshError);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/auth/signin';
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
