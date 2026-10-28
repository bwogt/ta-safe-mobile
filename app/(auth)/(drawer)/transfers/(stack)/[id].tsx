import TransferInfo from '@/components/transfer/TransferInfo';
import Header from '@/components/ui/Header';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { useTransferById } from '@/queries/transfer/useTransferById';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TransferScreen() {
  const { t } = useTranslation('transfer');
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: transfer, isLoading, isError } = useTransferById(id);

  const onBackPress = () => {
    router.push('/(auth)/(drawer)/transfers');
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <SafeAreaView>
      <Header title={t('transfer:info.title')} back onBackPress={onBackPress} />

      {transfer && !isError && <TransferInfo transfer={transfer} />}
    </SafeAreaView>
  );
}
