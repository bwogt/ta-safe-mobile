import { Text, View } from 'react-native';

type BadgeVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
};

const variants: Record<BadgeVariant, { container: string; text: string }> = {
  default: {
    container: 'bg-gray-50',
    text: 'text-gray-600',
  },
  info: {
    container: 'bg-blue-50',
    text: 'text-blue-600',
  },
  success: {
    container: 'bg-green-50',
    text: 'text-green-600',
  },
  warning: {
    container: 'bg-orange-50',
    text: 'text-orange-600',
  },
  danger: {
    container: 'bg-red-50',
    text: 'text-red-600',
  },
};

export default function Badge({ label, variant = 'default' }: BadgeProps) {
  const style = variants[variant];

  return (
    <View className={`rounded-lg ${style.container}`}>
      <Text className={`p-sm font-semibold ${style.text}`}>{label}</Text>
    </View>
  );
}
