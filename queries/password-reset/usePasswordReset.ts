import { ApiFlashMessageSchema } from '@/schemas/message/api-flash-message.schema';
import { PasswordResetRequest } from '@/schemas/password-reset/password-reset.schema';
import api from '@/services/api';
import { applyValidationErrors } from '@/services/form/apply-validation-errors';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { router } from 'expo-router';
import { UseFormSetError } from 'react-hook-form';

export function usePasswordReset(
  setError: UseFormSetError<PasswordResetRequest>,
) {
  return useMutation({
    mutationFn: async (data: PasswordResetRequest) => {
      const response = await api.post('/password-reset', data);
      return ApiFlashMessageSchema.parse(response.data.message);
    },

    onSuccess: () => {
      router.replace('/(public)/login');
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        applyValidationErrors(error, setError);
      }
    },
  });
}
