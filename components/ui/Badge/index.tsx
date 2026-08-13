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
    text: 'text-default-primary',
    border: 'border-default-secondary',
    background: 'bg-default-third',
    iconColor: colors.default.primary,
  },
  info: {
    text: 'text-info-primary',
    border: 'border-info-secondary',
    background: 'bg-info-third',
    iconColor: colors.info.primary,
  },
  success: {
    text: 'text-success-primary',
    border: 'border-success-secondary',
    background: 'bg-success-third',
    iconColor: colors.success.primary,
  },
  warning: {
    text: 'text-warning-primary',
    border: 'border border-warning-secondary',
    background: 'bg-warning-third',
    iconColor: colors.warning.primary,
  },
  danger: {
    text: 'text-danger-primary',
    border: 'border-danger-secondary',
    background: 'bg-danger-third',
    iconColor: colors.danger.primary,
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
