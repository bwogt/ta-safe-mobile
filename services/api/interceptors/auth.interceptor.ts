import { InternalAxiosRequestConfig } from 'axios';

import { useAuthStore } from '@/stores/auth/useAuthStore';

export function authInterceptor(config: InternalAxiosRequestConfig) {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}
