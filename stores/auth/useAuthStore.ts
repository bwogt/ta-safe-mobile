import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { secureStore } from './auth.storage';
import { AuthState } from './auth.types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      hydrated: false,

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

      setHydrated: (value) =>
        set({
          hydrated: value,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStore),

      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
