import { DeviceTransfer } from '@/schemas/device';
import { formatDatetime } from '@/utils/date/formatDatetime';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

type Props = {
  transfer: DeviceTransfer;
};

export default function TransferInfoContent({ transfer }: Props) {
  const { t } = useTranslation('common');
  const isSent = transfer.type === 'sent';
  const user = isSent ? transfer.target_user : transfer.source_user;

  return (
    <>
      <Text className="text-lg font-bold">
        {t('common:fields.name')}:{' '}
        <Text className="font-normal">{user.name}</Text>
      </Text>

      <Text className="text-lg font-bold">
        {t('common:fields.cpf')}:{' '}
        <Text className="font-normal">{user.cpf}</Text>
      </Text>

      <Text className="text-lg font-bold">
        {t('common:fields.email')}:{' '}
        <Text className="font-normal">{user.email}</Text>
      </Text>

      <Text className="text-lg font-bold">
        {t('common:fields.created_at')}:{' '}
        <Text className="font-normal">
          {formatDatetime(transfer.created_at)}
        </Text>
      </Text>
    </>
  );
}
