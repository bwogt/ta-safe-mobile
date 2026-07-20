import DeviceCard from '@/components/ui/DeviceCard';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useDevicesByStatus } from '@/queries/device/useDevicesByStatus';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';

export default function DevicesPendingScreen() {
  const { t } = useTranslation('stack');
  const { data: pagination, isLoading } = useDevicesByStatus('pending');

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Stack.Screen options={{ title: t('titles.pendingDevices') }} />
      <FlatList
        data={pagination?.data}
        renderItem={({ item }) => <DeviceCard device={item} />}
      />
    </>
  );
}
