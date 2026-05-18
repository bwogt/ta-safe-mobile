import { AxiosError, AxiosResponse } from 'axios';

import { ApiFlashMessage } from '@/schemas/message/api-flash-message.schema';
import { notify } from '@/services/notify';

function handleMessage(message?: ApiFlashMessage) {
  if (message) {
    notify(message);
  }
}

export function responseInterceptor(response: AxiosResponse) {
  handleMessage(response.data?.message);
  return response;
}

export function responseErrorInterceptor(error: AxiosError<any>) {
  handleMessage(error.response?.data?.message);
  return Promise.reject(error);
}
