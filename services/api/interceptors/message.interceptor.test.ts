import { Message } from '@/schemas/message/message.schema';
import { notify } from '@/services/notify/notify';
import { AxiosError, AxiosResponse } from 'axios';
import {
  responseErrorInterceptor,
  responseInterceptor,
} from './message.interceptor';

jest.mock('@/services/notify/notify', () => ({
  notify: jest.fn(),
}));

describe('messageInterceptor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createMockResponse = (message?: Message) =>
    ({
      data: { message },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
    }) as AxiosResponse;

  it('should call notify when response contains a message', () => {
    const mockedMessage: Message = { type: 'success', text: 'Success message' };
    const response = createMockResponse(mockedMessage);

    responseInterceptor(response);
    expect(notify).toHaveBeenCalledWith(mockedMessage);
  });

  it('should not call notify when response has no message', () => {
    const response = createMockResponse(undefined);
    responseInterceptor(response);

    expect(notify).not.toHaveBeenCalled();
  });

  it('should return the original response', () => {
    const response = createMockResponse();
    const result = responseInterceptor(response);

    expect(result).toBe(response);
  });

  it('should call notify when error response contains a message', async () => {
    const mockedMessage: Message = { type: 'error', text: 'Bad Request' };

    const error = {
      response: { data: { message: mockedMessage } },
    } as AxiosError;

    await expect(responseErrorInterceptor(error)).rejects.toEqual(error);
    expect(notify).toHaveBeenCalledWith(mockedMessage);
  });

  it('should reject with the original error', async () => {
    const error = new AxiosError('Internal error');

    await expect(responseErrorInterceptor(error)).rejects.toThrow(
      'Internal error',
    );
  });
});
