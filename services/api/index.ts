import axios from 'axios';
import { attachTokenInterceptor } from './interceptors/attach-token.interceptor';
import { authStatusInterceptor } from './interceptors/auth-status.interceptor';
import {
  flashErrorInterceptor,
  flashSuccessInterceptor,
} from './interceptors/flash-message.interceptor';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 8000,
});

api.interceptors.request.use(attachTokenInterceptor);
api.interceptors.response.use(undefined, authStatusInterceptor);
api.interceptors.response.use(flashSuccessInterceptor, flashErrorInterceptor);

export default api;
