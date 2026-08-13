import { colors } from '@/themes/colors';
import { cn } from '@/utils/styles/cn';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type StatCardVariants = 'default' | 'success' | 'warning' | 'info' | 'danger';

type StatCardProps = {
  label: string;
  value?: number;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  variant?: StatCardVariants;
  onPress?: () => void;
};

const variants: Record<
  StatCardVariants,
  {
    color: string;
    border: string;
    background: string;
  }
> = {
  default: {
    color: colors.default.primary,
    border: 'border-default-secondary',
    background: 'bg-default-third',
  },
  success: {
    color: colors.success.primary,
    border: 'border-success-secondary',
    background: 'bg-success-third',
  },
  warning: {
    color: colors.warning.primary,
    border: 'border-warning-secondary',
    background: 'bg-warning-third',
  },
  info: {
    color: colors.info.primary,
    border: 'border-info-secondary',
    background: 'bg-info-third',
  },
  danger: {
    color: colors.danger.primary,
    border: 'border-danger-secondary',
    background: 'bg-danger-third',
  },
};

export default function StatCard({
  label,
  value,
  icon,
  onPress,
  variant = 'default',
}: StatCardProps) {
  const style = variants[variant];

  return (
    <Pressable disabled={!onPress} onPress={onPress} className="mb-lg w-[46%]">
      <View className="rounded-2xl border border-zinc-200 bg-white shadow">
        <View className="flex-row p-4">
          <View className="w-1/3">
            <View
              className={cn(
                `h-12 w-12 items-center justify-center rounded-full border ${style.border}`,
                style.background,
              )}
            >
              <MaterialCommunityIcons
                name={icon}
                color={style.color}
                size={22}
              />
            </View>
          </View>
          <View className="w-2/3 items-center justify-center">
            <Text>{label}</Text>
            <Text className="text-lg font-semibold">{value}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
