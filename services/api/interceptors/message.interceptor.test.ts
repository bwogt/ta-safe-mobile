import { ApiFlashMessage } from '@/schemas/message/api-flash-message.schema';
import { notify } from '@/services/notify';
import { makeAxiosError } from '@/tests/factories/makeAxiosError';
import { makeAxiosResponse } from '@/tests/factories/makeAxiosResponse';
import { AxiosError } from 'axios';
import { unknown } from 'zod';
import {
  responseErrorInterceptor,
  responseInterceptor,
} from './message.interceptor';

jest.mock('@/services/notify', () => ({
  notify: jest.fn(),
}));

describe('messageInterceptor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call notify when response contains a message', () => {
    const message: ApiFlashMessage = {
      type: 'success',
      text: 'Success message',
    };
    const response = makeAxiosResponse({ message });

    responseInterceptor(response);
    expect(notify).toHaveBeenCalledWith(message);
  });

  it('should not call notify when response has no message', () => {
    const response = makeAxiosResponse(undefined);
    responseInterceptor(response);

    expect(notify).not.toHaveBeenCalled();
  });

  it('should return the original response', () => {
    const response = makeAxiosResponse(unknown);
    const result = responseInterceptor(response);

    expect(result).toBe(response);
  });

  it('should call notify when error response contains a message', async () => {
    const message: ApiFlashMessage = { type: 'error', text: 'Bad Request' };
    const error = makeAxiosError({ message: message });

    await expect(responseErrorInterceptor(error)).rejects.toEqual(error);
    expect(notify).toHaveBeenCalledWith(message);
  });

  it('should reject with the original error', async () => {
    const error = new AxiosError('Internal error');

    await expect(responseErrorInterceptor(error)).rejects.toThrow(
      'Internal error',
    );
  });
});
