import { colors } from '@/themes/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

type Props = {
  message: string;
};

export default function EmptyList({ message }: Props) {
  return (
    <View className="items-center">
      <MaterialCommunityIcons
        name="playlist-remove"
        color={colors.neutral}
        size={44}
      />
      <Text className="text-lg text-neutral">{message}</Text>
    </View>
  );
}
