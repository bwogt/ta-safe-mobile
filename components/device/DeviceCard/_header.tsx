import { DeviceSummary } from '@/schemas/device/pagination/device-summary.schema';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import StatusIndicator from '../StatusIndicator';

type Props = {
  device: DeviceSummary;
};

export default function DeviceCardHeader({ device }: Props) {
  const onPress = () => {
    router.push(`/(auth)/(stack)/device/${device.id}`);
  };

  return (
    <View className="flex-row items-center justify-between px-4 pt-4">
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
