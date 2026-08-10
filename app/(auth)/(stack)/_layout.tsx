import { colors } from '@/themes/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function Layout() {
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />

      <Stack
        screenOptions={{
          headerShown: false,
          headerTintColor: 'transparent',
          headerLeft: () => {
            return (
              <MaterialCommunityIcons
                name="arrow-left"
                size={26}
                color="white"
                onPress={() =>
                  router.replace('/(auth)/(drawer)/devices?status=active')
                }
              />
            );
          },
        }}
      >
        <Stack.Screen name="device/[id]" />
      </Stack>
    </>
  );
}
