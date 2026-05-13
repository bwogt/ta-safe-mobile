import { Message } from '@/schemas/message/message.schema';
import Toast from 'react-native-toast-message';

export function notify(message: Message) {
  Toast.show({
    type: message.type,
    text1: message.text,
    autoHide: false,
    onPress: () => Toast.hide(),
  });
}
