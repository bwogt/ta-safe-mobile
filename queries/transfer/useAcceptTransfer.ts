import api from '@/services/api';
import { queryClient } from '@/services/queryClient';
import { useMutation } from '@tanstack/react-query';

export function useAcceptTransfer(transferId: number) {
  return useMutation({
    mutationFn: async () => {
      const response = await api.post(`transfers/${transferId}/accept`);
      return response.data;
    },
    onSuccess: async ({ transfer }) => {
      queryClient.setQueryData(['transfer', String(transferId)], transfer);

      await queryClient.invalidateQueries({
        queryKey: ['transfers'],
        refetchType: 'all',
      });
    },
  });
}
