import { ValidationErrorResponse } from '@/schemas/message/validation-error.schema';
import { AxiosError } from 'axios';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';

export function applyValidationErrors<T extends FieldValues>(
  error: AxiosError<ValidationErrorResponse>,
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
