import StatCard from '@/components/ui/StatCard';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function DashboardStats() {
  const { t } = useTranslation('dashboard');

  return (
    <View className="mt-lg px-4">
      <View className="flex-row flex-wrap justify-between">
        <StatCard
          label={t('stats.validated')}
          value="2"
          iconName="cellphone-check"
          className="bg-green-500"
        />

        <StatCard
          label={t('stats.pending')}
          value="1"
          iconName="cellphone-cog"
          className="bg-orange-500"
        />

        <StatCard
          label={t('stats.in_analysis')}
          value="0"
          iconName="cellphone-information"
          className="bg-blue-500"
        />

        <StatCard
          label={t('stats.rejected')}
          value="0"
          iconName="cellphone-remove"
          className="bg-red-500"
        />
      </View>
    </View>
  );
}
