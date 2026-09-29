import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

export default function DeviceFeaturesCardHeader() {
  const { t } = useTranslation('device');

  return (
    <View className="px-4 pt-4">
      <Text className="text-xl font-semibold">
        {t('device:features.title')}
      </Text>
      <Text>{t('device:features.subtitle')}</Text>
    </View>
  );
}
