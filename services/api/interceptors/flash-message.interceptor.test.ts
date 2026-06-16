import { ApiFlashMessage } from '@/schemas/message/api-flash-message.schema';
import { ApiFormErrors } from '@/schemas/message/api-form-errors.schema';
import { notify } from '@/services/notify';
import { makeAxiosError } from '@/tests/factories/makeAxiosError';
import { AxiosError, AxiosResponse } from 'axios';
import {
  flashErrorInterceptor,
  flashSuccessInterceptor,
} from './flash-message.interceptor';

jest.mock('@/services/notify', () => ({
  notify: jest.fn(),
}));

jest.mock('i18next', () => ({
  t: jest.fn((key) => key),
}));

describe('flash-message.interceptor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('flashSuccessInterceptor', () => {
    it('should notify when the response contains a success message', () => {
      const message: ApiFlashMessage = {
        type: 'success',
        text: 'Created device transfer.',
      };

      const mockResponse = {
        data: { message },
      } as AxiosResponse;

      flashSuccessInterceptor(mockResponse);

      expect(notify).toHaveBeenCalledTimes(1);
      expect(notify).toHaveBeenCalledWith(message);
    });

    it('should not notify when the response does not contain a message', () => {
      const mockResponse = {
        data: {},
      } as AxiosResponse;

      flashSuccessInterceptor(mockResponse);
      expect(notify).not.toHaveBeenCalled();
    });
  });

  describe('flashErrorInterceptor', () => {
    it('should notify when the response contains an API message', async () => {
      const message: ApiFlashMessage = {
        type: 'error',
        text: 'An error occurred while creating the user.',
      };

      const mockError = makeAxiosError({ message });

      await expect(flashErrorInterceptor(mockError)).rejects.toBe(mockError);

      expect(notify).toHaveBeenCalledTimes(1);
      expect(notify).toHaveBeenCalledWith(message);
    });

    it('should notify when the response contains form validation errors', async () => {
      const message: ApiFormErrors = {
        message: {
          type: 'error',
          text: 'Some errors were found. Please check them:',
        },
        errors: { email: ['E-mail is required'] },
      };

      const mockError = makeAxiosError(message);

      await expect(flashErrorInterceptor(mockError)).rejects.toBe(mockError);

      expect(notify).toHaveBeenCalledTimes(1);
      expect(notify).toHaveBeenCalledWith(message.message, { autoHide: true });
    });

    it('should notify when a network error occurs', async () => {
      const mockError = new AxiosError('Network Error', 'ERR_NETWORK');
      const message = { type: 'error', text: 'errors:axios.noConnection' };

      await expect(flashErrorInterceptor(mockError)).rejects.toBe(mockError);

      expect(notify).toHaveBeenCalledTimes(1);
      expect(notify).toHaveBeenCalledWith(message);
    });

    it('should notify when an unexpected error occurs', async () => {
      const mockError = {} as AxiosError;
      const message = { type: 'error', text: 'errors:axios.requestFailed' };

      await expect(flashErrorInterceptor(mockError)).rejects.toBe(mockError);

      expect(notify).toHaveBeenCalledTimes(1);
      expect(notify).toHaveBeenCalledWith(message);
    });
  });
});
