import { Text, View } from 'react-native';

type BadgeVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
};

const variants: Record<BadgeVariant, { container: string; text: string }> = {
  default: {
    container: 'bg-gray-100',
    text: 'text-gray-600',
  },
  info: {
    container: 'bg-blue-100',
    text: 'text-blue-700',
  },
  success: {
    container: 'bg-green-100',
    text: 'text-green-700',
  },
  warning: {
    container: 'bg-orange-100',
    text: 'text-orange-700',
  },
  danger: {
    container: 'bg-red-100',
    text: 'text-red-700',
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
