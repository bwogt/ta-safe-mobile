import {
  DeviceTransferStatus,
  paginatedDeviceTransfersSchema,
} from '@/schemas/device';

import api from '@/services/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useTransfersByStatus(
  status: DeviceTransferStatus | null = null,
) {
  return useInfiniteQuery({
    queryKey: ['transfers', status],
    initialPageParam: undefined as string | undefined,

    queryFn: async ({ pageParam }) => {
      const response = await api.get('user/transfers', {
        params: pageParam ? { cursor: pageParam } : {},
      });

      return paginatedDeviceTransfersSchema.parse(response.data);
    },

    getNextPageParam: (lastPage) => {
      return lastPage.meta.has_more_page
        ? lastPage.meta.next_cursor
        : undefined;
    },
  });
}
