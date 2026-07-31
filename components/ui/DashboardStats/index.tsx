import StatCard from '@/components/ui/StatCard';
import { useDashboardStats } from '@/queries/dashboard/useDashboardStats';
import { DeviceValidationStatus } from '@/schemas/device/validation/device-validation-status.schema';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function DashboardStats() {
  const { t } = useTranslation('dashboard');
  const { data: stats } = useDashboardStats();

  const openDevicesList = (status: DeviceValidationStatus) => {
    router.push({
      pathname: '/(auth)/(drawer)/devices',
      params: {
        status: status,
      },
    });
  };

  return (
    <View className="mt-lg px-4">
      <View className="flex-row flex-wrap justify-between">
        <StatCard
          label={t('stats.validated')}
          value={stats?.validated}
          iconName="cellphone-check"
          variant="success"
          onPress={() => openDevicesList('validated')}
        />

        <StatCard
          label={t('stats.pending')}
          value={stats?.pending}
          iconName="cellphone-information"
          variant="warning"
          onPress={() => openDevicesList('pending')}
        />

        <StatCard
          label={t('stats.in_analysis')}
          value={stats?.in_analysis}
          iconName="cellphone-text"
          variant="info"
          onPress={() => openDevicesList('in_analysis')}
        />

        <StatCard
          label={t('stats.rejected')}
          value={stats?.rejected}
          iconName="cellphone-remove"
          variant="danger"
          onPress={() => openDevicesList('rejected')}
        />
      </View>
    </View>
  );
}
