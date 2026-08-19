import { Device } from '@/schemas/device/base/device.schema';
import { Text, View } from 'react-native';
import StatusIndicator from '../StatusIndicator';
import ShareDeviceInfo from './_share';

type DeviceInfoHeaderProps = {
  device: Device;
};

export default function DeviceInfoHeader({ device }: DeviceInfoHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-4 pt-4">
      <View>
        <Text className="text-xl font-bold">{device.model.name}</Text>
        <StatusIndicator status={device.validation_status} />
      </View>
      <ShareDeviceInfo device={device} />
    </View>
  );
}
