import DeviceStatusList from '@/components/ui/DeviceStatusList';
import Header from '@/components/ui/Header';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function PendingDevicesScreen() {
  const { t } = useTranslation('stack');

  return (
    <View className="flex-1">
      <Header title={t('titles.pendingDevices')} back />
      <DeviceStatusList status="pending" />
    </View>
  );
}
