import DeviceFeaturesCard from '@/components/device/DeviceFeaturesCard';
import DevicePublicInfo from '@/components/device/DevicePublicInfo';
import Header from '@/components/ui/Header';
import LoadingScreen from '@/components/ui/LoadingScreen';
import QueryError from '@/components/ui/QueryError';
import useDeviceByShareCode from '@/queries/device/useDeviceByShareCode';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView } from 'react-native';

export default function DeviceLookupScreen() {
  const { t } = useTranslation(['common', 'errors']);
  const { code } = useLocalSearchParams<{ code: string }>();

  const {
    data: device,
    isLoading,
    isError,
    isStale,
    isRefetching,
    refetch,
  } = useDeviceByShareCode(code);

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

  return (
    <>
      <Header
        title={t('common:titles.deviceInfo')}
        back
        onBackPress={() => router.replace('/dashboard')}
      />

      {isError && (
        <QueryError
          title={t('errors:actions.loadingDevice')}
          description={t('errors:actions.deviceLookup')}
          onRetry={refetch}
        />
      )}

      {device && !isError && (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
        >
          <DevicePublicInfo device={device} />
          <DeviceFeaturesCard device={device} />
        </ScrollView>
      )}
    </>
  );
}
