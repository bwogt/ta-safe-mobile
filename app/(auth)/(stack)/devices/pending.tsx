import DeviceCard from '@/components/ui/DeviceCard';
import { makeDevice } from '@/tests/factories/makeDevice';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

export default function DevicesPendingScreen() {
  const { t } = useTranslation('stack');

  return (
    <>
      <Stack.Screen options={{ title: t('titles.pendingDevices') }} />
      <ScrollView>
        <DeviceCard device={makeDevice()} />
      </ScrollView>
    </>
  );
}
