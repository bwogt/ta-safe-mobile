import z from 'zod';
import { DeviceTransferUserSchema } from './device-transfer-user.schema';

export const DEVICE_TRANSFER_STATUS = [
  'pending',
  'accepted',
  'cancelled',
  'rejected',
] as const;

export const DeviceTransferSchema = z.object({
  id: z.number().positive(),
  status: z.enum(DEVICE_TRANSFER_STATUS),
  source_user: DeviceTransferUserSchema,
  target_user: DeviceTransferUserSchema,
  updated_at: z.iso.datetime(),
});

export type DeviceTransfer = z.infer<typeof DeviceTransferSchema>;
