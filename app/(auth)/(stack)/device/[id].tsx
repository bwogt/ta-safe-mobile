import DeviceFeaturesCard from '@/components/device/DeviceFeaturesCard';
import DeviceInfo from '@/components/device/DeviceInfo';
import Header from '@/components/ui/Header';
import LoadingScreen from '@/components/ui/LoadingScreen';
import QueryError from '@/components/ui/QueryError';

import { useDeviceById } from '@/queries/device/useDeviceById';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DeviceScreen() {
  const { t } = useTranslation(['common', 'errors']);
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: device,
    isLoading,
    isError,
    isStale,
    isRefetching,
    refetch,
  } = useDeviceById(id);

  useFocusEffect(
    useCallback(() => {
      if (isStale) {
        refetch();
      }
    }, [isStale, refetch]),
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  const onBackPress = () => {
    router.replace({
      pathname: '/devices',
      params: {
        status: device?.validation_status,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1">
      <Header
        title={t('common:titles.deviceInfo')}
        back
        onBackPress={onBackPress}
      />

      {isError && (
        <QueryError
          title={t('errors:actions.loadingDevice')}
          description={t('errors:actions.defaultDescription')}
          onRetry={refetch}
        />
      )}

      {device && !isError && (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
        >
          <DeviceInfo device={device} />
          <DeviceFeaturesCard device={device} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
