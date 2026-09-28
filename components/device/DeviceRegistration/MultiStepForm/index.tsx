import { useState } from 'react';
import AccessKeyStep from './steps/_accessKey';
import BrandStep from './steps/_brand';
import ColorStep from './steps/_color';
import FinalStep from './steps/_final';
import ModelStep from './steps/_model';

export default function MultiStepForm() {
  const [step, setStep] = useState<number>(1);

  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);
  const goToStep = (step: number) => setStep(step);

  switch (step) {
    case 2:
      return <ModelStep onNext={nextStep} onPrevious={previousStep} />;
    case 3:
      return <ColorStep onNext={nextStep} onPrevious={previousStep} />;
    case 4:
      return <AccessKeyStep onNext={nextStep} onPrevious={previousStep} />;
    case 5:
      return <FinalStep onPrevious={previousStep} goToStep={goToStep} />;

    default:
      return <BrandStep onNext={nextStep} />;
  }
}
