import { useCurrentUser } from '@/queries/user/useCurrentUser';
import { Device } from '@/schemas/device/base/device.schema';
import { formatDatetime } from '@/utils/date/formatDatetime';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

type Props = {
  device: Device;
};

export default function DeviceInfoContent({ device }: Props) {
  const { data: user } = useCurrentUser();
  const { t } = useTranslation('common');

  return (
    <View className="pb-4 pl-4">
      <Text className="text-lg font-semibold">
        {t('fields.owner')}:{' '}
        <Text className="text-lg font-normal">{user?.name}</Text>
      </Text>
      <Text className="text-lg font-semibold">
        {t('fields.cpf')}:{' '}
        <Text className="text-lg font-normal">{user?.cpf_masked}</Text>
      </Text>
      <Text className="text-lg font-semibold">
        {t('fields.register')}:{' '}
        <Text className="text-md font-normal">
          {formatDatetime(device.created_at)}
        </Text>
      </Text>
      <Text className="text-lg font-semibold">
        {t('fields.updatedAt')}:{' '}
        <Text className="text-md font-normal">
          {formatDatetime(device.updated_at)}
        </Text>
      </Text>
    </View>
  );
}
