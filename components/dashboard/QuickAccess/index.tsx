import { DeviceTransferStatus } from '@/schemas/transfer';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import QuickAccessOption from './_option';

export default function QuickAccess() {
  const { t } = useTranslation(['dashboard', 'transfer']);

  const openTransferList = (status: DeviceTransferStatus) => {
    router.push({
      pathname: '/(auth)/(drawer)/transfers',
      params: {
        status: status,
      },
    });
  };

  return (
    <View className="p-4 pt-2">
      <View className="rounded-2xl border border-zinc-200 bg-white shadow">
        <View className="flex-row justify-between px-4">
          <QuickAccessOption
            onPress={() => router.push('/(auth)/(drawer)/devices/register')}
            icon="cellphone-key"
            label={t('dashboard:quickAccess.registerDevice')}
          />

          <QuickAccessOption
            onPress={() => openTransferList('pending')}
            icon="transfer"
            label={t('transfer:quickAccess.pending')}
          />

          <QuickAccessOption
            onPress={() => openTransferList('accepted')}
            icon="transfer"
            label={t('transfer:quickAccess.accepted')}
          />
        </View>
      </View>
    </View>
  );
}
