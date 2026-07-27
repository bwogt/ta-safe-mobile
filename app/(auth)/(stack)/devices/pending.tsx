import DeviceStatusList from '@/components/ui/DeviceStatusList';
import Header from '@/components/ui/Header';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useDevicesByStatus } from '@/queries/device/useDevicesByStatus';
import { useTranslation } from 'react-i18next';

import { View } from 'react-native';

export default function PendingDevicesScreen() {
  const { t } = useTranslation('stack');

  const {
    data: pagination,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useDevicesByStatus('pending');

  const devices = pagination?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View className="flex-1">
      <Header title={t('titles.pendingDevices')} back />
      <DeviceStatusList status="pending" />
    </View>
  );
}
