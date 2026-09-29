import AccessKeyStep from './steps/_accessKey';
import BrandStep from './steps/_brand';
import ColorStep from './steps/_color';
import FinalStep from './steps/_final';
import ModelStep from './steps/_model';

type Props = {
  step: number;
  setStep: (step: number) => void;
};

export default function MultiStepForm({ step, setStep }: Props) {
  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);

  switch (step) {
    case 2:
      return <ModelStep onNext={nextStep} onPrevious={previousStep} />;
    case 3:
      return <ColorStep onNext={nextStep} onPrevious={previousStep} />;
    case 4:
      return <AccessKeyStep onNext={nextStep} onPrevious={previousStep} />;
    case 5:
      return <FinalStep onPrevious={previousStep} />;

    default:
      return <BrandStep onNext={nextStep} />;
  }
}
