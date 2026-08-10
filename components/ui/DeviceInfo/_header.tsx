import { Device } from '@/schemas/device/base/device.schema';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import StatusIndicator from '../StatusIndicator';

type DeviceInfoHeaderProps = {
  device: Device;
};

export default function DeviceInfoHeader({ device }: DeviceInfoHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-4 pt-4">
      <View>
        <Text className="text-xl  font-bold">{device.model.name}</Text>
        <StatusIndicator status={device.validation_status} />
      </View>

      <View className="flex-row items-center gap-4">
        <TouchableOpacity>
          <MaterialCommunityIcons name="information-outline" size={26} />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialCommunityIcons name="share-variant-outline" size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
