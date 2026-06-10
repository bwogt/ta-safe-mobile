import { ApiFlashMessageSchema } from '@/schemas/message/api-flash-message.schema';
import { PasswordResetCheckCodeRequest } from '@/schemas/password-reset/check-code.request.schema';
import api from '@/services/api';
import { applyValidationErrors } from '@/services/form/apply-validation-errors';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { router } from 'expo-router';
import { UseFormSetError } from 'react-hook-form';

export function usePasswordResetCheckCode(
  setError: UseFormSetError<PasswordResetCheckCodeRequest>,
) {
  return useMutation({
    mutationFn: async (data: PasswordResetCheckCodeRequest) => {
      const response = await api.post('/password-reset/check-code', data);
      return ApiFlashMessageSchema.parse(response.data.message);
    },

    onSuccess: (_, variables) => {
      router.replace({
        pathname: '/(public)/password-reset/reset',
        params: {
          email: variables.email,
          code: variables.code,
        },
      });
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        applyValidationErrors(error, setError);
      }
    },
  });
}
