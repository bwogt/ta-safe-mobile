import EmptyList from '@/components/ui/EmptyList';
import ListFooter from '@/components/ui/ListFooter';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useTransfersByStatus } from '@/queries/transfer/useTransfersByStatus';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import TransferItem from '../TransferItem';

export default function TransferList() {
  const { t } = useTranslation(['common', 'transfer']);

  const {
    data: pagination,
    isLoading,
    isRefetching,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
  } = useTransfersByStatus();

  const transfers = pagination?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) return <LoadingScreen />;

  return (
    <FlatList
      data={transfers}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TransferItem transfer={item} />}
      ListEmptyComponent={<EmptyList message={t('transfer:list.empty')} />}
      onRefresh={refetch}
      refreshing={isRefetching}
      onEndReachedThreshold={0.1}
      contentContainerClassName={
        transfers.length === 0 ? 'grow justify-center items-center' : undefined
      }
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      ListFooterComponent={
        transfers.length > 0 ? (
          <ListFooter message={t('common:list.footer')} />
        ) : null
      }
    />
  );
}
