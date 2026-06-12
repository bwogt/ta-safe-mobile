import { UpdateProfileRequest } from '@/schemas/user/update-profile.request.schema';
import { UserSchema } from '@/schemas/user/user.schema';
import api from '@/services/api';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { applyApiFormErrors } from '@/utils/forms/applyApiFormErrors';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

export function useUpdateProfile(
  setError: UseFormSetError<UpdateProfileRequest>,
) {
  return useMutation({
    mutationFn: async (data: UpdateProfileRequest) => {
      await api.patch('/user', data);
      const user = await api.get('/user');

      return UserSchema.parse(user.data);
    },
    onSuccess: (data) => {
      useAuthStore.setState({ user: data });
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
