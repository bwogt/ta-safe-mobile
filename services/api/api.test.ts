import { useAuthStore } from '@/stores/auth/useAuthStore';
import api from './api';

jest.mock('@/stores/auth/useAuthStore', () => ({
  useAuthStore: {
    getState: jest.fn(),
  },
}));

const mockedGetState = useAuthStore.getState as jest.Mock;

const getRequestInterceptor = () => {
  const handlers = (api.interceptors.request as { handlers: any[] }).handlers;
  return handlers[0];
};

describe('API authentication interceptor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should attach Authorization header when token exists', () => {
    mockedGetState.mockReturnValue({ accessToken: 'jwt|1234567890' });

    const { fulfilled } = getRequestInterceptor();
    const config = { headers: {} };
    const result = fulfilled(config);

    expect(result.headers.Authorization).toBe('Bearer jwt|1234567890');
  });

  it('should not attach Authorization header when token is null', () => {
    mockedGetState.mockReturnValue({ accessToken: null });

    const { fulfilled } = getRequestInterceptor();
    const config = { headers: {} };
    const result = fulfilled(config);

    expect(result.headers.Authorization).toBeUndefined();
  });

  it('should reject request promise when request fails', async () => {
    const { rejected } = getRequestInterceptor();
    const error = new Error('Internal network error');

    await expect(rejected(error)).rejects.toThrow('Internal network error');
  });
});
