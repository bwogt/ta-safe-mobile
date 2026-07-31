import DeviceStatusList from '@/components/ui/DeviceStatusList';
import Header from '@/components/ui/Header';
import { DeviceValidationStatus } from '@/schemas/device/validation/device-validation-status.schema';
import { colors } from '@/themes/colors';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

type Route = {
  key: DeviceValidationStatus;
  title: string;
};

export default function DevicesList() {
  const { t } = useTranslation(['common', 'drawer']);

  const { status = 'validated' } = useLocalSearchParams<{
    status?: DeviceValidationStatus;
  }>();

  const routes: Route[] = [
    { key: 'validated', title: t('common:states.validated') },
    { key: 'pending', title: t('common:states.pending') },
    { key: 'in_analysis', title: t('common:states.in_analysis') },
    { key: 'rejected', title: t('common:states.rejected') },
  ];

  const index = useMemo(() => {
    const index = routes.findIndex((route) => route.key === status);
    return index >= 0 ? index : 0;
  }, [status, routes]);

  const renderScene = ({ route }: { route: Route }) => (
    <DeviceStatusList status={route.key} />
  );

  return (
    <View className="flex-1">
      <Header title={t('drawer:devices.title')} />
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
    </View>
  );
}
