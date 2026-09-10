import { devicePublicSchema } from '@/schemas/device';
import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export default function useDeviceByShareCode(code?: string) {
  return useQuery({
    queryKey: ['device-by-code', code],
    queryFn: async () => {
      const response = await api.get('/device/share', {
        params: { code },
      });

      return devicePublicSchema.parse(response.data);
    },
    enabled: !!code,
    staleTime: 30_000,
    retry: false,
  });
}
