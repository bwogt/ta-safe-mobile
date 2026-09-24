import Input from '@/components/ui/Input';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import StepControl from '../ui/_control';
import StepProgress from '../ui/_progress';
import StepTitle from '../ui/_title';

type Props = {
  onNext: () => void;
  onPrevious: () => void;
};

export default function ColorStep({ onNext, onPrevious }: Props) {
  const { t } = useTranslation(['common', 'device']);
  const { control } = useFormContext();

  const color = useWatch({
    control,
    name: 'color',
  });

  const disableNextStep = color.length == 0;

  return (
    <View className="flex-1 p-4 pt-8">
      <StepProgress step={3} totalSteps={5} />

      <View className="flex-1 justify-center gap-4">
        <StepTitle step={3} title={t('device:register.steps.color')} />

        <Controller
          control={control}
          name="color"
          render={({ field: { value, onChange } }) => (
            <Input
              label={t('common:fields.color')}
              value={value}
              onChangeText={onChange}
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
