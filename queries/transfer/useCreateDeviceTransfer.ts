import { apiMessageResponseSchema } from '@/schemas/message';
import { CreateDeviceTransferRequest } from '@/schemas/transfer';
import api from '@/services/api';
import { useMutation } from '@tanstack/react-query';

export function useCreateDeviceTransfer() {
  return useMutation({
    mutationFn: async ({
      device_id,
      target_user_id,
    }: CreateDeviceTransferRequest) => {
      const response = await api.post(`/devices/${device_id}`, undefined, {
        params: { target_user_id },
      });

      return apiMessageResponseSchema.parse(response.data);
    },
  });
}
