import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

type Props = {
  step: number;
  totalSteps: number;
};

export default function StepProgress({ step, totalSteps }: Props) {
  const { t } = useTranslation('common');
  const progress = step / totalSteps;

  return (
    <View className="gap-4">
      <View>
        <Text className="text-sm text-gray-500">
          {t('common:fields.step')}
          {': '}

          {t('common:fields.progress', {
            step,
            total: totalSteps,
          })}
        </Text>
      </View>

      <View className="h-1.5 overflow-hidden rounded-full bg-gray-200">
        <View
          className="h-full rounded-full bg-primary"
          style={{
            width: `${progress * 100}%`,
          }}
        />
      </View>
    </View>
  );
}
