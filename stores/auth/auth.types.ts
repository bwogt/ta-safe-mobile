export type AuthState = {
  accessToken: string | null;
  hydrated: boolean;

  setAccessToken: (token: string) => void;
  setHydrated: (value: boolean) => void;
  logout: () => void;
};
