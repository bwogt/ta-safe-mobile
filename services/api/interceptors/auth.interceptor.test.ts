import { useAuthStore } from '@/stores/auth/useAuthStore';
import { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { attachTokenInterceptor } from './attach-token.interceptor';

jest.mock('@/stores/auth/useAuthStore', () => ({
  useAuthStore: {
    getState: jest.fn(),
  },
}));

const mockedGetState = useAuthStore.getState as jest.Mock;

describe('attachTokenInterceptor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createConfig = () =>
    ({
      headers: new AxiosHeaders(),
    }) as InternalAxiosRequestConfig;

  it('should attach authorization header when token exists', () => {
    mockedGetState.mockReturnValue({ accessToken: 'jwt|1234567890' });
    const result = attachTokenInterceptor(createConfig());

    expect(result.headers.Authorization).toBe('Bearer jwt|1234567890');
  });

  it('should not attach authorization header when token is null', () => {
    mockedGetState.mockReturnValue({ accessToken: null });
    const result = attachTokenInterceptor(createConfig());

    expect(result.headers.Authorization).toBeUndefined();
  });
});
