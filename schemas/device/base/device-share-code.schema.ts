import z from 'zod';

export const DeviceShareCodeSchema = z
  .object({
    code: z.string().regex(/^\d{8}$/),
    expires_at: z.iso.datetime(),
  })
  .nullable();

export type DeviceShareCode = z.infer<typeof DeviceShareCodeSchema>;
