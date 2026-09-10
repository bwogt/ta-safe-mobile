import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import Button from '../Button';

type Props = {
  title: string;
  description?: string;
  onRetry?: () => void;
};

export default function QueryError({ title, description, onRetry }: Props) {
  const { t } = useTranslation('common');

  return (
    <View className="flex-1 items-center justify-center gap-20">
      <View className="items-center">
        <Text>{title}</Text>
        <Text>{description}</Text>
      </View>

      <Button
        label={t('actions.retry')}
        onPress={onRetry}
        iconLeft={
          <MaterialCommunityIcons name="reload-alert" size={26} color="white" />
        }
      />
    </View>
  );
}
