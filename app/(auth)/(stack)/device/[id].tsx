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

  if (isError || !device) {
    return (
      <QueryError
        message={t('errors:actions.loadingDevice')}
        onRetry={refetch}
      />
    );
  }

  const onBackPress = () => {
    router.replace({
      pathname: '/devices',
      params: {
        status: device.validation_status,
      },
    });
  };

  return (
    <>
      <Header
        title={t('common:titles.deviceInfo')}
        back
        onBackPress={onBackPress}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        <DeviceInfo device={device} />
        <DeviceFeaturesCard device={device} />
      </ScrollView>
    </>
  );
}
