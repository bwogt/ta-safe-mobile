import { queryClient } from '@/services/queryClient';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { AxiosError } from 'axios';
import { router } from 'expo-router';

export async function authStatusInterceptor(error: AxiosError) {
  const status = error.response?.status;

  if (status === 401) {
    useAuthStore.getState().logout();
    queryClient.clear();

    router.replace('/(public)/login');
  }

  if (status === 403) {
    queryClient.invalidateQueries({
      queryKey: ['current-user'],
    });
  }

  return Promise.reject(error);
}
