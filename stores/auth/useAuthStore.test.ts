import { User } from '@/schemas/user/user.schema';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import * as SecureStore from 'expo-secure-store';
import { makeUser } from '../../tests/factories/makeUser';

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

describe('useAuthStore', () => {
  let user: User;
  const token = 'token-123';

  beforeEach(() => {
    user = makeUser();
    useAuthStore.getState().logout();
    jest.clearAllMocks();
  });

  it('should start with empty session', () => {
    const state = useAuthStore.getState();

    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
  });

  it('should set session correctly', () => {
    useAuthStore.getState().setSession(user, token);
    const state = useAuthStore.getState();

    expect(state.user).toEqual(user);
    expect(state.accessToken).toBe(token);
  });

  it('should clear session on logout', () => {
    useAuthStore.getState().setSession(user, token);
    useAuthStore.getState().logout();

    const state = useAuthStore.getState();

    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
  });

  it('should persist session in secure storage', async () => {
    useAuthStore.getState().setSession(user, token);
    await Promise.resolve();

    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      'auth-storage',
      expect.any(String),
    );
  });
});
