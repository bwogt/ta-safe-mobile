import { useState } from 'react';
import { Text } from 'react-native';
import AccessKeyStep from './_accessKey';
import BrandSelectionStep from './_brand';
import ColorStep from './_color';
import ModelSelectionScreen from './_model';

export default function MultiStepForm() {
  const [step, setStep] = useState<number>(1);
  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);

  if (step == 2) {
    return <ModelSelectionScreen onNext={nextStep} onPrevious={previousStep} />;
  }

  if (step == 3) {
    return <ColorStep onNext={nextStep} onPrevious={previousStep} />;
  }

  if (step == 4) {
    return <AccessKeyStep onNext={nextStep} onPrevious={previousStep} />;
  }

  if (step == 5) {
    return <Text>Resume</Text>;
  }

  return <BrandSelectionStep onNext={nextStep} />;
}
