import { DeviceRegistrationForm } from '@/schemas/device';
import { apiMessageResponseSchema } from '@/schemas/message';
import api from '@/services/api';
import { queryClient } from '@/services/queryClient';
import { applyApiFormErrors } from '@/utils/forms/applyApiFormErrors';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

export function useDeviceRegister(
  setError: UseFormSetError<DeviceRegistrationForm>,
) {
  return useMutation({
    mutationFn: async ({
      model,
      access_key,
      color,
    }: DeviceRegistrationForm) => {
      const response = await api.post('devices', {
        device_model_id: model?.id,
        access_key: access_key.replace(/\D/g, ''),
        color,
      });

      return apiMessageResponseSchema.parse(response.data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['devices', 'pending'],
      });

      queryClient.invalidateQueries({
        queryKey: ['dashboard-stats'],
      });
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
