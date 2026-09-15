import Header from '@/components/ui/Header';
import { FormProvider, useForm } from 'react-hook-form';
import MultiStepForm from './MultiStepForm';

export default function DeviceRegistration() {
  const formControls = useForm();

  return (
    <FormProvider {...formControls}>
      <Header title="Registrar Dispositivo" />
      <MultiStepForm />
    </FormProvider>
  );
}
