import { ApiFormErrors } from '@/schemas/message/api-form-errors.schema';
import { AxiosError } from 'axios';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';

export function applyApiFormErrors<T extends FieldValues>(
  error: AxiosError<ApiFormErrors>,
  setError: UseFormSetError<T>,
) {
  const errors = error.response?.data?.errors;

  if (errors) {
    for (const [fieldName, messages] of Object.entries(errors)) {
      setError(fieldName as Path<T>, {
        message: messages[0],
      });
    }
  }
}
