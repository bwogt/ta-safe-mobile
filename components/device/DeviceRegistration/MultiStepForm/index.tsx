import { useState } from 'react';
import { Text } from 'react-native';
import BrandSelectionStep from './_brand';
import ModelSelectionScreen from './_model';

export default function MultiStepForm() {
  const [step, setStep] = useState<number>(1);
  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);

  if (step == 2) {
    return <ModelSelectionScreen onNext={nextStep} onPrevious={previousStep} />;
  }

  if (step == 3) {
    return <Text>Color Selection</Text>;
  }

  return <BrandSelectionStep onNext={nextStep} />;
}
