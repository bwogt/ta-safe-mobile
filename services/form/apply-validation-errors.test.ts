import { ValidationErrorResponse } from '@/schemas/message/validation-error.schema';
import { makeAxiosError } from '@/tests/factories/makeAxiosError';
import { applyValidationErrors } from './apply-validation-errors';

describe('applyValidationErrors', () => {
  it('should apply validation errors to form fields', () => {
    const setError = jest.fn();
    const emailError = 'E-mail is required';
    const passwordError = 'Password is required';

    const error = makeAxiosError<ValidationErrorResponse>({
      message: { type: 'error', text: 'Bad Request' },
      errors: {
        email: [emailError],
        password: [passwordError],
      },
    });

    applyValidationErrors(error, setError);

    expect(setError).toHaveBeenCalledWith('email', {
      message: emailError,
    });

    expect(setError).toHaveBeenCalledWith('password', {
      message: passwordError,
    });
  });

  it('should not set errors when response has no validation errors', () => {
    const setError = jest.fn();

    const error = makeAxiosError<ValidationErrorResponse>({
      message: { type: 'error', text: 'Bad Request' },
    });

    applyValidationErrors(error, setError);
    expect(setError).not.toHaveBeenCalled();
  });
});
