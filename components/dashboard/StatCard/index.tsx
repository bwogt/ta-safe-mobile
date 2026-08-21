import { colors } from '@/themes/colors';
import { cn } from '@/utils/styles/cn';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type StatCardVariants = 'default' | 'success' | 'warning' | 'info' | 'danger';

type Props = {
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
    color: colors.default[500],
    border: 'border-default-200',
    background: 'bg-default-50',
  },
  success: {
    color: colors.success[500],
    border: 'border-success-200',
    background: 'bg-success-50',
  },
  warning: {
    color: colors.warning[500],
    border: 'border-warning-200',
    background: 'bg-warning-50',
  },
  info: {
    color: colors.info[500],
    border: 'border-info-200',
    background: 'bg-info-50',
  },
  danger: {
    color: colors.danger[500],
    border: 'border-danger-200',
    background: 'bg-danger-50',
  },
};

export default function StatCard({
  label,
  value,
  icon,
  onPress,
  variant = 'default',
}: Props) {
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
