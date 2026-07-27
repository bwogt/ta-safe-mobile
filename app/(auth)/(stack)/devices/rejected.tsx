import DeviceCard from '@/components/ui/DeviceCard';
import Header from '@/components/ui/Header';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useDevicesByStatus } from '@/queries/device/useDevicesByStatus';
import { useTranslation } from 'react-i18next';

import { FlatList, View } from 'react-native';

export default function RejectedDevicesScreen() {
  const { t } = useTranslation('stack');

  const {
    data: pagination,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useDevicesByStatus('rejected');

  const devices = pagination?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View className="flex-1">
      <Header title={t('titles.rejectedDevices')} back />

      <FlatList
        data={devices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <DeviceCard device={item} />}
        onEndReached={() => {
          if (!isLoading && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{
          paddingBottom: 62,
        }}
      />
    </View>
  );
}
