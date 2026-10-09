import Button from '@/components/ui/Button';
import LabeledText from '@/components/ui/LabeledText';
import { UserPublic } from '@/schemas/user';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

type Props = {
  targetUser?: UserPublic;
  previousStep: () => void;
};

export function TransferOwnershipConfirmation({
  targetUser,
  previousStep,
}: Props) {
  const { t } = useTranslation(['common', 'device']);

  return (
    <View className="w-full p-4">
      <View className="gap-10 rounded-lg border border-zinc-200 bg-white p-4">
        <View>
          <Text className="text-lg font-bold">
            {t('device:transfer.title')}
          </Text>
          <Text>{t('device:transfer.steps.confirmation')}</Text>
        </View>

        <View className="rounded-lg border border-zinc-200 p-2">
          <LabeledText label={t('common:labels.targetUser')} />

          <LabeledText
            label={t('common:fields.name')}
            value={targetUser?.name}
          />

          <LabeledText
            label={t('common:fields.email')}
            value={targetUser?.email}
          />

          <LabeledText label={t('common:fields.cpf')} value={targetUser?.cpf} />
        </View>

        <View className="items-center gap-6">
          <View className="w-2/3">
            <Button label={t('common:actions.next')} />
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
