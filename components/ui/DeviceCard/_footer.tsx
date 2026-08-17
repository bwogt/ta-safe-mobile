import { formatDatetime } from '@/utils/date/formatDatetime';
import { Text, View } from 'react-native';

type DeviceCardFooterProps = {
  updatedAt: string;
};

export default function DeviceCardFooter({ updatedAt }: DeviceCardFooterProps) {
  return (
    <View className="flex-row justify-end p-4">
      <View className="flex-row justify-end">
        <Text>{formatDatetime(updatedAt)}</Text>
      </View>
    </View>
  );
}
