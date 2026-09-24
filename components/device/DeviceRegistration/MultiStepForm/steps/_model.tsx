import LoadingScreen from '@/components/ui/LoadingScreen';
import QueryError from '@/components/ui/QueryError';
import Select from '@/components/ui/Select';
import { useDeviceModels } from '@/queries/device/useDeviceModels';
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

export default function ModelStep({ onNext, onPrevious }: Props) {
  const { t } = useTranslation(['common', 'device']);
  const { control } = useFormContext();

  const brand = useWatch({
    control,
    name: 'brand',
  });

  const model = useWatch({
    control,
    name: 'model',
  });

  const { data: models, isLoading, isError } = useDeviceModels(brand.id);
  const disableNextStep = !model;

  if (isLoading) return <LoadingScreen />;

  return (
    <View className="flex-1 p-4 pt-8">
      {isError && <QueryError title={t('device:register.errors.model')} />}

      {models && !isError && (
        <>
          <StepProgress step={2} totalSteps={5} />

          <View className="flex-1 justify-center">
            <View className="gap-8">
              <StepTitle step={2} title={t('device:register.steps.model')} />

              <Controller
                control={control}
                name="model"
                render={({ field: { value, onChange } }) => (
                  <Select
                    label={t('common:fields.model')}
                    value={value?.id ?? 0}
                    onChange={(modelId) => {
                      const selectedModel = models.find(
                        (model) => model.id == modelId,
                      );

                      onChange(selectedModel ?? null);
                    }}
                    options={[
                      {
                        label: t('device:register.select.model'),
                        value: 0,
                      },
                      ...models.map((model) => ({
                        label: `${model.name} (${model.ram} | ${model.storage})`,
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
          </View>
        </>
      )}
    </View>
  );
}
