import TransferList from '@/components/transfer/TransferList';
import Header from '@/components/ui/Header';
import { DeviceTransferStatus } from '@/schemas/transfer';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TransferScreen() {
  const { t } = useTranslation('transfer');

  const { status } = useLocalSearchParams<{
    status?: DeviceTransferStatus;
  }>();

  return (
    <SafeAreaView className="flex-1">
      <Header title={t('transfer:list.title')} />
      <TransferList key={status ?? 'all'} initialStatus={status} />
    </SafeAreaView>
  );
}
