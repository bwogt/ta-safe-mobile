import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function QueryErrorHeader() {
  return (
    <View className="rounded-full bg-primary">
      <View className="p-8">
        <MaterialCommunityIcons name="close" size={72} color="white" />
      </View>
    </View>
  );
}
