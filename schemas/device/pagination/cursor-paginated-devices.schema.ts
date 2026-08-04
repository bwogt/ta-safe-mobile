import z from 'zod';
import { DeviceSummarySchema } from './device-summary.schema';

export const CursorPaginatedDevicesSchema = z.object({
  data: z.array(DeviceSummarySchema),
  meta: z.object({
    has_more_page: z.boolean(),
    next_cursor: z.string().nullable(),
  }),
});

export type CursorPaginatedDevices = z.infer<
  typeof CursorPaginatedDevicesSchema
>;
