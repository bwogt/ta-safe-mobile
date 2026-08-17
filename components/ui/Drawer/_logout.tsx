import { queryClient } from '@/services/queryClient';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { colors } from '@/themes/colors';
import { Ionicons } from '@expo/vector-icons';
import { DrawerItem } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function DrawerLogout() {
  const { t } = useTranslation('drawer');

  const handleLogout = () => {
    useAuthStore.getState().logout();
    queryClient.clear();

    router.replace('/(public)/login');
  };

  return (
    <DrawerItem
      label={t('logout.label')}
      onPress={handleLogout}
      labelStyle={{ color: colors.danger[500] }}
      pressColor={colors.danger[500]}
      icon={() => (
        <Ionicons
          className="mr-2"
          name="log-out-outline"
          size={30}
          color={colors.danger[500]}
        />
      )}
    />
  );
}
