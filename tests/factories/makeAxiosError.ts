import { AxiosError, AxiosResponse } from 'axios';

export function makeAxiosError<T>(data: T) {
  return {
    response: {
      data,
    } as AxiosResponse<T>,
  } as AxiosError<T>;
}
