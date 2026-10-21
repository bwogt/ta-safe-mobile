import ListFooter from '@/components/ui/ListFooter';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useDevicesByStatus } from '@/queries/device/useDevicesByStatus';
import { DeviceValidationStatus } from '@/schemas/device';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import DeviceCard from '../DeviceCard';
import EmptyDeviceList from './_empty';

type Props = {
  status: DeviceValidationStatus;
};

export default function DeviceStatusList({ status }: Props) {
  const { t } = useTranslation('common');

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
          devices.length > 0 ? (
            <ListFooter message={t('common:list.footer')} />
          ) : null
        }
      />
    </View>
  );
}
