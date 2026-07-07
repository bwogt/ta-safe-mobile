import { LoginRequest } from '@/schemas/auth/login-request.schema';
import { LoginResponseSchema } from '@/schemas/auth/login-response.schema';
import { RegisterUserRequest } from '@/schemas/auth/register-user-request.schema';
import api from '@/services/api';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { applyApiFormErrors } from '@/utils/forms/applyApiFormErrors';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { router } from 'expo-router';
import { UseFormSetError } from 'react-hook-form';

export function useRegisterUser(
  setError: UseFormSetError<RegisterUserRequest>,
) {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await api.post('/auth/register', data);
      return LoginResponseSchema.parse(response.data);
    },

    onSuccess: ({ token }) => {
      useAuthStore.getState().setAccessToken(token);
      router.replace('/(auth)/(drawer)/dashboard');
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) {
          applyApiFormErrors(error, setError);
        }
      }
    },
  });
}
