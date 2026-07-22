import StatCard from '@/components/ui/StatCard';
import { useDashboardStats } from '@/queries/dashboard/useDashboardStats';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function DashboardStats() {
  const { t } = useTranslation('dashboard');
  const { data: stats } = useDashboardStats();

  return (
    <View className="mt-lg px-4">
      <View className="flex-row flex-wrap justify-between">
        <StatCard
          label={t('stats.validated')}
          value={stats?.validated}
          iconName="cellphone-check"
          href="/(auth)/(stack)/devices/validated"
          variant="success"
        />

        <StatCard
          label={t('stats.pending')}
          value={stats?.pending}
          iconName="cellphone-information"
          href="/(auth)/(stack)/devices/pending"
          variant="warning"
        />

        <StatCard
          label={t('stats.in_analysis')}
          value={stats?.in_analysis}
          iconName="cellphone-text"
          href="/(auth)/(stack)/devices/in_analysis"
          variant="info"
        />

        <StatCard
          label={t('stats.rejected')}
          value={stats?.rejected}
          iconName="cellphone-remove"
          variant="danger"
        />
      </View>
    </View>
  );
}
