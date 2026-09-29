import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

type Props = {
  step: number;
  title: string;
};

export default function StepTitle({ step, title }: Props) {
  const { t } = useTranslation('common');

  return (
    <Text className="py-10 text-center text-xl font-bold text-primary">
      {t('common:labels.step')} {step}:{' '}
      <Text className="font-normal text-black">{title}</Text>
    </Text>
  );
}
