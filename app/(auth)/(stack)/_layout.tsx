import { colors } from '@/themes/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useNavigation } from 'expo-router';
import { StatusBar } from 'react-native';

export default function Layout() {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <Stack
        screenOptions={{
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerLeft: () => (
            <MaterialCommunityIcons
              name="arrow-left"
              color="white"
              size={26}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
    </>
  );
}
