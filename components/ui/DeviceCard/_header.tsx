import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

type DeviceCardHeaderProps = {
  title: string;
};

export default function DeviceCardHeader({ title }: DeviceCardHeaderProps) {
  return (
    <View className="flex-row justify-between">
      <Text className="py-xs text-lg font-semibold">{title}</Text>
      <View className="p-xs">
        <MaterialCommunityIcons name="arrow-expand" color="black" size={22} />
      </View>
    </View>
  );
}
