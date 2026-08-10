import DeviceInfo from '@/components/ui/DeviceInfo';
import Header from '@/components/ui/Header';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useDeviceById } from '@/queries/device/useDeviceById';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function DeviceScreen() {
  const { t } = useTranslation('common');
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: device, isLoading, isError } = useDeviceById(id);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError || !device) {
    // TODO - ADD CUSTOM ERROR COMPONENT
    return <></>;
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
      <Header title={t('titles.deviceInfo')} back onBackPress={onBackPress} />
      <DeviceInfo device={device} />
    </>
  );
}
