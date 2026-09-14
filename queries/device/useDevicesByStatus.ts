import {
  cursorPaginatedDevicesSchema,
  DeviceValidationStatus,
} from '@/schemas/device';

import api from '@/services/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useDevicesByStatus(status: DeviceValidationStatus) {
  return useInfiniteQuery({
    queryKey: ['devices', status],
    initialPageParam: undefined as string | undefined,

    queryFn: async ({ pageParam }) => {
      const response = await api.get(`/user/devices/${status}`, {
        params: pageParam ? { cursor: pageParam } : {},
      });

      return cursorPaginatedDevicesSchema.parse(response.data);
    },

    getNextPageParam: (lastPage) => {
      return lastPage.meta.has_more_page
        ? lastPage.meta.next_cursor
        : undefined;
    },

    staleTime: 30_000,
  });
}
