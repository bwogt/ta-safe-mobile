import LabeledText from '@/components/ui/LabeledText';
import { useCurrentUser } from '@/queries/user/useCurrentUser';
import { Device } from '@/schemas/device';
import { formatDatetime } from '@/utils/date/formatDatetime';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

type Props = {
  device: Device;
};

export default function DeviceInfoContent({ device }: Props) {
  const { data: user } = useCurrentUser();
  const { t } = useTranslation('common');

  return (
    <View className="p-4">
      <LabeledText label={t('common:labels.owner')} value={user?.name} />
      <LabeledText label={t('common:fields.cpf')} value={user?.cpf_masked} />

      <LabeledText
        label={t('common:labels.createdAt')}
        value={formatDatetime(device.created_at)}
      />

      <LabeledText
        label={t('common:labels.updatedAt')}
        value={formatDatetime(device.updated_at)}
      />
    </View>
  );
}
