import z from 'zod';

export const DeviceShareCodeSchema = z
  .string()
  .regex(/^\d{8}$/)
  .nullable();

export type DeviceShareCode = z.infer<typeof DeviceShareCodeSchema>;
