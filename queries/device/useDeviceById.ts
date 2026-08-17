import { DeviceSchema } from '@/schemas/device/base/device.schema';
import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export function useDeviceById(id?: string) {
  return useQuery({
    queryKey: ['device', id],
    queryFn: async () => {
      const response = await api.get(`/devices/${id}`);
      return DeviceSchema.parse(response.data);
    },
    enabled: !!id,
    staleTime: 30_000,
  });
}
