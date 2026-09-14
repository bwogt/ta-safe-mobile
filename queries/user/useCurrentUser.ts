import { userSchema } from '@/schemas/user';
import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const response = await api.get('/user');
      return userSchema.parse(response.data);
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
