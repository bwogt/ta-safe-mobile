import DashboardStats from '@/components/ui/DashboardStats';
import { useDashboardStats } from '@/queries/dashboard/useDashboardStats';
import { queryClient } from '@/services/queryClient';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

export default function DashboardScreen() {
  const { isStale, isRefetching, refetch } = useDashboardStats();

  useFocusEffect(
    useCallback(() => {
      if (isStale) {
        onRefresh();
      }
    }, [isStale]),
  );

  const onRefresh = async () => {
    await refetch();

    queryClient.invalidateQueries({
      queryKey: ['devices'],
    });
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
      }
    >
      <DashboardStats />
    </ScrollView>
  );
}
