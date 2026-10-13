import z from 'zod';

export const createDeviceTransferRequestSchema = z.object({
  device_id: z.int().positive(),
  target_user_id: z.int().positive(),
});

export type CreateDeviceTransferRequest = z.infer<
  typeof createDeviceTransferRequestSchema
>;
