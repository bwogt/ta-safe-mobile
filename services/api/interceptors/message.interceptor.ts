import { AxiosError, AxiosResponse } from 'axios';

import { Message } from '@/schemas/message/message.schema';
import { notify } from '@/services/notify/notify';

function handleMessage(message?: Message) {
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
