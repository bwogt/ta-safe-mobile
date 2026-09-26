import { DeviceRegistrationForm } from '@/schemas/device';
import { apiMessageResponseSchema } from '@/schemas/message';
import api from '@/services/api';
import { queryClient } from '@/services/queryClient';
import { useMutation } from '@tanstack/react-query';

export function useDeviceRegister() {
  return useMutation({
    mutationFn: async ({ model, accessKey, color }: DeviceRegistrationForm) => {
      const response = await api.post('devices', {
        device_model_id: model?.id,
        access_key: accessKey,
        color,
      });

      return apiMessageResponseSchema.parse(response.data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['devices', 'pending'],
      });
    },
  });
}
