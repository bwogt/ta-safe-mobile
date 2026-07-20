import z from 'zod';
import { DeviceSchema } from '../base/device.schema';

export const PaginatedDevicesSchema = z.object({
  data: z.array(DeviceSchema),
  meta: z.object({
    current_page: z.number(),
    last_page: z.number(),
    per_page: z.number(),
    has_next_page: z.boolean(),
    total: z.number(),
  }),
});

export type PaginatedDevices = z.infer<typeof PaginatedDevicesSchema>;
