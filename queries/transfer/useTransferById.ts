import { deviceTransferSchema } from '@/schemas/device';
import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export function useTransferById(id: string) {
  return useQuery({
    queryKey: ['transfer', id],
    queryFn: async () => {
      const response = await api.get(`transfers/${id}`);
      return deviceTransferSchema.parse(response.data);
    },
    staleTime: 30_000,
  });
}
