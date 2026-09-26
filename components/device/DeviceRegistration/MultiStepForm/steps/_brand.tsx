import LoadingScreen from '@/components/ui/LoadingScreen';
import QueryError from '@/components/ui/QueryError';
import Select from '@/components/ui/Select';
import { useDeviceBrands } from '@/queries/device/useDeviceBrands';
import { DeviceRegistrationForm } from '@/schemas/device';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import StepControl from '../ui/_control';
import StepProgress from '../ui/_progress';
import StepTitle from '../ui/_title';

type Props = {
  onNext: () => void;
};

export default function BrandStep({ onNext }: Props) {
  const { t } = useTranslation(['common', 'device']);
  const { data: brands, isLoading, isError } = useDeviceBrands();
  const { control } = useFormContext<DeviceRegistrationForm>();

  const brand = useWatch({
    control,
    name: 'brand',
  });

  const disableNextStep = !brand;

  if (isLoading) return <LoadingScreen />;

  return (
    <View className="flex-1 p-4 pt-8">
      {isError && <QueryError title={t('device:register.errors.brand')} />}

      {brands && !isError && (
        <>
          <StepProgress step={1} totalSteps={5} />

          <View className="flex-1 justify-center">
            <View className="gap-8">
              <StepTitle step={1} title={t('device:register.steps.brand')} />

              <Controller
                control={control}
                name="brand"
                render={({ field: { value, onChange } }) => (
                  <Select
                    label={t('common:fields.brand')}
                    value={value?.id ?? 0}
                    onChange={(brandId) => {
                      const selectedBrand = brands.find(
                        (brand) => brand.id == brandId,
                      );

                      onChange(selectedBrand ?? null);
                    }}
                    options={[
                      {
                        label: t('device:register.select.brand'),
                        value: 0,
                      },
                      ...brands.map((brand) => ({
                        label: brand.name,
                        value: brand.id,
                      })),
                    ]}
                  />
                )}
              />

              <StepControl onNext={onNext} disableNextStep={disableNextStep} />
            </View>
          </View>
        </>
      )}
    </View>
  );
}
