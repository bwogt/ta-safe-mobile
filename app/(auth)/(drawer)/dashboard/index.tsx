import DashboardStats from '@/components/dashboard/DashboardStats';
import DeviceLookup from '@/components/device/DeviceLookup';
import Header from '@/components/ui/Header';

import { useDashboardStats } from '@/queries/dashboard/useDashboardStats';
import { useCurrentUser } from '@/queries/user/useCurrentUser';
import { queryClient } from '@/services/queryClient';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen() {
  const { data: user } = useCurrentUser();
  const { isStale, isRefetching, refetch } = useDashboardStats();
  const { t } = useTranslation('drawer');

  const onRefresh = useCallback(async () => {
    await refetch();
    await queryClient.resetQueries({ queryKey: ['devices'] });
  }, [refetch]);

  useFocusEffect(
    useCallback(() => {
      if (isStale) onRefresh();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStale, refetch]),
  );

  return (
    <SafeAreaView className="flex-1">
      <Header title={t('dashboard.title', { name: user?.name })} />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
      >
        <DashboardStats />
        <DeviceLookup />
      </ScrollView>
    </SafeAreaView>
  );
}
