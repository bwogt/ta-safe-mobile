import { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { useAuthStore } from '@/stores/auth/useAuthStore';

export function authInterceptor(config: InternalAxiosRequestConfig) {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}

export function authErrorInterceptor(error: AxiosError) {
  return Promise.reject(error);
}
