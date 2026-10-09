import { FindUserByEmailRequest, userPublicSchema } from '@/schemas/user';

import api from '@/services/api';
import { applyApiFormErrors } from '@/utils/forms/applyApiFormErrors';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

export function useUserByEmail(
  setError: UseFormSetError<FindUserByEmailRequest>,
) {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await api.get(`/user/search-by-email?email=${email}`);
      return userPublicSchema.parse(response.data);
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
