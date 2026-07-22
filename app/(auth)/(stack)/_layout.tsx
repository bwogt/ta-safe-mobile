import { colors } from '@/themes/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'react-native';

export default function Layout() {
  const navigation = useNavigation();
  const { t } = useTranslation('stack');

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
      >
        <Stack.Screen
          name="devices/pending"
          options={{
            title: t('titles.pendingDevices'),
          }}
        />
        <Stack.Screen
          name="devices/validated"
          options={{
            title: t('titles.validatedDevices'),
          }}
        />
        <Stack.Screen
          name="devices/in_analysis"
          options={{
            title: t('titles.inAnalysisDevices'),
          }}
        />
      </Stack>
    </>
  );
}
