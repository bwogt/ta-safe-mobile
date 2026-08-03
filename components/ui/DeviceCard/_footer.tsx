import { formatDatetime } from '@/utils/date/formatDatetime';
import { Text, View } from 'react-native';

type DeviceCardFooterProps = {
  updatedAt: string;
};

export default function DeviceCardFooter({ updatedAt }: DeviceCardFooterProps) {
  return (
    <View className="mt-xl flex-row justify-end">
      <View className="flex-row justify-end">
        <Text>{formatDatetime(updatedAt)}</Text>
      </View>
    </View>
  );
}
