import z from 'zod';
import { DeviceModelSchema } from '../base/device-model.schema';
import { DeviceValidatedAttributesSchema } from '../validation/device-validated-attributes.schema';
import { DeviceValidationStatusSchema } from '../validation/device-validation-status.schema';

export const DeviceSummarySchema = z.object({
  id: z.number().positive(),
  color: z.string(),
  model: DeviceModelSchema,
  validation_status: DeviceValidationStatusSchema,
  validated_attributes: DeviceValidatedAttributesSchema,
  updated_at: z.iso.datetime(),
});

export type DeviceSummary = z.infer<typeof DeviceSummarySchema>;
