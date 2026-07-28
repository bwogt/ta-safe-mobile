import { CursorPaginatedDevicesSchema } from '@/schemas/device/pagination/cursor-paginated-devices.schema';
import { DeviceValidationStatus } from '@/schemas/device/validation/device-validation-status.schema';
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

      return CursorPaginatedDevicesSchema.parse(response.data);
    },

    getNextPageParam: (lastPage) => {
      return lastPage.meta.has_more_page
        ? lastPage.meta.next_cursor
        : undefined;
    },

    staleTime: 30_000,
  });
}
