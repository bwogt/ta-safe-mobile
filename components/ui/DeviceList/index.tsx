import { DeviceValidationStatus } from '@/schemas/device/validation/device-validation-status.schema';
import { colors } from '@/themes/colors';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TabBar, TabView } from 'react-native-tab-view';
import DeviceStatusList from '../DeviceStatusList';

type DeviceListProps = {
  status?: DeviceValidationStatus;
};

type Route = {
  key: DeviceValidationStatus;
  title: string;
};

export default function DeviceTabView({ status }: DeviceListProps) {
  const { t } = useTranslation('common');

  const routes: Route[] = [
    { key: 'validated', title: t('common:states.validated', { count: 2 }) },
    { key: 'pending', title: t('common:states.pending', { count: 2 }) },
    { key: 'in_analysis', title: t('common:states.in_analysis', { count: 2 }) },
    { key: 'rejected', title: t('common:states.rejected', { count: 2 }) },
  ];

  const index = useMemo(() => {
    const index = routes.findIndex((route) => route.key === status);
    return index >= 0 ? index : 0;
  }, [status, routes]);

  const renderScene = ({ route }: { route: Route }) => (
    <DeviceStatusList status={route.key} />
  );

  return (
    <TabView
      lazy
      lazyPreloadDistance={1}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(newIndex) => {
        router.setParams({
          status: routes[newIndex].key,
        });
      }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          scrollEnabled
          style={{ backgroundColor: colors.primary }}
          indicatorStyle={{ backgroundColor: '#fff', height: 3 }}
        />
      )}
    />
  );
}
