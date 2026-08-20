import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

export default function DeviceStatusListFooter() {
  const { t } = useTranslation('common');

  return (
    <Text className="py-4 text-center text-gray-500">
      {t('messages.endOfList')}
    </Text>
  );
}
