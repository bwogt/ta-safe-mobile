import { UserSchema } from '@/schemas/user/user.schema';
import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const response = await api.get('/user');
      return UserSchema.parse(response.data);
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
