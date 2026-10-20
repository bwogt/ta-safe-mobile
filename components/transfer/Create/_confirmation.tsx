import Button from '@/components/ui/Button';
import Divider from '@/components/ui/Divider';
import LabeledText from '@/components/ui/LabeledText';
import { useCreateDeviceTransfer } from '@/queries/transfer/useCreateDeviceTransfer';
import { Device } from '@/schemas/device';
import { UserPublic } from '@/schemas/user';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

type Props = {
  device: Device;
  targetUser: UserPublic;
  previousStep: () => void;
  closeModal: () => void;
};

export function TransferOwnershipConfirmation({
  device,
  targetUser,
  previousStep,
  closeModal,
}: Props) {
  const { t } = useTranslation(['common', 'transfer']);
  const { mutate: create, isPending } = useCreateDeviceTransfer();

  const onSubmit = () => {
    create(
      { device_id: device.id, target_user_id: targetUser.id },
      { onSettled: () => closeModal() },
    );
  };

  return (
    <View className="w-full p-4">
      <View className="gap-10 rounded-lg border border-zinc-200 bg-white p-4">
        <View>
          <Text className="text-lg font-bold">
            {t('transfer:create.title')}
          </Text>
          <Text>{t('transfer:create.steps.confirmation')}</Text>
        </View>

        <View className=" p-2">
          <LabeledText label={t('common:labels.transfer.targetUser')} />

          <LabeledText
            label={t('common:fields.name')}
            value={targetUser?.name}
          />

          <LabeledText
            label={t('common:fields.email')}
            value={targetUser?.email}
          />

          <LabeledText label={t('common:fields.cpf')} value={targetUser?.cpf} />

          <Divider />

          <LabeledText label={t('common:labels.device')} />

          <LabeledText
            label={t('common:fields.brand')}
            value={device.model.brand.name}
          />

          <LabeledText
            label={t('common:fields.model')}
            value={device.model.name}
          />

          <LabeledText label={t('common:fields.color')} value={device.color} />
        </View>

        <View className="items-center gap-6">
          <View className="w-2/3">
            <Button
              disabled={isPending}
              onPress={onSubmit}
              label={
                isPending
                  ? t('common:loads.submitting')
                  : t('common:actions.transfer')
              }
            />
          </View>

          <Pressable onPress={previousStep} hitSlop={8}>
            <Text className="text-lg font-semibold text-primary">
              {t('actions.previous')}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
