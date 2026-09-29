import Button from '@/components/ui/Button';
import LabeledText from '@/components/ui/LabeledText';
import { useDeviceRegister } from '@/queries/device/useDeviceRegister';
import { DeviceRegistrationForm } from '@/schemas/device';
import { router } from 'expo-router';
import { useFormContext, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import StepProgress from '../ui/_progress';
import StepTitle from '../ui/_title';

type Props = {
  onPrevious: () => void;
};

export default function FinalStep({ onPrevious }: Props) {
  const { t } = useTranslation(['common', 'device']);

  const { control, setError, getValues, handleSubmit } =
    useFormContext<DeviceRegistrationForm>();

  const { mutate: register, isPending } = useDeviceRegister(setError);
  const { brand, model, color, access_key } = getValues();

  const { errors } = useFormState<DeviceRegistrationForm>({
    control,
    name: 'access_key',
  });

  const onSubmit = (data: DeviceRegistrationForm) => {
    register(data, {
      onSuccess: () => {
        router.replace({
          pathname: '/(auth)/(drawer)/devices',
          params: { status: 'pending' },
        });
      },
    });
  };

  return (
    <View className="flex-1 px-4 pt-8">
      <StepProgress step={5} totalSteps={5} />

      <StepTitle step={5} title={t('device:register.steps.final')} />

      <View className="rounded-2xl border border-zinc-200">
        <View className="gap-3 p-4">
          <LabeledText label={t('common:labels.deviceInfo')} />
          <LabeledText label={t('common:fields.brand')} value={brand?.name} />
          <LabeledText label={t('common:fields.model')} value={model?.name} />
          <LabeledText label={t('common:fields.color')} value={color} />

          <LabeledText
            label={t('common:fields.accessKey')}
            value={access_key}
            error={errors.access_key?.message}
          />
        </View>
      </View>

      <View className="items-center gap-8 pt-20">
        <View className="w-2/3">
          <Button
            label={t('common:actions.register')}
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
          />
        </View>

        <Pressable onPress={onPrevious} hitSlop={8}>
          <Text className="text-center text-lg font-semibold text-primary">
            {t('common:actions.previous')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
