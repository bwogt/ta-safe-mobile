import { AxiosError, AxiosResponse } from 'axios';

import { ApiFlashMessage } from '@/schemas/message/api-flash-message.schema';
import { ApiFormErrors } from '@/schemas/message/api-form-errors.schema';
import i18n from '@/services/i18n';
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

export function responseErrorInterceptor(error: AxiosError) {
  if (!error.response) {
    notify({ type: 'error', text: i18n.t('errors:axios.noConnection') });
    return Promise.reject(error);
  }

  const data = error.response.data as ApiFormErrors;
  handleMessage(data.message);

  return Promise.reject(error);
}
