import { DeviceTransferStatus } from '@/schemas/transfer';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

type Variant = 'pending' | 'accepted' | 'canceled' | 'rejected';

type Props = {
  status: DeviceTransferStatus;
};

const variants: Record<Variant, { bg: string }> = {
  pending: {
    bg: 'bg-info-500',
  },
  accepted: {
    bg: 'bg-success-500',
  },
  canceled: {
    bg: 'bg-danger-500',
  },
  rejected: {
    bg: 'bg-danger-500',
  },
};

export default function StatusIndicator({ status }: Props) {
  const { t } = useTranslation('transfer');
  const variant = variants[status];

  return (
    <View className="flex-row items-center gap-2">
      <View className={`h-2 w-2 rounded-full ${variant.bg}`} />
      <Text>{t(`transfer:states.${status}`, { count: 1 })}</Text>
    </View>
  );
}
