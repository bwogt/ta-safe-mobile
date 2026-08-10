import { DeviceValidationStatus } from '@/schemas/device/validation/device-validation-status.schema';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

type StatusIndicatorProps = {
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
    bg: 'bg-success',
    label: 'states.validated',
  },
  pending: {
    bg: 'bg-warning',
    label: 'states.pending',
  },
  in_analysis: {
    bg: 'bg-info',
    label: 'states.in_analysis',
  },
  rejected: {
    bg: 'bg-danger',
    label: 'states.rejected',
  },
};

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  const { t } = useTranslation('common');
  const config = statusConfig[status];

  return (
    <View className="flex-row items-center gap-2">
      <View className={`h-2 w-2 rounded-full ${config.bg}`} />
      <Text>{t(config.label, { count: 1 })}</Text>
    </View>
  );
}
