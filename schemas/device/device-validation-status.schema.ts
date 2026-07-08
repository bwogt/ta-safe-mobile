import { z } from 'zod';

export const DEVICE_VALIDATION_STATUS = [
  'validated',
  'pending',
  'in_analysis',
  'rejected',
] as const;

export const DeviceValidationStatusSchema = z.enum(DEVICE_VALIDATION_STATUS);

export type DeviceValidationStatus = z.infer<
  typeof DeviceValidationStatusSchema
>;
