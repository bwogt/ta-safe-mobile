import DeviceCard from '@/components/ui/DeviceCard';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useDevicesByStatus } from '@/queries/device/useDevicesByStatus';
import { DeviceValidationStatus } from '@/schemas/device/validation/device-validation-status.schema';
import { FlatList, View } from 'react-native';
import EmptyDeviceList from './_empty';
import DeviceStatusListFooter from './_footer';

type DeviceStatusListProps = {
  status: DeviceValidationStatus;
};

export default function DeviceStatusList({ status }: DeviceStatusListProps) {
  const {
    data: pagination,
    isLoading,
    isRefetching,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useDevicesByStatus(status);

  const devices = pagination?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View className="flex-1">
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <DeviceCard device={item} />}
        ListEmptyComponent={<EmptyDeviceList status={status} />}
        onRefresh={refetch}
        refreshing={isRefetching}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{ paddingBottom: 62 }}
        contentContainerClassName={
          devices.length === 0 ? 'grow justify-center items-center' : undefined
        }
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        ListFooterComponent={
          devices.length > 0 ? <DeviceStatusListFooter /> : null
        }
      />
    </View>
  );
}
