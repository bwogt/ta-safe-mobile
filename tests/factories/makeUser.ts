import { User } from '@/schemas/user.schema';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { cpf } from 'cpf-cnpj-validator';

export function makeUser(overrides?: Partial<User>): User {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    cpf: cpf.generate({ formatted: true }),
    phone: faker.phone.number(),
    email_verified_at: null,
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    ...overrides,
  };
}
