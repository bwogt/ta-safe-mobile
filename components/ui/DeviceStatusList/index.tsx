import DeviceCard from '@/components/ui/DeviceCard';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useDevicesByStatus } from '@/queries/device/useDevicesByStatus';
import { FlatList, View } from 'react-native';

type Props = {
  status: 'pending' | 'validated' | 'in_analysis' | 'rejected';
};

export default function DeviceStatusList({ status }: Props) {
  const {
    data: pagination,
    isLoading,
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
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
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
