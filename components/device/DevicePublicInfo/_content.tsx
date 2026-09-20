import { DevicePublic } from '@/schemas/device';
import { formatDatetime } from '@/utils/date/formatDatetime';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

type Props = {
  device: DevicePublic;
};

export default function DevicePublicInfoContent({ device }: Props) {
  const { t } = useTranslation('common');

  return (
    <View className="pb-4 pl-4">
      <Text className="text-lg font-semibold">
        {t('common:fields.owner')}:{' '}
        <Text className="text-lg font-normal">{device.owner.name}</Text>
      </Text>
      <Text className="text-lg font-semibold">
        {t('common:fields.cpf')}:{' '}
        <Text className="text-lg font-normal">{device.owner.cpf}</Text>
      </Text>
      <Text className="text-lg font-semibold">
        {t('common:fields.register')}:{' '}
        <Text className="text-md font-normal">
          {formatDatetime(device.created_at)}
        </Text>
      </Text>
      <Text className="text-lg font-semibold">
        {t('common:fields.updatedAt')}:{' '}
        <Text className="text-md font-normal">
          {formatDatetime(device.updated_at)}
        </Text>
      </Text>
    </View>
  );
}
