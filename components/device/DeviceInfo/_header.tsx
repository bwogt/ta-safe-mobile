import { Device } from '@/schemas/device/base/device.schema';
import { Text, View } from 'react-native';
import ShareDeviceCode from '../ShareDeviceCode';
import StatusIndicator from '../StatusIndicator';

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
      {device.validation_status === 'validated' && (
        <ShareDeviceCode device={device} />
      )}
    </View>
  );
}
