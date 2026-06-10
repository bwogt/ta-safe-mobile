import { LoginRequest } from '@/schemas/auth/login-request.schema';
import { LoginResponseSchema } from '@/schemas/auth/login-response.schema';
import api from '@/services/api';
import { applyValidationErrors } from '@/services/form/apply-validation-errors';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

export function useLogin(setError: UseFormSetError<LoginRequest>) {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await api.post('/auth/login', data);
      return LoginResponseSchema.parse(response.data);
    },

    onSuccess: ({ data: { user, token } }) => {
      useAuthStore.setState({ user: user, accessToken: token });
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        applyValidationErrors(error, setError);
      }
    },
  });
}
