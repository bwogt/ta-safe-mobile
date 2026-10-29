import Badge from '@/components/ui/Badge';
import { DeviceTransfer } from '@/schemas/transfer';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import StatusIndicator from '../StatusIndicator';

type Props = {
  transfer: DeviceTransfer;
};

export default function TransferInfoHeader({ transfer }: Props) {
  const { t } = useTranslation('common');

  const label =
    transfer.type === 'sent'
      ? t('common:labels.transfer.sent')
      : t('common:labels.transfer.received');

  return (
    <>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-lg font-bold">
            {transfer.device.model.name}
          </Text>
          <StatusIndicator status={transfer.status} />
        </View>

        <Badge label={label} />
      </View>
    </>
  );
}
