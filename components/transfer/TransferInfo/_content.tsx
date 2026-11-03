import Badge from '@/components/ui/Badge';
import Divider from '@/components/ui/Divider';
import LabeledText from '@/components/ui/LabeledText';
import { DeviceTransfer } from '@/schemas/transfer';
import { formatDatetime } from '@/utils/date/formatDatetime';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

type Props = {
  transfer: DeviceTransfer;
};

export default function TransferInfoContent({ transfer }: Props) {
  const { t } = useTranslation('common');

  const isSent = transfer.type === 'sent';
  const user = isSent ? transfer.target_user : transfer.source_user;

  const label = t(`common:labels.transfer.${transfer.type}`);
  const icon = transfer.type === 'sent' ? 'tray-arrow-up' : 'tray-arrow-down';

  return (
    <>
      <View className="pb-4">
        <Badge label={label} icon={icon} />
      </View>

      <LabeledText label={t('common:fields.name')} value={user.name} />
      <LabeledText label={t('common:fields.cpf')} value={user.cpf} />
      <LabeledText label={t('common:fields.email')} value={user.email} />

      <LabeledText
        label={t('common:labels.createdAt')}
        value={formatDatetime(transfer.created_at)}
      />

      <Divider />

      <View className="flex-row items-center justify-center">
        <Text>{t('common:labels.updatedAt')}: </Text>
        <Text>{formatDatetime(transfer.updated_at)}</Text>
      </View>
    </>
  );
}
