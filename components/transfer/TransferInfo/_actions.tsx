import Button from '@/components/ui/Button';
import { useCancelTransfer } from '@/queries/transfer/useCancelTransfer';
import { DeviceTransfer } from '@/schemas/transfer';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

type Props = {
  transfer: DeviceTransfer;
};

export default function TransferInfoActions({ transfer }: Props) {
  const { t } = useTranslation('common');

  const { mutate: cancel, isPending } = useCancelTransfer(transfer.id);

  if (transfer.status === 'pending') {
    return (
      <View className="mt-20 justify-between">
        {transfer.type === 'sent' && (
          <View className="items-center">
            <View className="w-4/5 gap-6">
              <Button
                label={t('common:actions.cancel')}
                onPress={() => cancel()}
                disabled={isPending}
                variant="danger"
                iconLeft="cancel"
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}
