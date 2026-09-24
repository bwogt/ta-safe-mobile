import Header from '@/components/ui/Header';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform } from 'react-native';
import MultiStepForm from './MultiStepForm';

export default function DeviceRegistration() {
  const { t } = useTranslation('device');

  const formControls = useForm({
    defaultValues: {
      brandId: 0,
      modelId: 0,
      color: '',
    },
  });

  return (
    <FormProvider {...formControls}>
      <Header title={t('device:register.title')} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <MultiStepForm />
      </KeyboardAvoidingView>
    </FormProvider>
  );
}
