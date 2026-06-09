import { ApiFlashMessageSchema } from '@/schemas/message/api-flash-message.schema';
import { PasswordResetStartRequest } from '@/schemas/password-reset/start.request.shema';
import api from '@/services/api';
import { applyValidationErrors } from '@/services/form/apply-validation-errors';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { router } from 'expo-router';
import { UseFormSetError } from 'react-hook-form';

export function usePasswordResetStart(
  setError: UseFormSetError<PasswordResetStartRequest>,
) {
  return useMutation({
    mutationFn: async (data: PasswordResetStartRequest) => {
      const response = await api.post('/password-reset/start', data);
      return ApiFlashMessageSchema.parse(response.data.message);
    },

    onSuccess: (_, variables) => {
      router.replace({
        pathname: '/(public)/password-reset/check',
        params: { email: variables.email },
      });
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        applyValidationErrors(error, setError);
      }
    },
  });
}
