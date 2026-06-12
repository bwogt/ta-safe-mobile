import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';

export default function LoadingScreen() {
  const { t } = useTranslation('common');

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <Text className="text-2xl font-bold text-white">
        {t('loads.waiting')}
      </Text>
      <ActivityIndicator size="large" className="my-lg color-white" />
    </View>
  );
}
