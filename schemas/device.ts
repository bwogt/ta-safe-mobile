import z from 'zod';

export const deviceBrandSchema = z
  .object({
    id: z.number().positive(),
    name: z.string(),
  })
  .strict();

export const deviceModelSchema = z
  .object({
    id: z.number().positive(),
    name: z.string(),
    ram: z.string(),
    storage: z.string(),
    brand: deviceBrandSchema,
  })
  .strict();

export const deviceShareCodeSchema = z
  .object({
    code: z.string().regex(/^\d{8}$/),
    expires_at: z.iso.datetime(),
  })
  .strict()
  .nullable();

export const deviceLookupRequestSchema = z.object({
  code: z.string().regex(/^\d{8}$/),
});

export const deviceValidatedAttributesSchema = z
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

export const deviceTransferUserSchema = z
  .object({
    id: z.number().positive(),
    name: z.string(),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
    created_at: z.iso.datetime(),
  })
  .strict();

export const deviceTransferSchema = z
  .object({
    id: z.number().positive(),
    status: z.enum(['pending', 'accepted', 'cancelled', 'rejected']),
    source_user: deviceTransferUserSchema,
    target_user: deviceTransferUserSchema,
    updated_at: z.iso.datetime(),
  })
  .strict();

export const deviceValidationStatusSchema = z.enum([
  'validated',
  'pending',
  'in_analysis',
  'rejected',
]);

export const deviceSchema = z
  .object({
    id: z.number().positive(),
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
    transfers: z.array(deviceTransferUserSchema),
  })
  .strict();

export const deviceSummarySchema = z
  .object({
    id: z.number().positive(),
    color: z.string(),
    model: deviceModelSchema,
    validation_status: deviceValidationStatusSchema,
    validated_attributes: deviceValidatedAttributesSchema,
    updated_at: z.iso.datetime(),
  })
  .strict();

export const devicePublicSchema = z
  .object({
    id: z.number().positive(),
    color: z.string(),
    imei_1: z.string().regex(/^\d{3}\*{9}\d{3}$/),
    imei_2: z.string().regex(/^\d{3}\*{9}\d{3}$/),
    validation_status: deviceValidationStatusSchema,
    created_at: z.iso.datetime(),
    updated_at: z.iso.datetime(),
    owner: z.object({
      id: z.number().positive(),
      name: z.string(),
      cpf: z.string().regex(/^\*{3}\.\d{3}\.\d{3}-\*{2}$/),
      created_at: z.iso.datetime(),
    }),
    model: deviceModelSchema,
    validated_attributes: deviceValidatedAttributesSchema,
    transfers: z.array(deviceTransferUserSchema),
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

export type DeviceBrand = z.infer<typeof deviceBrandSchema>;
export type DeviceModel = z.infer<typeof deviceModelSchema>;
export type DeviceShareCode = z.infer<typeof deviceShareCodeSchema>;
export type DeviceTransferUserSchema = z.infer<typeof deviceTransferUserSchema>;
export type DeviceTransfer = z.infer<typeof deviceTransferSchema>;
export type Device = z.infer<typeof deviceSchema>;
export type DeviceSummary = z.infer<typeof deviceSummarySchema>;
export type DevicePublic = z.infer<typeof devicePublicSchema>;
export type DeviceLookupRequest = z.infer<typeof deviceLookupRequestSchema>;

export type DeviceValidatedAttributes = z.infer<
  typeof deviceValidatedAttributesSchema
>;

export type DeviceValidationStatus = z.infer<
  typeof deviceValidationStatusSchema
>;

export type CursorPaginatedDevices = z.infer<
  typeof cursorPaginatedDevicesSchema
>;
