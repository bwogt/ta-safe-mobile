import TransferList from '@/components/transfer/TransferList';
import Header from '@/components/ui/Header';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TransferScreen() {
  const { t } = useTranslation('transfer');

  return (
    <SafeAreaView className="flex-1">
      <Header title={t('transfer:list.title')} />
      <TransferList />
    </SafeAreaView>
  );
}
