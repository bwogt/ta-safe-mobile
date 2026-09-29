import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import Button from '../Button';

type Props = {
  title: string;
  message?: string;
  onRetry?: () => void;
};

export default function QueryError({ title, message, onRetry }: Props) {
  const { t } = useTranslation('common');

  return (
    <View className="flex-1 items-center justify-center gap-20">
      <View className="items-center">
        <Text>{title}</Text>
        <Text>{message}</Text>
      </View>

      {onRetry && (
        <Button
          label={t('common:actions.retry')}
          onPress={onRetry}
          iconLeft={
            <MaterialCommunityIcons
              name="reload-alert"
              size={26}
              color="white"
            />
          }
        />
      )}
    </View>
  );
}
