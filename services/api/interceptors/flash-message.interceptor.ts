import { apiFormErrorsSchema, apiMessageResponseSchema } from '@/schemas/message';
import { notify } from '@/services/notify';
import { AxiosError, AxiosResponse } from 'axios';
import { t } from 'i18next';

export function flashSuccessInterceptor(response: AxiosResponse) {
  const message = response.data?.message;

  if (message) {
    notify(message);
  }

  return response;
}

export function flashErrorInterceptor(error: AxiosError) {
  const data = error.response?.data;
  const formError = apiFormErrorsSchema.safeParse(data);
  const apiMessage = apiMessageResponseSchema.safeParse(data);

  if (formError.success) {
    notify(formError.data.message, { autoHide: true });
  } else if (apiMessage.success) {
    notify(apiMessage.data.message);
  } else if (error.code === 'ERR_NETWORK') {
    notify({ type: 'error', text: t('errors:axios.noConnection') });
  } else {
    notify({ type: 'error', text: t('errors:axios.requestFailed') });
  }

  return Promise.reject(error);
}
