import { DashboardStatsResponseSchema } from '@/schemas/dashboard/dashboard-stats-response.schema';
import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await api.get('/dashboard');
      return DashboardStatsResponseSchema.parse(response.data);
    },
    staleTime: 60_000,
  });
}
