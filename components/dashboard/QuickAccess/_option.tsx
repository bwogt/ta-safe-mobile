import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Href, Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

type Props = {
  href: Href;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  label: string;
};

export default function QuickAccessOption({ href, icon, label }: Props) {
  const { t } = useTranslation('common');

  return (
    <View className="items-center gap-2 py-4">
      <Link href={href} asChild>
        <Pressable className="h-14 w-14 items-center justify-center rounded-full border border-zinc-300 bg-gray-200">
          <MaterialCommunityIcons name={icon} size={22} />
        </Pressable>
      </Link>

      <Text className="w-28 text-center">{label}</Text>
    </View>
  );
}
