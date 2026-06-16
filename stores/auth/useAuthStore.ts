import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { secureStore } from './auth.storage';
import { AuthState } from './auth.types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      hydrated: false,

      setAccessToken: (token) => set({ accessToken: token }),
      setHydrated: (value) => set({ hydrated: value }),
      logout: () => set({ accessToken: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStore),

      partialize: (state) => ({ accessToken: state.accessToken }),

      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
