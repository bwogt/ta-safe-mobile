import LoadingScreen from '@/components/ui/LoadingScreen';
import QueryError from '@/components/ui/QueryError';
import Select from '@/components/ui/Select';
import { useDeviceModels } from '@/queries/device/useDeviceModels';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import StepControl from './_control';
import StepTitle from './_title';

type Props = {
  onNext: () => void;
  onPrevious: () => void;
};

export default function ModelSelectionScreen({ onNext, onPrevious }: Props) {
  const { t } = useTranslation(['common', 'device']);
  const { control } = useFormContext();

  const brandId = useWatch({
    control,
    name: 'brandId',
  });

  const modelId = useWatch({
    control,
    name: 'modelId',
  });

  const { data: models, isLoading, isError } = useDeviceModels(brandId);
  const disableNextStep = modelId === 0;

  if (isLoading) return <LoadingScreen />;

  return (
    <View className="flex-1 justify-center">
      {isError && <QueryError title={t('device:register.errors.model')} />}

      {models && !isError && (
        <View className="gap-10 px-4">
          <StepTitle step={2} title={t('device:register.steps.model')} />

          <Controller
            control={control}
            name="modelId"
            render={({ field: { value, onChange } }) => (
              <Select
                label={t('common:fields.model')}
                value={value}
                onChange={onChange}
                options={[
                  {
                    label: t('device:register.select.model'),
                    value: 0,
                  },
                  ...models.map((model) => ({
                    label: model.name,
                    value: model.id,
                  })),
                ]}
              />
            )}
          />

          <StepControl
            onNext={onNext}
            onPrevious={onPrevious}
            disableNextStep={disableNextStep}
          />
        </View>
      )}
    </View>
  );
}
