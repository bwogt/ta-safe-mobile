import DeviceCard from '@/components/ui/DeviceCard';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useDevicesByStatus } from '@/queries/device/useDevicesByStatus';
import { FlatList } from 'react-native';

export default function ValidatedDevicesScreen() {
  const {
    data: pagination,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useDevicesByStatus('validated');

  const devices = pagination?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
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
  );
}
