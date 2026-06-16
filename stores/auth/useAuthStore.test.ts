import { useAuthStore } from '@/stores/auth/useAuthStore';
import * as SecureStore from 'expo-secure-store';

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

describe('useAuthStore', () => {
  const token = 'jwt|1234567890';

  beforeEach(() => {
    useAuthStore.getState().logout();
    jest.clearAllMocks();
  });

  it('should have no access token before authentication', () => {
    const state = useAuthStore.getState();
    expect(state.accessToken).toBeNull();
  });

  it('should store the access token after authentication', () => {
    useAuthStore.getState().setAccessToken(token);
    const state = useAuthStore.getState();

    expect(state.accessToken).toBe(token);
  });

  it('should remove the access token on logout', () => {
    useAuthStore.getState().setAccessToken(token);
    useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.accessToken).toBeNull();
  });

  it('should persist the access token in SecureStore', async () => {
    useAuthStore.getState().setAccessToken(token);
    await Promise.resolve();

    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      'auth-storage',
      expect.any(String),
    );
  });
});
