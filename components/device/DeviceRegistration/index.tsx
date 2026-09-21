import Header from '@/components/ui/Header';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import MultiStepForm from './MultiStepForm';

export default function DeviceRegistration() {
  const { t } = useTranslation('device');

  const formControls = useForm({
    defaultValues: {
      brandId: 0,
      modelId: 0,
    },
  });

  return (
    <FormProvider {...formControls}>
      <Header title={t('device:register.title')} />
      <MultiStepForm />
    </FormProvider>
  );
}
