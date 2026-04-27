import { User } from '@/schemas/user.schema';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AuthState = {
  user: User | null;
  accessToken: string | null;

  setSession: (user: User, token: string) => void;
  logout: () => void;
};

const secureStore = {
  getItem: async (name: string) => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string) => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string) => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

      setSession: (user, token) =>
        set({
          user,
          accessToken: token,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStore),
    },
  ),
);
