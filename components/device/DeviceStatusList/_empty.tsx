import { DeviceValidationStatus } from '@/schemas/device/validation/device-validation-status.schema';
import { colors } from '@/themes/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

type EmptyDeviceListProps = {
  status: DeviceValidationStatus;
};

export default function EmptyDeviceList({ status }: EmptyDeviceListProps) {
  const { t } = useTranslation('common');

  return (
    <View className="items-center gap-4">
      <MaterialCommunityIcons
        name="cellphone-remove"
        size={44}
        color={colors.neutral}
      />
      <Text className="text-lg text-neutral">
        {t('messages.emptyDeviceList', {
          status: t(`states.${status}`, { count: 2 }).toLowerCase(),
        })}
      </Text>
    </View>
  );
}
