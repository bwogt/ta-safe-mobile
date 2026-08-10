import { DeviceSummary } from '@/schemas/device/pagination/device-summary.schema';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import StatusIndicator from '../StatusIndicator';

type DeviceCardHeaderProps = {
  device: DeviceSummary;
};

export default function DeviceCardHeader({ device }: DeviceCardHeaderProps) {
  const onPress = () => {
    router.push(`/(auth)/(stack)/device/${device.id}`);
  };

  return (
    <View className="flex-row items-center justify-between">
      <View>
        <Text className="py-xs text-lg font-semibold">{device.model.name}</Text>
        <StatusIndicator status={device.validation_status} />
      </View>
      <TouchableOpacity className="p-xs" onPress={onPress}>
        <MaterialCommunityIcons name="arrow-expand" size={22} />
      </TouchableOpacity>
    </View>
  );
}
