import { PaginatedDevicesSchema } from '@/schemas/device/pagination/paginated-devices.schema';
import { DeviceValidationStatus } from '@/schemas/device/validation/device-validation-status.schema';
import api from '@/services/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useDevicesByStatus(status: DeviceValidationStatus) {
  return useInfiniteQuery({
    queryKey: ['devices', status],

    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get(`/user/devices/${status}`, {
        params: {
          page: pageParam,
        },
      });

      return PaginatedDevicesSchema.parse(response.data);
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (!lastPage.meta.has_next_page) {
        return undefined;
      }

      return lastPage.meta.current_page + 1;
    },

    staleTime: 30_000,
  });
}
