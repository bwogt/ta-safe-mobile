import DeviceList from '@/components/device/DeviceList';
import Header from '@/components/ui/Header';
import { DeviceValidationStatus } from '@/schemas/device';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DevicesListScreen() {
  const { t } = useTranslation('drawer');

  const { status = 'validated' } = useLocalSearchParams<{
    status?: DeviceValidationStatus;
  }>();

  return (
    <SafeAreaView className="flex-1">
      <Header title={t('drawer:devices.title')} />
      <DeviceList status={status} />
    </SafeAreaView>
  );
}
