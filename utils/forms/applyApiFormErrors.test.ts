import { ApiFormErrors } from '@/schemas/message/api-form-errors.schema';
import { makeAxiosError } from '@/tests/factories/makeAxiosError';
import { applyApiFormErrors } from './applyApiFormErrors';

describe('applyApiFormErrors', () => {
  it('should apply validation errors to form fields', () => {
    const setError = jest.fn();
    const emailError = 'E-mail is required';
    const passwordError = 'Password is required';

    const error = makeAxiosError<ApiFormErrors>({
      message: { type: 'error', text: 'Bad Request' },
      errors: {
        email: [emailError],
        password: [passwordError],
      },
    });

    applyApiFormErrors(error, setError);

    expect(setError).toHaveBeenCalledWith('email', {
      message: emailError,
    });

    expect(setError).toHaveBeenCalledWith('password', {
      message: passwordError,
    });
  });

  it('should not set errors when response has no validation errors', () => {
    const setError = jest.fn();

    const error = makeAxiosError<ApiFormErrors>({
      message: { type: 'error', text: 'Bad Request' },
    });

    applyApiFormErrors(error, setError);
    expect(setError).not.toHaveBeenCalled();
  });
});
