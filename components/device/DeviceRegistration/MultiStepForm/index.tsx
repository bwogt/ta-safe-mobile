import { useState } from 'react';
import { Text } from 'react-native';
import DeviceBrandSelection from './_brand';

export default function MultiStepForm() {
  const [step, setStep] = useState<number>(1);

  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);
  const resetStep = () => setStep(1);

  if (step == 2) return <Text>Model</Text>;
  if (step == 3) return <Text>Final</Text>;

  return <DeviceBrandSelection />;
}
