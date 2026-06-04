import { ApiFlashMessage } from '@/schemas/message/api-flash-message.schema';
import Toast from 'react-native-toast-message';

export function notify(message: ApiFlashMessage) {
  Toast.show({
    type: message.type,
    text1: message.text,
    autoHide: false,
    onPress: () => Toast.hide(),
  });
}
