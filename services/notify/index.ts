import { ApiFlashMessage } from '@/schemas/message/api-flash-message.schema';
import Toast from 'react-native-toast-message';

interface NotifyOptions {
  autoHide?: boolean;
  visibilityTime?: number;
}

export function notify(message: ApiFlashMessage, options: NotifyOptions = {}) {
  Toast.show({
    type: message.type,
    text1: message.text,
    autoHide: options?.autoHide ?? false,
    visibilityTime: options?.visibilityTime ?? 4000,
    onPress: () => Toast.hide(),
  });
}
