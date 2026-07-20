import { z } from 'zod';
import { DeviceTransferSchema } from '../transfers/device-transfers.schema';
import { DeviceValidatedAttributesSchema } from '../validation/device-validated-attributes.schema';
import { DeviceValidationStatusSchema } from '../validation/device-validation-status.schema';
import { DeviceModelSchema } from './device-model.schema';
import { DeviceShareCodeSchema } from './device-share-code.schema';

export const DeviceSchema = z.object({
  id: z.number().positive(),
  color: z.string(),
  imei_1: z.string().regex(/^\d{15}$/),
  imei_2: z.string().regex(/^\d{15}$/),
  access_key: z.string().regex(/^\d{44}$/),
  validation_status: DeviceValidationStatusSchema,
  share_code: DeviceShareCodeSchema,
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  model: DeviceModelSchema,
  validated_attributes: DeviceValidatedAttributesSchema,
  transfers: z.array(DeviceTransferSchema),
});

export type Device = z.infer<typeof DeviceSchema>;
