import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

type HeaderProps = {
  title: string;
  back?: boolean;
};

export default function Header({ title, back }: HeaderProps) {
  const navigation = useNavigation();

  function handlePress() {
    if (back) {
      router.back();
      return;
    }

    navigation.dispatch(DrawerActions.toggleDrawer());
  }

  return (
    <View className="h-20 justify-end bg-primary">
      <TouchableOpacity
        className="absolute bottom-4 left-4 z-10"
        onPress={handlePress}
      >
        <MaterialCommunityIcons
          name={back ? 'arrow-left' : 'menu'}
          size={28}
          color="white"
        />
      </TouchableOpacity>
      <View className="w-full items-center">
        <Text className="mb-4 text-2xl font-semibold text-white">{title}</Text>
      </View>
    </View>
  );
}
