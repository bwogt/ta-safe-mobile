import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type Props = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  label: string;
  onPress: () => void;
};

export default function QuickAccessOption({ icon, label, onPress }: Props) {
  return (
    <View className="items-center gap-2 py-4">
      <Pressable
        onPress={onPress}
        className="h-14 w-14 items-center justify-center rounded-full border border-zinc-300 bg-gray-200"
      >
        <MaterialCommunityIcons name={icon} size={22} />
      </Pressable>

      <Text className="w-28 text-center">{label}</Text>
    </View>
  );
}
