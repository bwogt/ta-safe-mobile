import LabeledText from '@/components/ui/LabeledText';
import { DeviceTransfer } from '@/schemas/transfer';
import { formatDatetime } from '@/utils/date/formatDatetime';
import { useTranslation } from 'react-i18next';

type Props = {
  transfer: DeviceTransfer;
};

export default function TransferInfoContent({ transfer }: Props) {
  const { t } = useTranslation('common');
  const isSent = transfer.type === 'sent';
  const user = isSent ? transfer.target_user : transfer.source_user;

  return (
    <>
      <LabeledText label={t('common:fields.name')} value={user.name} />
      <LabeledText label={t('common:fields.cpf')} value={user.cpf} />
      <LabeledText label={t('common:fields.email')} value={user.email} />

      <LabeledText
        label={t('common:labels.createdAt')}
        value={formatDatetime(transfer.created_at)}
      />
    </>
  );
}
