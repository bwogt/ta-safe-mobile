import Button from '@/components/ui/Button';
import { useDeviceRegister } from '@/queries/device/useDeviceRegister';
import { DeviceRegistrationForm } from '@/schemas/device';
import { router } from 'expo-router';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import StepProgress from '../ui/_progress';
import StepTitle from '../ui/_title';

type Props = {
  onPrevious: () => void;
  resetStepForm: () => void;
};

export default function FinalStep({ onPrevious, resetStepForm }: Props) {
  const { t } = useTranslation(['common', 'device']);

  const { reset, getValues, handleSubmit } =
    useFormContext<DeviceRegistrationForm>();

  const { brand, model, color, accessKey } = getValues();
  const { mutate: register } = useDeviceRegister();

  const onSubmit = (data: DeviceRegistrationForm) => {
    register(data, {
      onSuccess: () => {
        reset();
        resetStepForm();

        router.push({
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
        <View className="gap-2 p-4">
          <Text className="text-lg font-bold">
            {t('common:labels.deviceInfo')}
          </Text>

          <Text className="text-lg font-bold">
            {t('common:fields.brand')}
            {': '}
            <Text className="font-normal text-black">{brand?.name}</Text>
          </Text>

          <Text className="text-lg font-bold">
            {t('common:fields.model')}
            {': '}
            <Text className="font-normal text-black">{model?.name}</Text>
          </Text>

          <Text className="text-lg font-bold">
            {t('common:fields.color')}
            {': '}
            <Text className="font-normal text-black">{color}</Text>
          </Text>

          <Text className="text-lg font-bold">
            {t('common:fields.accessKey')}
            {': '}
            <Text className="font-normal text-black">{accessKey}</Text>
          </Text>
        </View>
      </View>

      <View className="items-center gap-8 pt-20">
        <View className="w-2/3">
          <Button
            label={t('common:actions.register')}
            onPress={handleSubmit(onSubmit)}
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
