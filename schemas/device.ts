import z from 'zod';
import { deviceModelSchema } from './brand';
import { userSummarySchema } from './user';

// ─────────────────────────────────────────────
// Internal schemas
// ─────────────────────────────────────────────

const deviceValidationStatusSchema = z.enum([
  'validated',
  'pending',
  'in_analysis',
  'rejected',
]);

const deviceTransferStatusSchema = z.enum([
  'pending',
  'accepted',
  'cancelled',
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

const deviceTransferSchema = z
  .object({
    id: z.int().positive(),
    status: deviceTransferStatusSchema,
    source_user: userSummarySchema,
    target_user: userSummarySchema,
    updated_at: z.iso.datetime(),
  })
  .strict();

const deviceSummarySchema = z
  .object({
    id: z.int().positive(),
    color: z.string(),
    model: deviceModelSchema,
    validation_status: deviceValidationStatusSchema,
    validated_attributes: deviceValidatedAttributesSchema,
    updated_at: z.iso.datetime(),
  })
  .strict();

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
    imei_1: z.string().regex(/^\d{15}$/),
    imei_2: z.string().regex(/^\d{15}$/),
    access_key: z.string().regex(/^\d{44}$/),
    validation_status: deviceValidationStatusSchema,
    share_code: deviceShareCodeSchema,
    created_at: z.iso.datetime(),
    updated_at: z.iso.datetime(),
    model: deviceModelSchema,
    validated_attributes: deviceValidatedAttributesSchema,
    transfers: z.array(deviceTransferSchema),
  })
  .strict();

export const devicePublicSchema = z
  .object({
    id: z.int().positive(),
    color: z.string(),
    imei_1: z.string().regex(/^\d{3}\*{9}\d{3}$/),
    imei_2: z.string().regex(/^\d{3}\*{9}\d{3}$/),
    validation_status: deviceValidationStatusSchema,
    created_at: z.iso.datetime(),
    updated_at: z.iso.datetime(),
    owner: userSummarySchema,
    model: deviceModelSchema,
    validated_attributes: deviceValidatedAttributesSchema,
    transfers: z.array(deviceTransferSchema),
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
// Exported types
// ─────────────────────────────────────────────

export type Device = z.infer<typeof deviceSchema>;
export type DeviceSummary = z.infer<typeof deviceSummarySchema>;
export type DevicePublic = z.infer<typeof devicePublicSchema>;

export type DeviceValidationStatus = z.infer<
  typeof deviceValidationStatusSchema
>;
