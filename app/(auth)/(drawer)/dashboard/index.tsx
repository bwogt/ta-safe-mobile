import DashboardStats from '@/components/ui/DashboardStats';
import { useDashboardStats } from '@/queries/dashboard/useDashboardStats';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

export default function DashboardScreen() {
  const { isStale, isRefetching, refetch } = useDashboardStats();

  useFocusEffect(
    useCallback(() => {
      if (isStale) {
        refetch();
      }
    }, [isStale, refetch]),
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
    >
      <DashboardStats />
    </ScrollView>
  );
}
