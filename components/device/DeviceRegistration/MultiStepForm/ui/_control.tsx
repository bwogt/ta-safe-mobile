import Button from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

type Props = {
  onNext: () => void;
  onPrevious?: () => void;
  disableNextStep: boolean;
};

export default function StepControl({
  onNext,
  onPrevious,
  disableNextStep,
}: Props) {
  const { t } = useTranslation('common');

  return (
    <View className="items-center gap-8">
      <View className="w-2/3">
        <Button
          label={t('actions.next')}
          onPress={onNext}
          disabled={disableNextStep}
        />
      </View>

      {onPrevious && (
        <Pressable
          onPress={onPrevious}
          className="flex-row items-center gap-2"
          hitSlop={8}
        >
          <Text className="text-lg font-semibold text-primary">
            {t('actions.previous')}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
