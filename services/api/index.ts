import axios from 'axios';

import {
  authErrorInterceptor,
  authInterceptor,
} from './interceptors/auth.interceptor';

import {
  responseErrorInterceptor,
  responseInterceptor,
} from './interceptors/message.interceptor';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(authInterceptor, authErrorInterceptor);
api.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default api;
