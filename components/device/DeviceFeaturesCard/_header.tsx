import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

export default function DeviceFeaturesCardHeader() {
  const { t } = useTranslation('common');

  return (
    <View className="px-4 pt-4">
      <Text className="text-xl font-semibold">
        {t('titles.deviceFeatures')}
      </Text>
      <Text>{t('subtitles.deviceFeatures')}</Text>
    </View>
  );
}
