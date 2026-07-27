import DashboardStats from '@/components/ui/DashboardStats';
import Header from '@/components/ui/Header';
import { useDashboardStats } from '@/queries/dashboard/useDashboardStats';
import { useCurrentUser } from '@/queries/user/useCurrentUser';
import { queryClient } from '@/services/queryClient';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

export default function DashboardScreen() {
  const { data: user } = useCurrentUser();
  const { isStale, isRefetching, refetch } = useDashboardStats();

  useFocusEffect(
    useCallback(() => {
      if (isStale) {
        onRefresh();
      }
    }, [isStale]),
  );

  const onRefresh = async () => {
    await Promise.all([
      refetch(),

      queryClient.resetQueries({
        queryKey: ['devices'],
      }),
    ]);
  };

  return (
    <>
      <Header title={`Olá, ${user?.name}`} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
      >
        <DashboardStats />
      </ScrollView>
    </>
  );
}
