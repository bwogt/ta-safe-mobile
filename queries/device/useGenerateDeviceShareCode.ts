import { DeviceShareCodeSchema } from '@/schemas/device/base/device-share-code.schema';
import { Device } from '@/schemas/device/base/device.schema';
import api from '@/services/api';
import { queryClient } from '@/services/queryClient';
import { useMutation } from '@tanstack/react-query';

export function useGenerateDeviceShareCode() {
  return useMutation({
    mutationFn: async (deviceId: string) => {
      const response = await api.post(`/devices/${deviceId}/share`);
      return DeviceShareCodeSchema.parse(response.data);
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
