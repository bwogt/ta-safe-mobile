import { Device, DeviceValidationStatus } from '@/schemas/device';
import { fakerPT_BR as faker } from '@faker-js/faker';

export function makeDevice(overrides?: Partial<Device>): Device {
  const validationStatus = overrides?.validation_status ?? 'pending';
  const validatedAttributes = defineValidatedAttributes(validationStatus);

  return {
    id: faker.number.int(),
    color: 'Laranja',
    imei_1: faker.string.numeric(15),
    imei_2: faker.string.numeric(15),
    access_key: faker.string.numeric(45),
    share_code: null,

    validation_status: validationStatus,
    validated_attributes: validatedAttributes,

    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),

    model: {
      id: faker.number.int(),
      name: 'iPhone 18 Pro Max',
      ram: '8 GB',
      storage: '512 GB',

      brand: {
        id: faker.number.int(),
        name: 'Apple',
      },
    },

    transfers: [],

    ...overrides,
  };
}

const defineValidatedAttributes = (
  validationStatus: DeviceValidationStatus,
) => {
  switch (validationStatus) {
    case 'validated':
      return {
        cpf: true,
        user_name: true,
        brand_name: true,
        model_name: true,
        ram: true,
        storage: true,
        color: true,
      };

    case 'rejected':
      return {
        cpf: false,
        user_name: true,
        brand_name: true,
        model_name: false,
        ram: true,
        storage: false,
        color: false,
      };

    default:
      return null;
  }
};
