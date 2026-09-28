import Input from '@/components/ui/Input';
import { DeviceRegistrationForm } from '@/schemas/device';

import {
  Controller,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';

import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import StepControl from '../ui/_control';
import StepProgress from '../ui/_progress';
import StepTitle from '../ui/_title';

type Props = {
  onNext: () => void;
  onPrevious: () => void;
};

export default function AccessKeyStep({ onNext, onPrevious }: Props) {
  const { t } = useTranslation(['common', 'device']);
  const { control } = useFormContext<DeviceRegistrationForm>();

  const { errors } = useFormState<DeviceRegistrationForm>({
    control,
    name: 'access_key',
  });

  const accessKey = useWatch({
    control,
    name: 'access_key',
  });

  const disableNextStep = accessKey.length < 44;

  return (
    <View className="flex-1 p-4 pt-8">
      <StepProgress step={4} totalSteps={5} />

      <View className="flex-1 justify-center gap-4">
        <StepTitle step={4} title={t('device:register.steps.accessKey')} />

        <Controller
          control={control}
          name="access_key"
          render={({ field: { value, onChange } }) => (
            <Input
              label={t('common:fields.accessKey')}
              value={value}
              error={errors.access_key?.message}
              maxLength={44}
              keyboardType="number-pad"
              onChangeText={(text) => {
                const onlyNumbers = text.replace(/\D/g, '');
                onChange(onlyNumbers);
              }}
            />
          )}
        />

        <StepControl
          onNext={onNext}
          onPrevious={onPrevious}
          disableNextStep={disableNextStep}
        />
      </View>
    </View>
  );
}
