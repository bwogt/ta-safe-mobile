import { DeviceValidationStatus } from '@/schemas/device';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

type Props = {
  status: DeviceValidationStatus;
};

const statusConfig: Record<
  DeviceValidationStatus,
  {
    bg: string;
    label: string;
  }
> = {
  validated: {
    bg: 'bg-success-500',
    label: 'device:states.validated',
  },
  pending: {
    bg: 'bg-warning-500',
    label: 'device:states.pending',
  },
  in_analysis: {
    bg: 'bg-info-500',
    label: 'device:states.in_analysis',
  },
  rejected: {
    bg: 'bg-danger-500',
    label: 'device:states.rejected',
  },
};

export default function StatusIndicator({ status }: Props) {
  const { t } = useTranslation('device');
  const config = statusConfig[status];

  return (
    <View className="flex-row items-center gap-2">
      <View className={`h-2 w-2 rounded-full ${config.bg}`} />
      <Text>{t(config.label, { count: 1 })}</Text>
    </View>
  );
}
