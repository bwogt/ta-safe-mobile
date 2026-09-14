import { DevicePublic } from '@/schemas/device';
import { Text, View } from 'react-native';
import StatusIndicator from '../StatusIndicator';

type Props = {
  device: DevicePublic;
};

export default function DevicePublicInfoHeader({ device }: Props) {
  return (
    <View className="flex-row items-center justify-between px-4 pt-4">
      <View>
        <Text className="text-xl font-bold">{device.model.name}</Text>
        <StatusIndicator status={device.validation_status} />
      </View>
    </View>
  );
}
