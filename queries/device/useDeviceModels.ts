import { deviceModelsSchema } from '@/schemas/brand';
import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export function useDeviceModels(brandId: number | null) {
  return useQuery({
    queryKey: ['models', brandId],
    queryFn: async () => {
      const response = await api.get(`device-models/brands/${brandId}`);
      return deviceModelsSchema.parse(response.data);
    },
    enabled: !!brandId,
    staleTime: 60_000,
  });
}
