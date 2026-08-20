import DeviceList from '@/components/device/DeviceList';
import Header from '@/components/ui/Header';
import { DeviceValidationStatus } from '@/schemas/device/validation/device-validation-status.schema';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function DevicesListScreen() {
  const { t } = useTranslation('drawer');

  const { status = 'validated' } = useLocalSearchParams<{
    status?: DeviceValidationStatus;
  }>();

  return (
    <View className="flex-1">
      <Header title={t('drawer:devices.title')} />
      <DeviceList status={status} />
    </View>
  );
}
