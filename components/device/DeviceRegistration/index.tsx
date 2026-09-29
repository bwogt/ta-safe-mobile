import Header from '@/components/ui/Header';
import { DeviceRegistrationForm } from '@/schemas/device';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform } from 'react-native';
import MultiStepForm from './MultiStepForm';

export default function DeviceRegistration() {
  const { t } = useTranslation('device');
  const [step, setStep] = useState<number>(1);

  const formControls = useForm<DeviceRegistrationForm>({
    defaultValues: {
      brand: null,
      model: null,
      color: '',
      access_key: '',
    },
  });

  useFocusEffect(
    useCallback(() => {
      formControls.reset();
      setStep(1);
    }, [formControls]),
  );

  return (
    <FormProvider {...formControls}>
      <Header title={t('device:register.title')} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <MultiStepForm step={step} setStep={setStep} />
      </KeyboardAvoidingView>
    </FormProvider>
  );
}
