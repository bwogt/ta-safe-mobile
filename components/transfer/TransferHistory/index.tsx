import Divider from '@/components/ui/Divider';
import { Device, DevicePublic } from '@/schemas/device';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import TransferHistoryInfo from './_info';

type Props = {
  device: Device | DevicePublic;
};

export default function TransferHistory({ device }: Props) {
  const { t } = useTranslation('transfer');
  const transfers = device.transfer_history;

  return (
    <View className="px-4 py-8">
      <View className="rounded-2xl border border-zinc-200 bg-white p-4">
        <Text className="text-xl font-bold">{t('transfer:history.title')}</Text>
        <Text>{t('transfer:history.subtitle')}</Text>

        <Divider />

        {transfers.length === 0 && <Text>{t('transfer:history.empty')}</Text>}

        {device.transfer_history?.map((item) => (
          <TransferHistoryInfo key={item.id} transfer={item} />
        ))}
      </View>
    </View>
  );
}
