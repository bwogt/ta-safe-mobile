import { PaginatedDevicesSchema } from '@/schemas/device/pagination/paginated-devices.schema';
import { DeviceValidationStatus } from '@/schemas/device/validation/device-validation-status.schema';
import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export function useDevicesByStatus(status: DeviceValidationStatus) {
  return useQuery({
    queryKey: ['devices', status],
    queryFn: async () => {
      const response = await api.get(`/user/devices/${status}`);
      return PaginatedDevicesSchema.parse(response.data);
    },
    staleTime: 30_000,
  });
}
