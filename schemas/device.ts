import z from 'zod';
import { deviceModelSchema } from './brand';
import { userSummarySchema } from './user';

// ─────────────────────────────────────────────
// Local Schemas
// ─────────────────────────────────────────────

const deviceValidationStatusSchema = z.enum([
  'validated',
  'pending',
  'in_analysis',
  'rejected',
]);

const deviceValidatedAttributesSchema = z
  .object({
    cpf: z.boolean(),
    user_name: z.boolean(),
    brand_name: z.boolean(),
    model_name: z.boolean(),
    ram: z.boolean(),
    storage: z.boolean(),
    color: z.boolean(),
  })
  .strict()
  .nullable();

const deviceRegistrationSchema = z.object({
  brand: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable(),

  model: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable(),

  color: z.string(),
  access_key: z.string(),
});

// ─────────────────────────────────────────────
// Exported schemas
// ─────────────────────────────────────────────

export const deviceShareCodeSchema = z
  .object({
    code: z.string().regex(/^\d{8}$/),
    expires_at: z.iso.datetime(),
  })
  .strict()
  .nullable();

export const deviceSchema = z
  .object({
    id: z.int().positive(),
    color: z.string(),
    access_key: z.string().regex(/^\d{44}$/),
    validation_status: deviceValidationStatusSchema,
    share_code: deviceShareCodeSchema,
    created_at: z.iso.datetime(),
    updated_at: z.iso.datetime(),
    model: deviceModelSchema,
    validated_attributes: deviceValidatedAttributesSchema,
  })
  .strict();

export const deviceSummarySchema = z
  .object({
    id: z.int().positive(),
    color: z.string(),
    model: deviceModelSchema,
    validation_status: deviceValidationStatusSchema,
    validated_attributes: deviceValidatedAttributesSchema,
    updated_at: z.iso.datetime(),
  })
  .strict();

export const devicePublicSchema = z
  .object({
    id: z.int().positive(),
    color: z.string(),
    validation_status: deviceValidationStatusSchema,
    created_at: z.iso.datetime(),
    updated_at: z.iso.datetime(),
    owner: userSummarySchema,
    model: deviceModelSchema,
    validated_attributes: deviceValidatedAttributesSchema,
  })
  .strict();

export const cursorPaginatedDevicesSchema = z
  .object({
    data: z.array(deviceSummarySchema),
    meta: z.object({
      has_more_page: z.boolean(),
      next_cursor: z.string().nullable(),
    }),
  })
  .strict();

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type Device = z.infer<typeof deviceSchema>;
export type DeviceSummary = z.infer<typeof deviceSummarySchema>;
export type DevicePublic = z.infer<typeof devicePublicSchema>;
export type DeviceRegistrationForm = z.infer<typeof deviceRegistrationSchema>;

export type DeviceValidationStatus = z.infer<
  typeof deviceValidationStatusSchema
>;
