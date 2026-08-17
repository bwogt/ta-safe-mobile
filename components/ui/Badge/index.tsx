import { colors } from '@/themes/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

type BadgeVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
};

const variants: Record<
  BadgeVariant,
  {
    text: string;
    border: string;
    background: string;
    iconColor: string;
  }
> = {
  default: {
    text: 'text-default-500',
    border: 'border-default-200',
    background: 'bg-default-50',
    iconColor: colors.default[500],
  },
  info: {
    text: 'text-info-500',
    border: 'border-info-200',
    background: 'bg-info-50',
    iconColor: colors.info[500],
  },
  success: {
    text: 'text-success-500',
    border: 'border-success-200',
    background: 'bg-success-50',
    iconColor: colors.success[500],
  },
  warning: {
    text: 'text-warning-500',
    border: 'border border-warning-200',
    background: 'bg-warning-50',
    iconColor: colors.warning[500],
  },
  danger: {
    text: 'text-danger-500',
    border: 'border-danger-200',
    background: 'bg-danger-50',
    iconColor: colors.danger[500],
  },
};

export default function Badge({
  label,
  icon,
  variant = 'default',
}: BadgeProps) {
  const style = variants[variant];

  return (
    <View
      className={`flex-row items-center gap-2 rounded-lg border p-2 ${style.background} ${style.border}`}
    >
      {icon && (
        <MaterialCommunityIcons name={icon} size={22} color={style.iconColor} />
      )}
      <Text className={`font-semibold ${style.text}`}>{label}</Text>
    </View>
  );
}
