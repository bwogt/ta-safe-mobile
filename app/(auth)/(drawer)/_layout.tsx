import DrawerContent from '@/components/ui/Drawer';
import { colors } from '@/themes/colors';
import { Drawer } from 'expo-router/drawer';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'react-native';

export default function Layout() {
  const { t } = useTranslation('drawer');

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          drawerActiveTintColor: 'transparent',
          drawerActiveBackgroundColor: colors.drawer.active,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          drawerStyle: {
            backgroundColor: colors.drawer.background,
          },
        }}
      >
        <Drawer.Screen
          name="profile/index"
          options={{
            title: t('profile.title'),
            drawerItemStyle: {
              display: 'none',
            },
          }}
        />
      </Drawer>
    </>
  );
}
