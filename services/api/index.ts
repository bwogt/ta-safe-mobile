import axios from 'axios';

import { authInterceptor } from './interceptors/auth.interceptor';

import {
  responseErrorInterceptor,
  responseInterceptor,
} from './interceptors/message.interceptor';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 8000,
});

api.interceptors.request.use(authInterceptor);
api.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default api;
