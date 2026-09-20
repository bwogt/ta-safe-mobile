import Button from '@/components/ui/Button';
import LoadingScreen from '@/components/ui/LoadingScreen';
import QueryError from '@/components/ui/QueryError';
import Select from '@/components/ui/Select';
import { useDeviceBrands } from '@/queries/device/useDeviceBrands';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import StepTitle from './_title';

type Props = {
  onNext: () => void;
};

export default function BrandSelectionStep({ onNext }: Props) {
  const { data: brands, isLoading, isError } = useDeviceBrands();
  const { t } = useTranslation(['common', 'device']);
  const { control } = useFormContext();

  const brandId = useWatch({
    control,
    name: 'brandId',
  });

  const disableNextStep = brandId === 0;

  if (isLoading) return <LoadingScreen />;

  return (
    <View className="flex-1 justify-center">
      {isError && <QueryError title={t('device:register.errors.brand')} />}

      {brands && !isError && (
        <View className="px-4">
          <StepTitle step={1} title={t('device:register.steps.brand')} />

          <Controller
            control={control}
            name="brandId"
            render={({ field: { value, onChange } }) => (
              <Select
                label={t('common:fields.brand')}
                value={value}
                onChange={onChange}
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

          <Button
            label={t('common:actions.next')}
            disabled={disableNextStep}
            onPress={onNext}
            iconLeft={
              <MaterialCommunityIcons
                name="page-next-outline"
                size={22}
                color={'white'}
              />
            }
          />
        </View>
      )}
    </View>
  );
}
