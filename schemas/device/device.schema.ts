import { z } from 'zod';
import { DeviceModelSchema } from './device-model.schema';
import { DeviceValidationStatusSchema } from './device-validation-status.schema';

export const DeviceSchema = z.object({
  id: z.number().positive(),
  color: z.string(),
  imei_1: z.string().regex(/^\d{15}$/),
  imei_2: z.string().regex(/^\d{15}$/),
  access_key: z.string().regex(/^\d{45}$/),
  validation_status: DeviceValidationStatusSchema,
  share_code: z.string().regex(/^\d{8}$/),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  model: DeviceModelSchema,
});

export type Device = z.infer<typeof DeviceSchema>;
