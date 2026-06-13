import { queryClient } from '@/app/_layout';
import { UpdateProfileRequest } from '@/schemas/user/update-profile.request.schema';
import { UpdateProfileResponseSchema } from '@/schemas/user/update-profile.response.schema';
import api from '@/services/api';
import { applyApiFormErrors } from '@/utils/forms/applyApiFormErrors';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

export function useUpdateProfile(
  setError: UseFormSetError<UpdateProfileRequest>,
) {
  return useMutation({
    mutationFn: async (data: UpdateProfileRequest) => {
      const response = await api.patch('/user', data);
      return UpdateProfileResponseSchema.parse(response.data);
    },
    onSuccess: ({ user }) => {
      queryClient.setQueryData(['current-user'], user);
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
