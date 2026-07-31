import DrawerContent from '@/components/ui/Drawer';
import { useCurrentUser } from '@/queries/user/useCurrentUser';
import { colors } from '@/themes/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'react-native';

export default function Layout() {
  const { data: user } = useCurrentUser();
  const { t } = useTranslation('drawer');

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />

      <Drawer
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: 'transparent',
          drawerActiveBackgroundColor: 'transparent',
          drawerInactiveTintColor: 'transparent',
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name="dashboard/index"
          options={{
            title: t('drawer:dashboard.title', { name: user?.name }),
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="view-dashboard-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="profile/index"
          options={{
            drawerItemStyle: {
              display: 'none',
            },
          }}
        />

        <Drawer.Screen
          name="devices/index"
          options={{
            title: t('devices.title'),
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="cellphone-text"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Drawer>
    </>
  );
}
