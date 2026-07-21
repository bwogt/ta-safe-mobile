import z from 'zod';
import { DeviceSchema } from '../base/device.schema';

export const CursorPaginatedDevicesSchema = z.object({
  data: z.array(DeviceSchema),
  meta: z.object({
    has_more_page: z.boolean(),
    next_cursor: z.string().nullable(),
  }),
});

export type CursorPaginatedDevices = z.infer<
  typeof CursorPaginatedDevicesSchema
>;
