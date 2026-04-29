import { User } from '@/schemas/user.schema';

export type AuthState = {
  user: User | null;
  accessToken: string | null;
  hydrated: boolean;

  setSession: (user: User, token: string) => void;
  logout: () => void;
  setHydrated: (value: boolean) => void;
};
