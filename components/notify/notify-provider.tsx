import Toast from 'react-native-toast-message';
import { toastConfig } from './notify.config';

export function NotifyProvider() {
  return <Toast config={toastConfig} />;
}
