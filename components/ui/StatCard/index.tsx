import { cn } from '@/utils/styles/cn';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

type StatCardProps = {
  label: string;
  value: string;
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  className: string;
};

export default function StatCard({
  label,
  value,
  iconName,
  className,
}: StatCardProps) {
  return (
    <View className="mb-lg w-[44%]">
      <View className="rounded-2xl border border-zinc-200 bg-white shadow">
        <View className="flex-row p-4">
          <View className="w-1/3">
            <View
              className={cn(
                'h-12 w-12 items-center justify-center rounded-full',
                className,
              )}
            >
              <MaterialCommunityIcons name={iconName} size={20} color="white" />
            </View>
          </View>
          <View className="w-2/3 items-center justify-center">
            <Text className="text-md">{label}</Text>
            <Text className="font-semibold">{value}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
