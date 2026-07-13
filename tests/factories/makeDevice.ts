import { Device } from '@/schemas/device/device.schema';
import { fakerPT_BR as faker } from '@faker-js/faker';

export function makeDevice(overrides?: Partial<Device>): Device {
  return {
    id: faker.number.int(),
    color: 'Laranja',
    imei_1: faker.string.numeric(15),
    imei_2: faker.string.numeric(15),
    access_key: faker.string.numeric(45),
    validation_status: 'validated',
    share_code: faker.string.numeric(8),
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

    ...overrides,
  };
}
