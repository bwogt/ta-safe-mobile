import DashboardStats from '@/components/ui/DashboardStats';
import Header from '@/components/ui/Header';
import { useDashboardStats } from '@/queries/dashboard/useDashboardStats';
import { useCurrentUser } from '@/queries/user/useCurrentUser';
import { queryClient } from '@/services/queryClient';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

export default function DashboardScreen() {
  const { data: user } = useCurrentUser();
  const { isStale, isRefetching, refetch } = useDashboardStats();

  const onRefresh = async () => {
    await refetch();

    await queryClient.resetQueries({
      queryKey: ['devices'],
    });
  };

  useFocusEffect(
    useCallback(() => {
      if (isStale) {
        onRefresh();
      }
    }, [isStale, onRefresh]),
  );

  return (
    <View className="flex-1">
      <Header title={`Olá, ${user?.name}`} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
      >
        <DashboardStats />
      </ScrollView>
    </View>
  );
}
