import { deviceSchema } from '@/schemas/device';
import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export function useDeviceById(id?: string) {
  return useQuery({
    queryKey: ['device', id],
    queryFn: async () => {
      const response = await api.get(`/devices/${id}`);
      return deviceSchema.parse(response.data);
    },
    enabled: !!id,
    staleTime: 30_000,
  });
}
