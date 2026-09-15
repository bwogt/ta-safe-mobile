import { deviceBrandsSchema } from '@/schemas/brand';
import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export function useDeviceBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const response = await api.get('brands');
      return deviceBrandsSchema.parse(response.data);
    },
    staleTime: 5_000,
  });
}
