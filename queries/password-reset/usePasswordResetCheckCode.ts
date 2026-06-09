import { apiFlashMessageSchema } from '@/schemas/message/api-flash-message.schema';
import { PasswordResetCheckCodeRequest } from '@/schemas/password-reset/password-reset-check-code.shema';
import api from '@/services/api';
import { applyValidationErrors } from '@/services/form/apply-validation-errors';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

export function usePasswordResetCheckCode(
  setError: UseFormSetError<PasswordResetCheckCodeRequest>,
) {
  return useMutation({
    mutationFn: async (data: PasswordResetCheckCodeRequest) => {
      const response = await api.post('/password-reset/check-code', data);
      return apiFlashMessageSchema.parse(response.data.message);
    },

    onSuccess: (data) => {
      console.log(data);
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        applyValidationErrors(error, setError);
      }
    },
  });
}
