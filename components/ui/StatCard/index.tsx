import { colors } from '@/themes/colors';
import { cn } from '@/utils/styles/cn';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

type StatCardVariants = 'default' | 'success' | 'warning' | 'info' | 'danger';

type StatCardProps = {
  label: string;
  value?: number;
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  variant?: StatCardVariants;
  href?: Href;
};

const variants: Record<
  StatCardVariants,
  { background: string; color: string }
> = {
  default: {
    background: 'bg-zinc-100',
    color: colors.subtitle,
  },
  success: {
    background: 'bg-green-100',
    color: colors.success,
  },
  warning: {
    background: 'bg-orange-100',
    color: colors.warning,
  },
  info: {
    background: 'bg-blue-100',
    color: colors.info,
  },
  danger: {
    background: 'bg-red-100',
    color: colors.danger,
  },
};

export default function StatCard({
  label,
  value,
  iconName,
  href,
  variant = 'default',
}: StatCardProps) {
  const router = useRouter();
  const currentVariant = variants[variant];

  return (
    <Pressable
      disabled={!href}
      onPress={href ? () => router.push(href) : undefined}
      className="mb-lg w-[46%]"
    >
      <View className="rounded-2xl border border-zinc-200 bg-white shadow">
        <View className="flex-row p-4">
          <View className="w-1/3">
            <View
              className={cn(
                'h-12 w-12 items-center justify-center rounded-full',
                currentVariant.background,
              )}
            >
              <MaterialCommunityIcons
                name={iconName}
                size={20}
                color={currentVariant.color}
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
