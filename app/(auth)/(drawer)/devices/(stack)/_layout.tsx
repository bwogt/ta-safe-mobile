import { colors } from '@/themes/colors';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function StackLayout() {
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />

      <Stack
        screenOptions={{
          headerShown: false,
          headerTintColor: 'transparent',
        }}
      />
    </>
  );
}
