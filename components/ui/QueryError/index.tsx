import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Button from '../Button';
import QueryErrorContent from './_content';
import QueryErrorHeader from './_header';

type QueryErrorProps = {
  message?: string;
  onRetry?: () => void;
};

export default function QueryError({ message, onRetry }: QueryErrorProps) {
  const { t } = useTranslation('common');

  return (
    <View className="flex-1 items-center justify-center gap-20">
      <QueryErrorHeader />
      <QueryErrorContent message={message} />
      <Button label={t('actions.retry')} onPress={onRetry} />
    </View>
  );
}
