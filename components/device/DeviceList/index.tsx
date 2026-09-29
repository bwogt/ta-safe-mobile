import { DeviceValidationStatus } from '@/schemas/device';
import { colors } from '@/themes/colors';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { TabBar, TabView } from 'react-native-tab-view';
import DeviceStatusList from '../DeviceStatusList';

type Props = {
  status?: DeviceValidationStatus;
};

type Route = {
  key: DeviceValidationStatus;
  title: string;
};

export default function DeviceList({ status }: Props) {
  const { t } = useTranslation('device');

  const routes: Route[] = [
    { key: 'validated', title: t('device:states.validated', { count: 2 }) },
    { key: 'pending', title: t('device:states.pending', { count: 2 }) },
    { key: 'in_analysis', title: t('device:states.in_analysis', { count: 2 }) },
    { key: 'rejected', title: t('device:states.rejected', { count: 2 }) },
  ];

  const found = routes.findIndex((route) => route.key === status);
  const index = found >= 0 ? found : 0;

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
