import { Device, deviceShareCodeSchema } from '@/schemas/device';
import api from '@/services/api';
import { queryClient } from '@/services/queryClient';
import { useMutation } from '@tanstack/react-query';

export function useGenerateDeviceShareCode() {
  return useMutation({
    mutationFn: async (deviceId: string) => {
      const response = await api.post(`/devices/${deviceId}/share`);
      return deviceShareCodeSchema.parse(response.data);
    },
    onSuccess: (shareCode, deviceId) => {
      queryClient.setQueryData<Device | undefined>(
        ['device', deviceId],
        (device) => {
          if (!device) return undefined;
          return { ...device, share_code: shareCode };
        },
      );
    },
  });
}
