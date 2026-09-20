import { useState } from 'react';
import { Text } from 'react-native';
import BrandSelectionStep from './_brand';

export default function MultiStepForm() {
  const [step, setStep] = useState<number>(1);
  const nextStep = () => setStep(step + 1);

  if (step == 2) return <Text>Model</Text>;

  return <BrandSelectionStep onNext={nextStep} />;
}
