import { useCurrentUser } from '@/queries/user/useCurrentUser';
import { colors } from '@/themes/colors';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function DrawerProfileCard() {
  const { data: user } = useCurrentUser();

  return (
    <View className="rounded-2xl border border-zinc-200 bg-white p-4 shadow">
      <Link href="/(auth)/(drawer)/profile" asChild>
        <Pressable className="flex-row items-center">
          <Ionicons name="person-circle" size={80} color={colors.neutral} />

          <View className="ml-md flex-1">
            <Text className="text-lg font-bold" numberOfLines={1}>
              {user?.name}
            </Text>
            <Text className="text-subtitle">{user?.email}</Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}
