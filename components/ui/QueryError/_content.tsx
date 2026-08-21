import { colors } from '@/themes/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

type Props = {
  message?: string;
};

export default function QueryErrorContent({ message }: Props) {
  const { t } = useTranslation('errors');

  return (
    <View className="gap-6 px-12">
      <View className="border border-zinc-200 bg-white shadow">
        <View className="flex-row items-center gap-2 px-6 py-4">
          <MaterialCommunityIcons
            name="minus-circle"
            size={28}
            color={colors.primary}
          />
          <Text className="text-lg font-semibold">
            {t('actions.defaultTitle')}
          </Text>
        </View>
      </View>

      <View className="border border-zinc-200 bg-white pr-4 shadow">
        <View className="flex-row items-center gap-2 px-6 py-4">
          <MaterialCommunityIcons
            name="minus-circle"
            size={28}
            color={colors.primary}
          />
          <Text className="text-lg font-semibold">{message}</Text>
        </View>
      </View>
    </View>
  );
}
